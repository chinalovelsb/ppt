/**
 * Created by Master on 2016/12/26.
 */
angular.module('routerApp')
    .controller("listCtl", function ($scope, $http, $location, $rootScope, $filter) {

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

        $scope.selectType = $scope.type[0].value;//option初值，防止首项空白
        $scope.selectLevel = $scope.level[0].value;
        $scope.selectTalent = $scope.talent[0].value;

        /*--------------请求-----------------*/
        ($scope.request = function () {
            $http.get("/student-ajax/students")

                .success(function (response) {
                    if (response.message === "查询成功") {
                        $scope.userList = response.data;

                        /*读取哈希值，若存在则保持页面/*否则返回第一页*/
                        !!$location.hash() ? $scope.page = $location.hash() : $scope.page = 1

                        if ($scope.page*1 < 2) { //禁用上一页
                            $scope.preState = true
                        }

                        for (var x in $location.search()) {//判空 根据url条件过滤数据
                            $scope.userList = $filter('searched')($scope.userList);
                           /* return false;*/
                        }

                        $scope.paging($scope.userList);//执行分页

                        /*************每次数据获取将URL搜索条件提取用于初始化select*********/
                        $scope.searchData = $location.search();
                        for (var property in  $scope.searchData) {
                            switch (property) {
                                case "type":
                                    $scope.selectType = $scope.searchData[property] * 1;
                                    break;
                                case "talent":
                                    $scope.selectTalent = $scope.searchData[property] * 1;
                                    break;
                                case "level":
                                    $scope.selectLevel = $scope.searchData[property] * 1;
                                    break;
                            }
                        }
                        /*******************************end*********************/
                    }
                });
        })();

        /**----------------- 分页--------------------***/
        $scope.paging = function (data) {
            $scope.array = [];
            for (var i = 0; i < data.length; i++) {
                if (($scope.page - 1) * 8 <= i && i <= ($scope.page - 1) * 8 + 7) { //每页8行数据
                    $scope.array.push(data[i])
                }
            }

            $scope.userList = $scope.array;
            //限定最大页数 禁用翻页
            data.length / 8 <= $scope.page ? $scope.nextState = true : $scope.nextState = false;
        };

        /****************翻页**********/
        $scope.nextPage = function () {
            $scope.page++;
            //noinspection JSValidateTypes
            $location.hash($scope.page);
            $scope.preState = false;
            $scope.request();
        };
        $scope.prePage = function () {
            $scope.page--;
            if ($scope.page < 2) { //防止点击频率过高disabled失效
                $scope.preState = true
            }
            $location.hash($scope.page);
            $scope.request()
        };


        /*----------------------搜索--------------------*/
        $scope.search = function () {
            $scope.page = 1;
            $location.hash($scope.page);//

            $location.search({//检索条件存储URL
                "type": $scope.selectType, "talent": $scope.selectTalent,
                "level": $scope.selectLevel
            });

            $scope.request();
        };

        $scope.del = function () { //删除
            $scope.id = this.user.id;

            $http({
                url: "/student-ajax/students",
                method: "post",
                params: {id: $scope.id}, //序列化请求form-Data
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })

                .success(function (response) {
                    alert(response.message);
                    $scope.request()
                });
        }

        $scope.edit = function () {
            $scope.id = this.user.id;
            $location.search({"id":$scope.id});
            $location.path('admin/add')
        }

    });

routerApp.filter("searched", function ($location) { //搜索过滤
    return function (data) {
        var userData = [];
        var oBject = $location.search();

        for (var i = 0; i < data.length; i++) {
            var y = 0, x = 0, z = 0;

            for (var property in oBject) {//遍历属性
                z++;
                if (oBject[property] == data[i][property]) {//过滤搜索函数的值类型为numbe
                    x++;                                     //刷新通过url取的值为string 全等将不能通过
                }
                y++;
                /* console.log(typeof oBject[property])
                 console.log(typeof data[i][property])*/
            }

            if (x === y) {//每当url中属性与对象配对成功一次X+1；y为url所包含的属性数量
                userData.push(data[i]);
            }
            if (!z) {//URL内无属性值停止过滤函数
                return;
            }
        }
        return userData;
    }
});


routerApp.filter('timestamp', function () {
    return function (joinTime) {
        time = new Date(joinTime).toLocaleString().replace(/\//g, "-");
        return time;
    }
});