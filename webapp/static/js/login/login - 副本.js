<<<<<<< HEAD
(function(){
app.controller("loginCtrl",["$scope","$cookieStore","getData",function($scope,$cookieStore,$getData){
	$scope.userName = "",
	$scope.password = "",
	$scope.rember = false;
	
	$scope.remberPass = function(){
		$scope.rember = !$scope.rember;
	}
	$scope.login = function(){
		$getData.getData(""+baseUrl+"user.json",{}).then(function(data){
			console.log(data.data)
		})
	}
}])
=======
// console.log(app)
(function () {
	// var app = angular.module('app', []);
	app.controller('loginCtrl',["$scope","$http","getData", function($scope,$http,$getData) {
	    $scope.userName = "";
	    $scope.passWord = "";
	    $scope.remberPass = false;
	    // 登录函数
	    $scope.login = function () {
	    	// if ($scope.userName != '' && $scope.passWord != '') {
	    		$http({
	    			method:"get",
	    			url:'../../html/login/user.json'
	    		}).then(function sucessLogin(response) {
	    			console.log(response)
	    			$scope.userData = response.data;
	    			angular.forEach($scope.userData,function (data) {
	    				// console.log(data.name)
	    				$scope.loginuser = data.name;
	    				console.log($scope.loginuser);
	    				return $scope.username
	    			})
	    			// alert($scope.loginuser)
	    			// $scope.userName.indexOf(searchElement: any, fromIndex?: int)
	    		}, function errorLogin(error) {
	    			console.log(error)
	    		});

	    		
	    	// } else {
	    	// 	console.log('用户名密码都为空')
	    	// }
	    }
	    // 记住密码
	    $scope.isCheck = function () {
	    	$scope.remberPass = !$scope.remberPass;
	    	$getData.getData('../../html/login/user.json',{}).then(function (data) {
	    		console.log(data.data)
	    	}, function (argument) {
	    		// body...
	    	});
	    	// alert(data.data)
	    }
	}]);

	



>>>>>>> 45acc56588dc58ec5e69be1587aa4f0c54f0a109
})()


// $(function () {

// 	var bool = false;

// 	$('#rember-check').click(function () {
		
// 		bool = !bool;
// 		if (bool) {
// 			$('#rember-check img').show();
// 		} else {
// 			$('#rember-check img').hide();
// 		}
// 	})
// 	var passWord;
// 	var userName;
//     $("#pass").blur(function () {
//     	userName = $('#user').val();
//     	passWord = $('#pass').val();
//     })
//     $('.login-btn').click(function() {
//     	// alert(userName)
//     	// alert(passWord)
//     	if (isRegisterPass(passWord)==true) {
//     		console.log('sucess')
//     		console.log(passWord)
//     	} else {
//     		console.log('输入的密码必须是5-20位的数字 字母 或则下划线');
//     		console.log(passWord)
//     	}
//     });
    
// 	//校验密码：只能输入5-20个以字母开头、可带数字、“_”、“.”的字串
// 	function isRegisterPass(s) 
// 	{ 
// 	var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/; 
// 	if (!patrn.test(s)) return false
// 	return true
// 	}
// })


