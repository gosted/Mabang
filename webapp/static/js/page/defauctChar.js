var app = angular.module('myApp', ['ngCookies']);
// 获取部门数据
// 部门折线图
var charList = {};
app.factory('dataServicedeps', ['$http', '$q', '$cookies', function ($http, $q, $cookies) {
  var userId = $cookies.get('userId');// 读取cookie存的userID
  var token = $cookies.get('token');// 读取cookie存的token  
  charList.userId = userId;
  charList.token = token;
  charList.data = {};
  charList.data = angular.toJson(charList.data);
  charList = angular.toJson(charList);
  return {  
    query : function() {  
      var deferred = $q.defer();//声明承诺
      $http.post('cfg', charList, {
      headers : {'contentType' : 'application/json','url-mapping' : '/app/user/userLineCharts'}
      }).success(function(data, status, headers, config) {          
          deferred.resolve(data);//请求成功        
      }).error(function(data, status, headers, config ) {
          deferred.reject(data); //请求失败
      }); 
      return deferred.promise;   // 返回承诺
    } 
  };  
}]); 
app.directive('line', function(dataServicedeps) {        
      return {  
          scope: {  
              id: "@",  
              legend: "=", 
              data: "=" ,
              result:"=" 
          },  
          restrict: 'E',  
          template: '<div style="height:400px;"></div>',  
          replace: true,  
          link: function($scope, element, attrs, controller) { 
            var promise = dataServicedeps.query(); //获得承诺接口  
            promise.then(function(data) {  // 成功回调
              if (data.code == '0') {
              $scope.result = data.data;
              $scope.data = [];// 数据
              $scope.legend = [];//图例
              angular.forEach( $scope.result, function(value, key){
                $scope.legend.push(key);
                $scope.data.push(value);
              });
              $scope.xAxis = data.date;
              /*console.log($scope.data);
              console.log($scope.legend);*/
              var option = {
                  title: {
                    text: '员工数量变动统计'
                  },
                  tooltip : {
                      trigger: 'axis',
                      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                      }
                  },
                  toolbox: {
                    show: true,
                    feature: {
                      magicType: {type: ['line', 'bar']}
                    }
                  },
                  legend: {
                      data:$scope.legend
                  },
                  grid: {
                      left: '3%',
                      right: '4%',
                      bottom: '3%',
                      containLabel: true
                  },
                  xAxis : [
                      {
                          type : 'category',
                          data :$scope.xAxis,
                          inverse: true
                      }
                  ],
                  yAxis : [
                      {
                          type : 'value'
                      }
                  ],
                  series: function(){  
                      var serie=[];  
                      for(var i = 0;i < $scope.data.length; i ++){  
                          var item = {  
                              name : $scope.legend[i],  
                              type: 'line',  
                              data: $scope.data[i]  
                          };  
                          serie.push(item);  
                      }  
                      return serie;  
                  }() 
              };
              var lineChart = echarts.init(document.getElementById($scope.id)); 
              lineChart.showLoading(); 
              lineChart.hideLoading();
              lineChart.setOption(option); 
              } else {
                layer.msg(data.msg, {icon: 5});
              }  
            }, function(data) {  // 错误回调
                layer.msg('请求失败', {icon: 5});
            }); 
          }  
      }; 
}); 
// 部门饼图
app.factory('circleServicedep', ['$http', '$q', function ($http, $q) {  
  return {  
    query : function() {  
      var deferred = $q.defer();//声明承诺
      $http.post('cfg', charList, {
      headers : {'contentType' : 'application/json','url-mapping' : '/app/user/userCircleCharts'}
      }).success(function(data, status, headers, config) {          
          deferred.resolve(data);//请求成功        
      }).error(function(data, status, headers, config ) {
          deferred.reject(data); //请求失败
      }); 
      return deferred.promise;   // 返回承诺
    } 
  };  
}]); 
app.directive('circledep', function(circleServicedep) {        
      return {  
          scope: {  
              id: "@",  
              legend: "=", 
              data: "=" ,
              result:"=" 
          },  
          restrict: 'E',  
          template: '<div style="height:400px;"></div>',  
          replace: true,  
          link: function($scope, element, attrs, controller) {
            var promise = circleServicedep.query(); //获得承诺接口  
            promise.then(function(data) { 
              // console.log(data);  // 成功回调
              if (data.code == '0') {
              $scope.result = data.data;
              $scope.data = [];// 数据
              $scope.legend = [];// 图例
              angular.forEach( $scope.result, function(value, key){
                var list = {};// 数据
                list.name = key;
                list.value = value;
                $scope.legend.push(key);
                $scope.data.push(list);
              });
              // console.log($scope.data);
              // console.log($scope.legend);
              var option = {
                  title : {
                      text: '当前部门人数比例统计',
                      x:'left'
                  },
                  tooltip : {
                      trigger: 'item',
                      formatter: "{a} <br/>{b} : {c} ({d}%)"
                  },
                  legend: {
                      orient: 'vertical',
                      left: 'right',
                      data: $scope.legend
                  },
                  series : [
                      {
                          name: '部门人数比例',
                          type: 'pie',
                          radius : '55%',
                          center: ['50%', '60%'],
                          data:$scope.data,
                          itemStyle: {
                              emphasis: {
                                  shadowBlur: 10,
                                  shadowOffsetX: 0,
                                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                              }
                          }
                      }
                  ]
              };
              var cirleChart = echarts.init(document.getElementById($scope.id),'macarons'); 
              cirleChart.setOption(option); 
              } else {
                layer.msg(data.msg, {icon: 5});
              }  
            }, function(data) {  // 错误回调
                layer.msg('请求失败', {icon: 5});
            }); 
          }  
      }; 
});

