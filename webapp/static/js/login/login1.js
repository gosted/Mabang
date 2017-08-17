(function() {
// 创建myModule模块、注册服务
var myModule = angular.module('App', []);
myModule.service('myService', function() {
  this.my = 0;
  console.log(1)
});
 

})()