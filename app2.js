var app=angular.module('app', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
        /*.when('/home',{
            templateUrl:"index.html"
        })*/
        .when('/adminLogin',{
            templateUrl:"adminLogin.html",
            controller :"controllers/adminLoginCntrl"
        }).when('/doctorLogin',{
            templateUrl:"doctorLogin.html",
            controller :"controllers/doctorLoginCntrl"
        }).when('/doctorRegister',{
            templateUrl:"doctorRegister.html",
            controller :"doctorRegisterCntrl"
        }).when('/patientLogin',{
            templateUrl:"patientLogin.html",
            controller :"patientLoginCntrl"
        }).when('/patientRegister',{
            templateUrl:"patientRegister.html",
            controller :"patientRegisterCntrl"
        }).when('/patientHome',{
            templateUrl:"patientHome.html",
            controller :"patientHomeCntrl"
        }).when('/doctorHome',{
            templateUrl:"doctorHome.html",
            controller :"doctorHomeCntrl"
        }).when('/adminHome',{
            templateUrl:"adminHome.html",
            controller :"adminHomeCntrl"
        })
});

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

app.controller("patientHomeCntrl",function ($scope,$rootScope,$location){
    $scope.pt=$rootScope.patient
    $scope.myProfile=function(){
        $scope.myDetails=true
    }
    $scope.logout=function(){
        $location.path('/patientLogin')
    }
})

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