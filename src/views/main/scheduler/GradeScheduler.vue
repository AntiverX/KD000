<template>
  <div class="app-container">
    <!--    KD000 : 表格相关代码-->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="Scheduler"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="年级" align="center" width="80" >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="week_num.indexOf('星期一') !== -1" label="星期一" align="center" width="80">
        <template v-for="index in class_num">
          <el-table-column :label="index.toString()" align="center" width="40" >
            <span slot-scope="{row}" v-if="row.monday[index - 1].id">{{ row.monday[index - 1].name[0] }}</span>
          </el-table-column>
        </template>

      </el-table-column>

      <el-table-column v-if="week_num.indexOf('星期二') !== -1" label="星期二" align="center" width="80">
        <template v-for="index in class_num">
          <el-table-column :label="index.toString()" align="center" width="40" >
            <span slot-scope="{row}" v-if="row.tuesday[index - 1].id">{{ row.tuesday[index - 1].name[0] }}</span>
          </el-table-column>
        </template>
      </el-table-column>

      <el-table-column v-if="week_num.indexOf('星期三') !== -1" label="星期三" align="center" width="80">
        <template v-for="index in class_num">
          <el-table-column :label="index.toString()" align="center" width="40" >
            <span slot-scope="{row}" v-if="row.wednesday[index - 1].id">{{ row.wednesday[index - 1].name[0] }}</span>
          </el-table-column>
        </template>
      </el-table-column>

      <el-table-column v-if="week_num.indexOf('星期四') !== -1" label="星期四" align="center" width="80">
        <template v-for="index in class_num">
          <el-table-column :label="index.toString()" align="center" width="40" >
            <span slot-scope="{row}" v-if="row.thursday[index - 1].id">{{ row.thursday[index - 1].name[0] }}</span>
          </el-table-column>
        </template>
      </el-table-column>

      <el-table-column v-if="week_num.indexOf('星期五') !== -1" label="星期五" align="center" width="80">
        <template v-for="index in class_num">
          <el-table-column :label="index.toString()" align="center" width="40" >
            <span slot-scope="{row}" v-if="row.friday[index - 1].id">{{ row.friday[index - 1].name[0] }}</span>
          </el-table-column>
        </template>
      </el-table-column>

      <el-table-column label="星期六" align="center" width="80">
        <template v-for="index in class_num">
          <el-table-column :label="index.toString()" align="center" width="40" >
            <span slot-scope="{row}" v-if="row.saturday && row.saturday[index - 1].id">{{ row.saturday[index - 1].name[0] }}</span>
          </el-table-column>
        </template>
      </el-table-column>

      <el-table-column label="星期日" align="center" width="80">
        <template v-for="index in class_num">
          <el-table-column :label="index.toString()" align="center" width="40" >
            <span slot-scope="{row}" v-if="row.sunday && row.sunday[index - 1].id">{{ row.sunday[index - 1].name[0] }}</span>
          </el-table-column>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import {getCourseList, getGradeScheduler} from '@/api/course'
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
      downloadLoading: false,
      Scheduler: undefined,
      class_num: 8,
      week_num: ['星期一', '星期二', '星期三', '星期四', '星期五']
    }
  },
  created() {
    // 初始化
    this.getList()
    this.getScheduler()
  },
  methods: {
    getScheduler() {
      getGradeScheduler(this.listQuery).then(response => {
        console.log(response.data)
        this.Scheduler = response.data
      })
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
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
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
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
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
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
