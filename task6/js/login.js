/**
 * Created by Master on 2016/12/14.
 */
var routerApp = angular.module("routerApp",["ui.router"]);
routerApp.controller("loginCtl", function ($scope, $http) {
    $scope.login = function () {
        $http({
            url: "/jns/a/login",
            method: "post",
            data: $.param({"mobile": $scope.mobile, "pwd": $scope.pwd}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function (response) {
                if (response.message === "success") {
                    location.href = "list.html"
                }else {
                    $scope.msg=response.message
                }
            })
            .error(function (response) {
                    alert(response.message)
            })
    }
});

routerApp.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home',{
            url:"/home",
            templateUrl:"login.html"
        })
        .state('list',{
            url:"/list",
            templateUrl:"list.html"
        })
        .state('edit',{
            url:"/edit",
            templateUrl:"add.html"
        })
})