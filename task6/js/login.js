/**
 * Created by Master on 2016/12/14.
 */
var loginApp = angular.module("loginApp", []);
loginApp.controller("loginCtl", function ($scope, $http) {
    $scope.tesT = function () {
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