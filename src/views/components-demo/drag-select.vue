<template>
  <div class="components-container">
    <el-drag-select v-model="value" filterable :filter-method="dataFilter" @focus="resetSelect"  style="width:500px;" multiple placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-drag-select>

    <div style="margin-top:30px;">
      <el-tag v-for="item of value" :key="item" style="margin-right:15px;">
        {{ item }}
      </el-tag>
    </div>
  </div>
</template>

<script>
import ElDragSelect from '@/components/DragSelect' // base on element-ui

export default {
  name: 'DragSelectDemo',
  components: { ElDragSelect },
  data() {
    return {
      value: ['格斗课 - 刘华强', '生理课 - 李橙', '篮球课 - 王殿元'],
      options: [{
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
    }
  },

  methods: {

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
    }
  }
}

</script>
