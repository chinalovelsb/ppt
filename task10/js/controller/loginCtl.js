/**
 * Created by Master on 2016/12/26.
 */
routerApp.controller("loginCtl", function ($scope, $http) {
    $scope.login = function () {
        $http({
            url: "/jns/a/login",
            method: "post",
            data: $.param({"mobile": $scope.mobile, "pwd": $scope.pwd}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })


            .success(function (response) {
                response.message === "success"?location.href = "home.html#/admin": $scope.msg = response.message
            })


            .error(function () {
                alert("跨域未配置，无法连接服务器")
            })
    }
});