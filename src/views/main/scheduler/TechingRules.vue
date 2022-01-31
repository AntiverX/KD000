<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      fit
      :data="list"
      border
      highlight-current-row

      @sort-change="sortChange"
    >

      <!-- KD000 : start for 表格代码 -->
      <el-table-column label="ID" prop="id" sortable="custom" align="center" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="班级" align="center">
        <template slot-scope="{row}">
          <span>{{ row.clazz }}</span>
        </template>
      </el-table-column>

      <el-table-column label="教师" align="center">
        <template slot-scope="{row}">
          <span>{{ row.teacher }}</span>
        </template>
      </el-table-column>

      <el-table-column label="课程" align="center">
        <template slot-scope="{row}">
          <span>{{ row.course }}</span>
        </template>
      </el-table-column>

      <!-- KD000 : end for 表格代码 -->

      <el-table-column label="Actions" align="center" class-name="small-padding fixed-width" width="150px">

        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">Edit</el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">Delete</el-button>
        </template>

      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getCurrentCourse" />

    <!-- KD000 : start for 输入框代码 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">

        <el-form-item label="班级" prop="clazz">
          <el-drag-select v-model="temp.clazz" filterable :filter-method="dataFilter" multiple multiple-limit="1" style="width:500px;" placeholder="请选择" @focus="resetSelect">
            <el-option v-for="item in classOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-drag-select>
        </el-form-item>

<!--        <el-form-item label="教师" prop="teacher">-->
<!--          <el-drag-select v-model="temp.teacher" filterable :filter-method="dataFilter" multiple multiple-limit="1" style="width:500px;" placeholder="请选择" @focus="resetSelect">-->
<!--            <el-option v-for="item in teacherOptions" :key="item.value" :label="item.label" :value="item.value" />-->
<!--          </el-drag-select>-->
<!--        </el-form-item>-->

        <el-form-item label="课程" prop="comment">
          <el-drag-select v-model="temp.course" filterable :filter-method="dataFilter" multiple multiple-limit="1" style="width:500px;" placeholder="请选择" @focus="resetSelect">
            <el-option v-for="item in courseOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-drag-select>
        </el-form-item>

      </el-form>

      <!-- 最下方的取消和确认按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>

    </el-dialog>
    <!-- KD000 : end for 输入框代码 -->

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

// KD000 : start for 导入API
import { getRuleList, getClassList, getTeacherCourseList, deleteRule, createRule, updateRule } from '@/api/teachingRules'
// KD000 : end for 导入API

import waves from '@/directive/waves' // waves directive
import { parseTime, myParseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import ElDragSelect from '@/components/DragSelect' // base on element-ui

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination, ElDragSelect },
  directives: { waves },
  filters: {

    myParseTime(time) {
      return myParseTime(time)
    },

    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      // KD000 : start for 输入框内容
      temp: {
        clazz: [],
        teacher: [],
        course: []
      },
      // KD000 : start for 输入框内容
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      classOptions: [],
      teacherOptions: [],
      courseOptions: []
    }
  },
  created() {
    // KD000 : start for 初始化操作
    this.getCurrentCourse()
    // getTeacherList(this.listQuery).then(response => {
    //   var teacherOptions = []
    //   for (let i = 0; i < response.data.results.length; i++) {
    //     var dic = new Array()
    //     dic['label'] = response.data.results[i]['name']
    //     dic['value'] = response.data.results[i]['id']
    //     teacherOptions.push(dic)
    //   }
    //   this.teacherOptions = teacherOptions
    // })
    getClassList(this.listQuery).then(response => {
      var teacherOptions = []
      for (let i = 0; i < response.data.results.length; i++) {
        var dic = []
        dic['label'] = response.data.results[i]['name']
        dic['value'] = response.data.results[i]['id']
        teacherOptions.push(dic)
      }
      this.classOptions = teacherOptions
    })
    getTeacherCourseList(this.listQuery).then(response => {
      var teacherOptions = []
      for (let i = 0; i < response.data.results.length; i++) {
        console.log(response.data.results[i])
        var dic = []
        dic['label'] = response.data.results[i].course.name + ' - ' + response.data.results[i].teacher.name
        dic['value'] = response.data.results[i]['id']
        teacherOptions.push(dic)
      }
      console.log(teacherOptions)
      this.courseOptions = teacherOptions
    })
    // KD000 : end for 初始化操作
  },
  methods: {
    dataFilter(val) {
      const keywords = val.split(' ')
      console.log(keywords)
      var arr = []
      // eslint-disable-next-line no-empty
      for (let i = 0; i < this.options.length; i++) {
        let add
        add = true
        for (let j = 0; j < keywords.length; j++) {
          if (this.options[i].label.indexOf(keywords[j]) === -1) {
            add = false
          }
        }
        if (add) {
          arr.push(this.options[i])
        }
      }
      this.options = arr
    },
    // KD000 : start for 输入框内容
    resetTemp() {
      this.temp = {
        clazz: [],
        teacher: [],
        course: []
      }
    },
    // KD000 : start for 输入框内容
    resetSelect() {
      this.options = [{
        value: '格斗课 - 刘华强',
        label: '格斗课 - 刘华强'
      }, {
        value: '生理课 - 李橙',
        label: '生理课 - 李橙'
      },
      {
        value: '篮球课 - 王殿元',
        label: '篮球课 - 王殿元'
      },
      {
        value: '多人运动课 - 李橙',
        label: '多人运动课 - 李橙'
      },
      {
        value: '多人运动课 - 老板',
        label: '多人运动课 - 老板'
      }
      ]
    },

    // KD000 : start for 使用API
    getCurrentCourse() {
      getRuleList(this.listQuery).then(response => {
        var results = []
        for (let i = 0; i < response.data.results.length; i++) {
          var dict = {}
          dict['id'] = response.data.results[i].id
          dict['clazz'] = response.data.results[i].clazz.name
          dict['teacher'] = response.data.results[i].teacher_course.teacher.name
          dict['course'] = response.data.results[i].teacher_course.course.name
          results.push(dict)
          console.log(response.data.results[i])
        }
        this.list = results
        this.total = response.data.count
        this.listLoading = false
      })
    },

    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          var data = {}
          console.log(this.temp)
          data['clazz'] = this.temp.clazz[0]
          data['teacher_course'] = this.temp.course[0]
          console.log(data)
          createRule(data).then(() => {
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },

    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateRule(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },

    handleDelete(row, index) {
      deleteRule(row.id).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Delete Successfully',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      })
    },

    // KD000 : end for 使用API

    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    handleFilter() {
      this.listQuery.page = 1
      this.getCurrentCourse()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },

    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },

    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },

    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },

    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
