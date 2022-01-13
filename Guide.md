
## 需要的软件

WebStorm、nodejs

##如何运行代码

在IDE下方的`Terminal`里运行下面的代码

```bash
npm install --registry=https://registry.npm.taobao.org
npm run dev
```

##如何添加页面

### 1.添加菜单

菜单位于`src/router/index.js`中的`asyncRoutes`，菜单的位置和代码的位置是一致的
如果代码靠前，那么显示的菜单也靠前

可以注释代码、修改代码，自行看看主页的变化，更加直观地感受菜单的添加方法


### 2.添加API

API位于`src/api`文件夹中，可以参考`src/api/semester.js`的写法，里面有基本增删改查的模板

这个后端为了调试方便使用了`mock.js`，`mock.js`会模拟出一个后端。这个文件同样需要添加，这样可以直接在本地调试。可以参考`mock/semester.js`的写法

添加完虚拟API后，需要修改`mock/index.js`的定义，添加相关定义，例如我添加完semester后，`mock/index.js`开头的定义更改为

```js
const user = require('./user')
const role = require('./role')
const article = require('./article')
const search = require('./remote-search')
const semester = require('./semester')

const mocks = [
  ...user,
  ...role,
  ...article,
  ...search,
  ...semester,
]
```

增加了两行
```js
const semester = require('./semester')
...semester,
```

### 3.添加页面

页面位于`src/views/main`

`src/views`文件夹中的其他文件是这套后台系统自带的模板

对于有输入框的页面，可参考`src/views/table/complex-table.vue`

表格展示部分着重关注下面的代码块，`label`为显示的标签名，`<span>{{ row.id }}</span>`决定了怎么从一条记录里取数据，`prop`定义了逻辑代码将这个输入框看做哪个字段

```angular2html
<el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
  <template slot-scope="{row}">
    <span>{{ row.id }}</span>
  </template>
</el-table-column>
```

所有需要修改的部分都添加了如下的注释，在这一页搜`KD000`即可找到需要修改的部分

```angular2html
KD000 : start for 输入框代码
KD000 : end for 输入框代码
```


# 提效工具

`ctrl shift A`万能工具条，选择`Files`即可进行文件搜索，例如我要找Teacher里的index在哪里，直接输入`teach index`即可，能够帮你快速找到需要修改的文件