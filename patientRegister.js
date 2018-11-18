app.controller("patientRegisterCntrl",function ($scope,$http,$location) {
    $scope.registration = function () {
        var url = "http://localhost:4000/patientRegister?userName="+$scope.patient.userName+"&password="+$scope.patient.password+"&fullName="+$scope.patient.fullName+"&mobileNo="+$scope.patient.mobileNo+"&disease="+$scope.patient.disease+"&age="+$scope.patient.age+"&gender="+$scope.patient.gender;
        console.log($scope.patient.userName)
        console.log($scope.patient.password)
        $http.get(url)
            .then(function(response){
                if(response.data=="success"){
                	$scope.x=true
                	$location.path("/patientLogin")
                }else{
                	if(response.data=="error"){
                    	$scope.dr.userName=""
                    	$scope.dr.password=""
                    }else{
                    		$scope.dr.userName=""
                    		alert("already user name exist")
                    }
                }
            })
    }
});