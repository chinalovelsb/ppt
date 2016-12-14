/**
 * Created by Master on 2016/12/14.
 */
var loginApp = angular.module("loginApp", []);
loginApp.controller("loginCtl", function ($scope, $http) {
    $scope.tesT = function () {
        console.log(typeof ($scope.mobile));
        console.log(typeof ($scope.pwd));
        $http({
            url: "/jns/a/login",
            method: "post",
            data: $.param({"mobile": $scope.mobile, "pwd": $scope.pwd}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function (response) {
                if (response.message === "success") {
                    location.href = "list.html"
                }
            })
    }
});