(function(){
app.controller("loginCtrl",["$scope","$cookieStore","langData",function($scope,$cookieStore,$langData){
	$scope.userName = "",
	$scope.password = "",
	$scope.rember = false;
	$langData.data().then(function(data){
		console.log(data)
	})
	$scope.remberPass = function(){
		$scope.rember = !$scope.rember;
	}
}])
})()




