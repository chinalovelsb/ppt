/**
 * Created by Master on 2016/12/14.
 */
var routerApp = angular.module("routerApp", ["ui.router"]);
routerApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "login.html"
        })
        .state('list', {
            url: "/list",
            templateUrl: "list.html"
        })
        .state('edit', {
            url: "/edit",
            templateUrl: "add.html"
        });
});
/*登录页控制器*/
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
                } else {
                    $scope.msg = response.message
                }
            })
            .error(function () {
                alert("跨域未配置，无法连接服务器")
            })
    }
});
/*
列表页控制器
*/
routerApp.controller("listCtl", function ($scope, $http, $location) {
    $scope.localeData = {
        "type": ["CSS", "JS", "JAVA", "运维", "DBA", "产品", "IOS", "ANDROID"],
        "talent": ["学渣", "学霸"],
        "level": ["0基础", "修行3个月以内", "修行6个月以内", "修行1年以内", "修行3年以内", "修行3年以上"]
    };
    $scope.talent = [{name: "全部"}, {name: "学渣", value: 1}, {name: "学霸", value: 2}];
    $scope.level = [{name: "全部"}, {name: "0基础", value: 1}, {name: "修行3个月以内", value: 2},
        {name: "修行6个月以内", value: 3}, {name: "修行1年以内", value: 4}, {name: "修行3年以内", value: 5},
        {name: "修行3年以上", value: 6}];
    $scope.type = [{name: "全部"}, {name: "CSS", value: 1}, {name: "JS", value: 2}, {name: "JAVA", value: 3},
        {name: "运维", value: 4}, {name: "DBA", value: 5}, {name: "产品", value: 6}, {name: "IOS", value: 7},
        {name: "ANDROID", value: 8}];
    $scope.selectType = $scope.type[0].value;
    $scope.selectLevel = $scope.level[0].value;
    $scope.selectTalent = $scope.talent[0].value;
    /*    request($http,students,get)*/
    $http.get("/student-ajax/students")
        .success(function (response) {
            if (response.message === "查询成功") {
                $scope.userList = response.data;
                $scope.time = function (joinTime) {
                    time = new Date(joinTime).toLocaleString().replace(/\//g, "-");
                    return time;
                };
                $scope.searchData = $location.search();
                $scope.selectType = $scope.type[$scope.searchData.type].value;
                $scope.selectTalent = $scope.talent[$scope.searchData.talent].value;
                $scope.selectLevel = $scope.level[$scope.searchData.level].value;
            }
        });
    $scope.search = function () {
        $location.search({"type": $scope.selectType, "talent": $scope.selectTalent, "level": $scope.selectLevel});
        $scope.searchData = $location.search();
    }
});
