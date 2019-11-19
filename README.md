# 饿了么服务端

## 20191101更新 ##
* 20191101;

## 20191025更新 ##
* config/index 添加session配置;
* controller/v1/captchas.js 添加获取验证码方法;
* controller/v2/user 添加新增用户方法;
* routes/v1.js 添加获取验证码route;
* index.js 添加保存session;

## 20191024更新 ##
* controller/v2/user 添加新增用户方法;

## 20191021更新 ##
* prototype/baseComponent 添加获取id方法getId;
* models/v2/users 添加新增用户模型;
* models/v2/userInfo 添加新增用户信息模型;

## 20190920更新 ##
* controller/v1/cities 添加获取当前城市getCityById;
* models/v1/cities 模型添加方法添加获取当前城市getCityById;
* routers/v1.js 模型路由根据id获取当前城市;

## 20190910更新 ##
* controller/v1/cities 添加获取请求type;

## 20190905更新 ##
* models/v1/cities 模型添加方法cityHot、cityGroup;

## 20190903更新 ##
* controller/v1/cities新增获取城市名，获取城市信息;
* models/v1/cities新增获取城市信息;

## 20190826更新 ##
* 引入文件模式由require改为import;

## 20190823更新 ##
* prototype/addressComponent增加获取请求ip地址;
* controller/v1/cities新增getCity获取城市列表;

## 20190819更新 ##
* controller中cities.js组件重新绑定getCityName的this；
* 基础组件baseComponent添加fetch方法；

## 20190818更新 ##
* 定位组件编写；

## 20190809更新 ##
* 搭建后端项目基本架构；
* 完善所需要的数据；