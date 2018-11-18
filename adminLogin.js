app.controller("adminLoginCntrl",function ($scope,$http,$location) {
   $scope.login = function () {
       var url = "http://localhost:4000/adminLogin?userName="+$scope.admin.userName+"&password="+$scope.admin.password;
       $http.get(url)
       	.then(function(response){
                if(response.data =="success"){
                	$scope.x=true
                	$location.path('/adminHome')
                }else{
                	alert("invalid username/password")
                	$scope.admin.userName=""
                	$scope.admin.password=""
                }
       })
   }
});