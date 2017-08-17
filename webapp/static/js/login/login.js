
(function function_name(argument) {
	var app = angular.module('loginApp',['ngcookies']);
	app.controller('loginCtrl',function($scope){
		$scope.username = '';// 用户名
		$scope.password = '';// 密码
		$scope.ischecked = false;//不选中
		$scope.test = function () {
			alert(1)
		}
		alert(1)
		$('#rember-check').click(function () {
			alert(1)
			
		})
	    



	})
})()


var bool = false;

$('#rember-check').click(function () {
	
	bool = !bool;
	alert(bool)
	if (bool) {
		$('#rember-check img').show();
	} else {
		$('#rember-check img').hide();
	}
})




