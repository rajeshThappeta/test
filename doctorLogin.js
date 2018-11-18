app.controller("doctorLoginCntrl",function ($scope,$http,$location,$rootScope) {
    $scope.login = function () {
        var url = "http://localhost:4000/doctorLogin?userName="+$scope.dr.userName+"&password="+$scope.dr.password;
        $http.get(url)
       	.then(function(response){
            	if(response.data !="error"){
            		$rootScope.doctor=response.data
                	$scope.x=true
                	$location.path('/doctorHome')
            	}else{
            		$scope.dr.userName=""
            		$scope.dr.password=""
            		alert("Invalid username/password")
            	}
            
       })
    }
});