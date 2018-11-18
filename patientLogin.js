app.controller("patientLoginCntrl",function ($scope,$http,$location,$rootScope) {
    $scope.login = function () {
        var url = "http://localhost:4000/patientLogin?userName="+$scope.patient.userName+"&password="+$scope.patient.password;
        $http.get(url)
       	.then(function(response){
                if(response.data !="error"){
                	$rootScope.patient=response.data
                	$scope.x=true
                	$location.path('/patientHome')
                }else{
                	$scope.patient.userName=""
                	$scope.patient.password=""
                	alert("Invalid Username/password")
                }
       })
    }
});