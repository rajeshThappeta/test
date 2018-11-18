app.controller("adminHomeCntrl",function ($scope,$http,$location) {
    $scope.patientsList = function () {
    	var url = "http://localhost:4000/adminHome1";
        $http.post(url)
       	.then(function(response){
            if(response.data!="error"){
            	$scope.Plist=true
            	$scope.Dlist=false
            	$scope.patients=response.data
            }else{
            	alert("error")
            }
       })
    }
    $scope.doctorsList = function () {
    	var url = "http://localhost:4000/adminHome2";
        $http.post(url)
       	.then(function(response){
            if(response.data != "error"){
            	$scope.Dlist=true
            	$scope.Plist=false
            	$scope.doctors=response.data
            }else{
            	alert("error")
            }
       })
    }
})