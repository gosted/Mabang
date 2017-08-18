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
})()