//设备数据
// 设备折线图
app.factory('dataService', ['$http', '$q', function ($http, $q) {  
  return {  
    query : function() {  
      var deferred = $q.defer();//声明承诺
      $http.post('cfg', charList, {
      headers : {'contentType' : 'application/json','url-mapping' : '/fixed/fixedLineCharts'}
      }).success(function(data, status, headers, config) {          
          deferred.resolve(data);//请求成功        
      }).error(function(data, status, headers, config ) {
          deferred.reject(data); //请求失败
      }); 
      return deferred.promise;   // 返回承诺
    } 
  };  
}]);
//设备数量 折线
app.directive('numline', function(dataService) {        
      return {  
          scope: {  
              id: "@",  
              legend: "=", 
              data: "=" ,
              result:"=" 
          },  
          restrict: 'E',  
          template: '<div style="height:400px;"></div>',  
          replace: true,  
          link: function($scope, element, attrs, controller) { 
            var promise = dataService.query(); //获得承诺接口  
            promise.then(function(data) {  // 成功回调
              // console.log(data);
              if (data.code == '0') {
              $scope.result = data.data;
              $scope.data = [];// 数据
              $scope.legend = [];//图例
              angular.forEach( $scope.result, function(value, key){
                $scope.legend.push(key);
                $scope.data.push(value.num);
              });
              $scope.xAxis = data.date;
              /*console.log($scope.data);
              console.log($scope.legend);*/
              var option = {
                  title: {
                    text: '设备数量变动统计'
                  },
                  tooltip : {
                      trigger: 'axis',
                      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                      }
                  },
                  toolbox: {
                    show: true,
                    feature: {
                      magicType: {type: ['line', 'bar']}
                    },
                    zlevel: 5
                  },
                  legend: {
                      data:$scope.legend
                  },
                  grid: {
                      left: '3%',
                      right: '4%',
                      bottom: '3%',
                      containLabel: true
                  },
                  xAxis : [
                      {
                          type : 'category',
                          data :$scope.xAxis,
                          inverse: true
                      }
                  ],
                  yAxis : [
                      {
                          type : 'value'
                      }
                  ],
                  series: function(){  
                      var serie = [];  
                      for(var i = 0;i < $scope.data.length; i ++){  
                          var item = {  
                              name : $scope.legend[i],  
                              type: 'line',  
                              data: $scope.data[i]  
                          };  
                          serie.push(item);  
                      }  
                      return serie;  
                  }() 
              };
              var lineChart = echarts.init(document.getElementById($scope.id)); 
              lineChart.showLoading(); 
              lineChart.hideLoading();
              lineChart.setOption(option); 
              } else {
                layer.msg(data.msg, {icon: 5});
              }  
            }, function(data) {  // 错误回调
                layer.msg('请求失败', {icon: 5});
            }); 
          }  
      }; 
}); 
//设备费用折线 
app.directive('amountline', function(dataService) {        
      return {  
          scope: {  
              id: "@",  
              legend: "=", 
              data: "=" ,
              result:"=" 
          },  
          restrict: 'E',  
          template: '<div style="height:400px;"></div>',  
          replace: true,  
          link: function($scope, element, attrs, controller) { 
            var promise = dataService.query(); //获得承诺接口  
            promise.then(function(data) {  // 成功回调
              // console.log(data);
              if (data.code == '0') {
              $scope.result = data.data;
              $scope.data = [];// 数据
              $scope.legend = [];//图例
              angular.forEach( $scope.result, function(value, key){
                $scope.legend.push(key);
                $scope.data.push(value.amount);
              });
              $scope.xAxis = data.date;
              /*console.log($scope.data);
              console.log($scope.legend);*/
              var option = {
                  title: {
                    text: '设备费用变动统计'
                  },
                  tooltip : {
                      trigger: 'axis',
                      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                      }
                  },
                  toolbox: {
                    show: true,
                    feature: {
                      magicType: {type: ['line', 'bar']}
                    }
                  },
                  legend: {
                      data:$scope.legend
                  },
                  grid: {
                      left: '3%',
                      right: '4%',
                      bottom: '3%',
                      containLabel: true
                  },
                  xAxis : [
                      {
                          type : 'category',
                          data :$scope.xAxis,
                          inverse: true
                      }
                  ],
                  yAxis : [
                      {
                          type : 'value'
                      }
                  ],
                  series: function(){  
                      var serie=[];  
                      for(var i = 0;i < $scope.data.length; i ++){  
                          var item = {  
                              name : $scope.legend[i],  
                              type: 'line',  
                              data: $scope.data[i]  
                          };  
                          serie.push(item);  
                      }  
                      return serie;  
                  }() 
              };
              var lineChart = echarts.init(document.getElementById($scope.id)); 
              lineChart.showLoading(); 
              lineChart.hideLoading();
              lineChart.setOption(option); 
              } else {
                layer.msg(data.msg, {icon: 5});
              }  
            }, function(data) {  // 错误回调
                layer.msg('请求失败', {icon: 5});
            }); 
          }  
      }; 
}); 
// 设备饼图
app.factory('circleService', ['$http', '$q', function ($http, $q) {  
  return {  
    query : function() {  
      var deferred = $q.defer();//声明承诺
      $http.post('cfg', charList, {
      headers : {'contentType' : 'application/json','url-mapping' : '/fixed/fixedCircleCharts'}
      }).success(function(data, status, headers, config) {          
          deferred.resolve(data);//请求成功        
      }).error(function(data, status, headers, config ) {
          deferred.reject(data); //请求失败
      }); 
      return deferred.promise;   // 返回承诺
    } 
  };  
}]); 
app.directive('circle', function(circleService) {        
      return {  
          scope: {  
              id: "@",  
              legend: "=", 
              data: "=" ,
              result:"=" 
          },  
          restrict: 'E',  
          template: '<div style="height:800px;"></div>',  
          replace: true,  
          link: function($scope, element, attrs, controller) {
            var promise = circleService.query(); //获得承诺接口  
            promise.then(function(data) { 
              //console.log(data);  // 成功回调
              if (data.code == '0') {
              $scope.result = data.data;
              $scope.data = [];// 数据
              $scope.legend = [];// 图例
              angular.forEach( $scope.result, function(value, key){
                var list = {};// 数据
                list.name = key;
                list.value = value;
                $scope.legend.push(key);
                $scope.data.push(list);
              });
              /*console.log($scope.data);
              console.log($scope.legend);*/
              var option = {
                  title : {
                      text: '各类设备费用比例图',
                      x:'left'
                  },
                  tooltip : {
                      trigger: 'item',
                      formatter: "{a} <br/>{b} : {c} ({d}%)"
                  },
                  legend: {
                      orient: 'vertical',
                      left: 'right',
                      data: $scope.legend
                  },
                  series : [
                      {
                          name: '各类设备费用比例',
                          type: 'pie',
                          radius : '55%',
                          center: ['50%', '60%'],
                          data:$scope.data,
                          itemStyle: {
                              emphasis: {
                                  shadowBlur: 10,
                                  shadowOffsetX: 0,
                                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                              }
                          }
                      }
                  ]
              };
              var cirleChart = echarts.init(document.getElementById($scope.id),'macarons'); 
              cirleChart.setOption(option); 
              } else {
                layer.msg(data.msg, {icon: 5});
              }  
            }, function(data) {  // 错误回调
                layer.msg('请求失败', {icon: 5});
            }); 
          }  
      }; 
});
app.controller('tableCtrl', function($scope, $cookies, $http, $timeout) {   
});