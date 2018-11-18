app.controller("patientHomeCntrl",function ($scope,$rootScope,$location){
	$scope.pt=$rootScope.patient
	$scope.myProfile=function(){
		$scope.myDetails=true
	}
	$scope.logout=function(){
		$location.path('/patientLogin')
	}
})