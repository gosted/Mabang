(function(){
var injector = angular.injector(["App"]);
var app = angular.module("app",["ngCookies"])
.controller("loginCtrl",["$scope","$cookieStore",function($scope,$cookieStore){
	$scope.userName = "",
	$scope.password = "",
	$scope.rember = false;
	alert(injector.get("myService").my);
	$scope.remberPass = function(){
		$scope.rember = !$scope.rember;
	}
}])
})()




