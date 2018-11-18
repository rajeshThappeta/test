app.controller("doctorRegisterCntrl",function ($scope,$http,$location) {
    $scope.registration = function () {
        var url = "http://localhost:4000/doctorRegister?userName="+$scope.dr.userName+"&password="+$scope.dr.password+"&fullName="+$scope.dr.fullName+"&specialization="+$scope.dr.specialization+"&age="+$scope.dr.age+"&gender="+$scope.dr.gender;
        $http.get(url,$scope.dr)
            .then(function(response){
                if(response.data=="success"){
                	$scope.x=true
                	alert("regestered successfully")
                	$location.path("/doctorLogin")
                }else{
                	if(response.data=="error"){
                		$scope.dr.userName=""
                	}else{
                		$scope.dr.userName=""
                		alert("already user name exist")
                	}
                }
            })
    }
});