app.controller("doctorHomeCntrl",function ($scope,$http,$location,$rootScope) {
	
	$scope.patientsList = function () {
    	var url = "http://localhost:4000/doctorHome";
        $http.post(url)
       	.then(function(response){
            if(response.data!="error"){
            	$scope.Plist=true
        		$scope.dtDetails=false
            	$scope.patients=response.data
            	$scope.dt=$rootScope.doctor;
            }else{
            	alert("error")
            }
       })
    }
	$scope.myProfile = function () {
		$scope.Plist=false
		$scope.dtDetails=true
		$scope.dt=$rootScope.doctor;
	}
	$scope.logout=function(){
		$location.path("/doctorLogin")
	}
})