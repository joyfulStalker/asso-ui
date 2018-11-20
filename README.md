# asso-ui
> 一个基于vue2.x编写的后端管理项目

## 介绍


### 说明

　这是一个用vuejs2.0和element-ui 2.x搭建的后台管理界面。
    
### 项目结构
```
├── build  #webpack编译相关文件目录，一般不用动 
├── config  #配置目录
│   ├────dev.env.js  #开发环境变量
│   ├────index.js    #主配置文件
│   └────prod.env.js #生产环境变量
├── dist  #生产环境下build后的文件存放目录（发布目录）
├── server  #服务端代码目录，提供给前端接口
├── src #前端项目源码目录
│   ├───—api  #封装的接口文件目录
│   ├───—assets  #资源目录
│   ├───—common  #公用文件目录
│   ├───—components  #组件及页面文件目录
│   ├───—router  #路由目录
│   ├───—App.vue #项目入口文件
│   ├───—bus.js  #公共通信组件
│   └────main.js  #项目的核心文件
├── static  #开发模式下的静态资源目录
├── index.html #首页入口文件，你可以添加一些 meta 信息或同统计代码啥的
├── package.json #项目配置文件
└── README.md #项目的说明文档，markdown 格式
```

### 相关技术：

* vuejs2.0：一套构建用户界面的渐进式框架，易用、灵活、高效。
* element-ui：一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的组件库。
* vue-router：官方的路由组件，配合vue.js创建单页应用（SPA）非常简单,本工程采用后台获取，动态加载路由，实现路由可配置。
* axios: 基于 Promise 的 HTTP 请求客户端，可同时在浏览器和 node.js 中使用。

## 项目编译和运行

``` bash
第一步： 先安装node v8以上环境
第二步：下载项目
可以直接在git上下载项目源码。
或者通过git命令下载
#git命令下载
git clone https://github.com/joyfulStalker/asso-ui.git

假定项目已经下载下来了。

第三步：启动前端
（1）新开一个命令行窗口
（2）定位到项目目录并安装依赖
  > cd 你自己的位置/asso-ui
  > npm install
（3）依赖安装成功后执行启动命令
  > npm run dev
  # 显示如下内容说明本地启动成功
  # DONE Compiled successfully in 7515ms
  # Listening at http://localhost:8081
   
  #正式环境编译命令
  # build for production with minification
    npm run build

```


### 笔记与心得
 > 2018-11-20
 >> 1.设置代理，修改/config/index.js。
  ``` bash
   dev: {
      env: require('./dev.env'),
      port: 8082,
      autoOpenBrowser: true,
      assetsSubDirectory: 'static',
      assetsPublicPath: '/',
      proxyTable: {
        '/mypath': {
          target: 'http://localhost:8090',//设置你调用的接口域名和端口号 别忘了加http
          changeOrigin: true,
          pathRewrite: {
              '^/mypath': '/' // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 
                              //比如我要调用'http://localhost:8090/user/add'，直接写‘/mypath/user/add’即可
          }
        }
      },
      cssSourceMap: false
    }

  ```
 >> 2.动态路由。
 >> 获取后台路由数据后，需要遍历router.options.routes并push路由到此，即router.options.routes.push(e)，然后router.addRoutes(fmtRoutes);
            并更新store缓存store.commit('initMenu', router.options.routes);此时路由已经添加进去，但是页面并没有出现动态数据，需要点一下才出现，
            解决这个问题需要用的router.beforeEach中的第三个参数next来刷新下才能生效（比如跳转到首页  next({path: '/'} );）
 
   ``` bash
      if (result.data.resultCode == 200) {
            var fmtRoutes = formatRoutes(result.data.data);
            for (let el of fmtRoutes) {
                router.options.routes.push(el)
            }
            router.addRoutes(fmtRoutes);
            store.commit('initMenu', router.options.routes);
            next({path: '/'} );//跳转到首页，相当于刷新路由
        } else {
            that.$message.error('获取菜单失败！');
        }
   ```

注：项目参考了https://github.com/jerry9022/LitAdmin
