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
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >

      <!-- KD000 : start for 表格代码 -->
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="50px" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="班级名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="分科" align="center">
        <template slot-scope="{row}">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>

      <el-table-column label="班主任" align="center">
        <template slot-scope="{row}">
          <span>{{ row.master }}</span>
        </template>
      </el-table-column>

      <el-table-column label="语文老师" align="center">
        <template slot-scope="{row}">
          <span>{{ row.teacher_of_chinese }}</span>
        </template>
      </el-table-column>

      <el-table-column label="数学老师" align="center">
        <template slot-scope="{row}">
          <span>{{ row.teacher_of_math }}</span>
        </template>
      </el-table-column>

      <el-table-column label="英语老师" align="center">
        <template slot-scope="{row}">
          <span>{{ row.teacher_of_english }}</span>
        </template>
      </el-table-column>

      <el-table-column label="物理老师" align="center">
        <template slot-scope="{row}">
          <span>{{ row.teacher_of_physics }}</span>
        </template>
      </el-table-column>

      <el-table-column label="化学老师" align="center">
        <template slot-scope="{row}">
          <span>{{ row.teacher_of_chemistry }}</span>
        </template>
      </el-table-column>

      <el-table-column label="生物老师" align="center">
        <template slot-scope="{row}">
          <span>{{ row.teacher_of_biology }}</span>
        </template>
      </el-table-column>

      <el-table-column label="政治老师" align="center">
        <template slot-scope="{row}">
          <span>{{ row.teacher_of_politics }}</span>
        </template>
      </el-table-column>

      <el-table-column label="历史老师" align="center">
        <template slot-scope="{row}">
          <span>{{ row.teacher_of_history }}</span>
        </template>
      </el-table-column>

      <el-table-column label="地理老师" align="center">
        <template slot-scope="{row}">
          <span>{{ row.teacher_of_geography }}</span>
        </template>
      </el-table-column>

      <el-table-column label="音乐老师" align="center">
        <template slot-scope="{row}">
          <span>{{ row.teacher_of_music }}</span>
        </template>
      </el-table-column>

      <el-table-column label="体育老师" align="center">
        <template slot-scope="{row}">
          <span>{{ row.teacher_of_PE }}</span>
        </template>
      </el-table-column>

      <el-table-column label="美术老师" align="center">
        <template slot-scope="{row}">
          <span>{{ row.teacher_of_art }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Comment" align="center">
        <template slot-scope="{row}">
          <span>{{ row.comment }}</span>
        </template>
      </el-table-column>
      <!-- KD000 : end for 表格代码 -->

      <el-table-column label="Actions" align="center" class-name="small-padding fixed-width">

        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">Edit</el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">Delete</el-button>
        </template>

      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getCurrentClazz" />

    <!-- KD000 : start for 输入框代码 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">

        <el-form-item label="班级名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>

        <el-form-item label="分科" prop="status">
          <el-radio v-model="temp.status" :label="1">文科</el-radio>
          <el-radio v-model="temp.status" :label="0">理科</el-radio>
        </el-form-item>

        <el-form-item label="班主任" prop="comment">
          <el-input v-model="temp.master" />
        </el-form-item>

        <el-form-item label="语文老师" prop="comment">
          <el-input v-model="temp.teacher_of_chinese" />
        </el-form-item>

        <el-form-item label="数学老师" prop="comment">
          <el-input v-model="temp.teacher_of_math" />
        </el-form-item>

        <el-form-item label="英语老师" prop="comment">
          <el-input v-model="temp.teacher_of_english" />
        </el-form-item>

        <el-form-item label="物理老师" prop="comment">
          <el-input v-model="temp.teacher_of_physics" />
        </el-form-item>

        <el-form-item label="化学老师" prop="comment">
          <el-input v-model="temp.teacher_of_chemistry" />
        </el-form-item>

        <el-form-item label="生物老师" prop="comment">
          <el-input v-model="temp.teacher_of_biology" />
        </el-form-item>

        <el-form-item label="政治老师" prop="comment">
          <el-input v-model="temp.teacher_of_politics" />
        </el-form-item>

        <el-form-item label="历史老师" prop="comment">
          <el-input v-model="temp.teacher_of_history" />
        </el-form-item>

        <el-form-item label="地理老师" prop="comment">
          <el-input v-model="temp.teacher_of_geography" />
        </el-form-item>

        <el-form-item label="音乐老师" prop="comment">
          <el-input v-model="temp.teacher_of_music" />
        </el-form-item>

        <el-form-item label="体育老师" prop="comment">
          <el-input v-model="temp.teacher_of_PE" />
        </el-form-item>

        <el-form-item label="美术老师" prop="comment">
          <el-input v-model="temp.teacher_of_art" />
        </el-form-item>

        <el-form-item label="备注" prop="comment">
          <el-input v-model="temp.comment" />
        </el-form-item>

      </el-form>

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

// KD000 : start for 定义API
import { getClazzList, deleteClazz, createClazz, updateClazz } from '@/api/clazz'
// KD000 : end for 定义API

import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

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
  components: { Pagination },
  directives: { waves },
  filters: {
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
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
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
      downloadLoading: false
    }
  },
  created() {
    this.getCurrentClazz()
  },
  methods: {

    // KD000 : start for 使用API
    getCurrentClazz() {
      this.listLoading = true
      getClazzList(this.listQuery).then(response => {
        console.log(response.data)
        this.list = response.data.results
        this.total = response.data.count

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },

    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createClazz(this.temp).then(() => {
            this.list.unshift(this.temp)
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
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateClazz(tempData).then(() => {
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
      deleteClazz(row.id).then(() => {
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
      this.getCurrentClazz()
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

    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
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
