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
routerApp.controller("listCtl", function ($scope, $http, $location, $rootScope, $filter) {
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
    $scope.time = function (joinTime) {   /*可改为服务*/
        time = new Date(joinTime).toLocaleString().replace(/\//g, "-");
        return time;
    };
    /*    request($http,students,get)*/
    $scope.test = function () {
        var i = 0;
        for (var x in $location.search()) {
            i++
        }
        if (i) {
            $scope.request(1)

        } else {
            $scope.request(0)
        }
    }

    $scope.request = function (check) {
        $http.get("/student-ajax/students")
            .success(function (response) {
                if (response.message === "查询成功") {
                    $scope.userList = response.data;
                    if (!!$location.hash()) {   /*读取哈希值，若存在则保持页面*/
                        $scope.page = $location.hash();
                    } else {
                        $scope.page = 1
                    }
                    if ($scope.page === "1") {
                        $scope.preState = true
                    }
                    switch (check) {
                        case 0:
                            $scope.paging($scope.userList);
                            break;
                        case 1:
                            $rootScope.searchData = $location.search();
                            $scope.userList = $filter('searched')($scope.userList);
                            $scope.paging($scope.userList);
                            break;

                    }

                    $scope.searchData = $location.search();
                    /*URL取搜索条件*/
                    if (!isNaN($scope.searchData.type)) {   /*读取URL条件初始化selected*/
                        $scope.selectType = $scope.type[$scope.searchData.type].value;
                    }

                    if (!isNaN($scope.searchData.talent)) {
                        $scope.selectTalent = $scope.talent[$scope.searchData.talent].value;
                    }

                    if (!isNaN($scope.searchData.level)) {
                        $scope.selectLevel = $scope.level[$scope.searchData.level].value;
                    }
                }


            });
    };
    $scope.test();

    //分页
    $scope.paging = function (data) {
        $scope.array = [];
        for (var i = 0; i < data.length; i++) {
            if (($scope.page - 1) * 8 <= i && i <= ($scope.page - 1) * 8 + 7) {
                $scope.array.push(data[i])
            }
        }
        $scope.userList = $scope.array;
        if (data.length / 8 <= $scope.page) { /*最大页数禁用翻页*/
            $scope.nextState = true
        } else {
            $scope.nextState = false
        }

    }
    /*翻页*/

    $scope.nextPage = function () {

        $scope.page++;
        $location.hash($scope.page)
        $scope.preState = false;
        $scope.test();


    };
    $scope.prePage = function () {
        $scope.page--;
        $location.hash($scope.page)
        $scope.test()
    };
    /*搜索*/
    $scope.search = function () {
        $scope.searchData = $location.search();
        /*URL取搜索条件*/


        $scope.page = 1;
        $location.hash($scope.page);
        /*页码充值哈希值*/
        $location.search({
            "type": $scope.selectType, "talent": $scope.selectTalent,
            "level": $scope.selectLevel
        });
        /*搜索条件*/
        $scope.test();

    }
});
routerApp.filter("searched", function ($rootScope) {
    return function (data) {

        var userData = [];

        var a = $rootScope.searchData
        for (var i = 0; i < data.length; i++) {
            var y = 0;
            var x = 0;

            for (var b in a) {


                if (a[b] === data[i][b]) {
                    x++

                }
                y++
                if (x === y) {
                    userData.push(data[i]);
                }
            }

        }
        return userData;

    }

})

