
##如何运行代码
```bash
npm install --registry=https://registry.npm.taobao.org
npm run dev
```

##如何添加页面

### 1.添加菜单

菜单位于`src/router/index.js`中的`asyncRoutes`，菜单的位置和代码的位置是一致的，可以注释代码、修改代码，自行看看主页的变化

更加直观地感受菜单的添加方法

### 2.添加API

API位于`src/api`

这个后端为了调试方便使用了`mock.js`，`mock.js`会模拟出一个后端。这里我们也使用相同的方法
文件的具体写法可以对比`mock/article.js`和`src/api/article.js`

### 3.添加页面

页面位于`src/views/main`

`src/views`文件夹中的其他文件是这套后台系统自带的模板

对于有输入框的页面，可参考`src/views/table/complex-table.vue`

