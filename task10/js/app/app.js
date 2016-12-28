/**
 * Created by Master on 2016/12/14.
 */
var routerApp = angular.module("routerApp", ["ui.router", "oc.lazyLoad"]);
routerApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", '/login');
    $stateProvider

        .state('login', {
            url: "/login",
            templateUrl: "login.html",
            controller: "loginCtl"
        })

        .state('admin', {
            url: "/admin",
            templateUrl: "admin.html",
            controller: "listCtl",
            resolve: {
                loadFile: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['js/listCtl.js'])
                }]
            }
        })

        .state('admin.list', {
            url: "/list",
            templateUrl: "list.html",
            controller: "listCtl"
        })

        .state('admin.add', {
            url: "/add",
            templateUrl: "add.html",
            controller: "addCtl",
            resolve: {
                loadFile: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['css/task10.css'])
                }]
            }

        })
        .state('admin.user', {
            url: "/user",
            templateUrl: "user.html",
            controller: "userCtl"
        })
})
    .run(function ($rootScope, $templateCache) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (typeof(current) !== 'undefined') {
            $templateCache.remove(current.templateUrl);
        }
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
          response.message === "success"?location.href = "home.html#/admin": $scope.msg = response.message
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
    ($scope.request = function () {
        $http.get("/student-ajax/students")
            .success(function (response) {
                if (response.message === "查询成功") {
                    $scope.userList = response.data;
                    !!$location.hash()? $scope.page = $location.hash(): $scope.page = 1  /*读取哈希值，若存在则保持页面/*否则返回第一页*/

                    if ($scope.page < "2") {
                        $scope.preState = true
                    }

                    for (var x in $location.search()) {//根据url条件过滤数据
                        $scope.userList = $filter('searched')($scope.userList);
                        continue
                    }
                    $scope.paging($scope.userList);
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

        data.length / 8 <= $scope.page?  $scope.nextState = true:  $scope.nextState = false;

    };
    /****************翻页**********/
    $scope.nextPage = function () {
        $scope.page++;
        $location.hash($scope.page);
        $scope.preState = false;
        $scope.request();
    };
    $scope.prePage = function () {
        $scope.page--;
        if ($scope.page < "2") { //防止点击频率过高disabled失效
            $scope.preState = true
        }
        $location.hash($scope.page)
        $scope.request()
    };
    /*----------------------搜索--------------------*/
    $scope.search = function () {
        $scope.page = 1;
        $location.hash($scope.page);//页码重置URL哈希值
        $location.search({//检索条件存储URL
            "type": $scope.selectType, "talent": $scope.selectTalent,
            "level": $scope.selectLevel
        });
        $scope.request();
    };
    $scope.del = function () {
        $scope.id = this.user.id;
        $http({
            url: "/student-ajax/students",
            method: "post",
            params: {id: $scope.id},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function (response) {
                alert(response.message);
                $scope.request()

            });

    }

});

routerApp.controller("addCtl", function ($ocLazyLoad, $scope, $http, $rootScope) {
    var pattern = /[^\u4e00-\u9fa5]/g;
    $scope.checkForm = true;


    $rootScope.check = function () {
        var oName = $scope.name,
            oQQ = $scope.qq,
            oType = $scope.type,
            oSchool = $scope.school,
            oTalent = $scope.talent,
            oLevel = $scope.level,
            oJoinTime = $scope.joinTime,
            oWish = $scope.wish;
        $scope.checkName = !(!!oName && 2 <= oName.length && oName.length <= 5 && !pattern.test(oName));
        $scope.checkQQ = !(!!oQQ && 6 <= oQQ.toString().length && oQQ.toString().length <= 15);
        $scope.checkType = !("string" === typeof oType);
        $scope.checkSchool = !oSchool;
        $scope.checkTalent = !("string" === typeof oTalent);
        $scope.checkLevel = !("string" === typeof oLevel);
        $scope.checkJoinTime = !oJoinTime;
        $scope.checkWish = !oWish;
        $scope.checkForm = ($scope.checkName || $scope.checkQQ || $scope.checkType || $scope.checkSchool ||
        $scope.checkTalent || $scope.checkLevel || $scope.checkWish)
        console.log($scope.wish)
        console.log($scope.checkWish)
        console.log($scope.checkForm)

    }

    $(":radio").off().on("change", function () {
        $scope.check()
    });

    $scope.submitData = function () {
        $http({
            url: '/student-ajax/student',
            method: 'post',
            data: $.param({
                "name": $scope.name,
                "qq": $scope.qq,
                "type": $scope.type,
                "school": $scope.school,
                "talent": $scope.talent,
                "level": $scope.level,
                "jointime": $scope.joinTime,
                "wish": $scope.wish
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function (response) {
                alert(response.message)
            })
    }


});

routerApp.controller("userCtl", function ($scope, $http, $rootScope) {
    $scope.upLoad = function (files) {
        var fd = new FormData();
        show = document.getElementById("after");
        $scope.imageUrl = window.URL.createObjectURL(files[0]);
        show.src = $scope.imageUrl;//本地预览
        fd.append("file", files[0]);
        $rootScope.uploaded = function () {

            $http.post("/jns/a/u/img/test", fd, {
                headers: {"content-Type": undefined},
                transformRequest: angular.identity
            })
                .success(function (response) {
                    if (response.message === "success")
                        $scope.imageUrl = response.data.url;
                    alert(response.message);
                    $scope.netUrl = response.data.url;
                })
        };
        /*var reader=new FileReader();//html5 FileReader接口
         reader.readAsDataURL(files[0]);
         reader.onload=function () {
         show.src=this.result
         }*/

    }
});


/*----------------搜索过滤器------------------*/
routerApp.filter("searched", function ($location) {
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
                /* console.log(typeof oBject[property])
                 console.log(typeof data[i][property])*/
                y++
            }
            if (x === y) {//每当url中属性与对象配对成功一次X+1；y为url所包含的属性数量
                userData.push(data[i]);
            }
            if (!z) {//URL内无属性值停止过滤函数
                return
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
})

routerApp.factory('Common', [
    '$http', function ($http) {
        return {
            loadScript: function (url, callback) {
                var head = document.getElementsByTagName("head")[0];
                var script = document.createElement("script");
                script.setAttribute("type", "text/javascript");
                script.setAttribute("src", url);
                script.setAttribute("async", true);
                script.setAttribute("defer", true);
                head.appendChild(script);
                if (document.all) {
                    //IE
                    script.onreadystatechange = function () {
                        var state = this.readyState;
                        if (state === 'loaded' || state === 'complete') {
                            callback && callback();
                        }
                    }
                }
                else {
                    //firefox, chrome
                    script.onload = function () {
                        callback && callback();
                    }
                }
            },
            loadCss: function (url) {
                var ele = document.createElement('link');
                ele.href = url;
                ele.rel = 'stylesheet';
                if (ele.onload == null) {
                    ele.onload = function () {
                    };
                }
                else {
                    ele.onreadystatechange = function () {
                    };
                }
                angular.element(document.querySelector('body')).prepend(ele);
            }
        }
    }
]);
routerApp.directive('ueditor', [
    'Common',
    '$rootScope',
    function (Common, $rootScope) {
        return {
            restrict: 'EA',
            require: 'ngModel',
            link: function (scope, ele, attrs, ctrl) {
                $rootScope.$emit('loading', '初始化编辑器...');//广播loading事件，可以删除
                var _self = this,
                    _initContent,
                    editor,
                    editorReady = false,
                    base = '../task5/UEditor', //ueditor目录
                    _id = attrs.ueditor;
                var editorHandler = {

                    init: function () {
                        window.UEDITOR_HOME_URL = base + '/';
                        var _self = this;
                        if (typeof UE != 'undefined') {
                            editor = UE.getEditor(_id, {
                                toolbars: [
                                    [
                                        'fontsize', '|',
                                        'blockquote', 'horizontal', '|',
                                        'removeformat', '|',
                                        'insertimage', '|',
                                        'bold', 'italic', 'underline', 'forecolor', 'backcolor', '|',
                                        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify',
                                        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                                        'insertorderedlist', 'insertunorderedlist', '|',
                                        'link', 'unlink', '|',
                                        'emotion'
                                    ]
                                ]
                            });
                            editor.ready(function () {
                                editor.setHeight(180);
                                editorReady = true;
                                $rootScope.$emit('loading', '');//编辑器初始化完成
                                editor.addListener('contentChange', function () {//双向绑定
                                    if (!scope.$$phase) {
                                        scope.$apply(function () {
                                            ctrl.$setViewValue(editor.getContent());
                                        });
                                    }
                                })
                                editor.addListener("blur", function () {
                                    $rootScope.check();
                                })
                                ;
                            });
                        }
                        else {
                            Common.loadScript(base + '/ueditor.config.js', null);
                            Common.loadScript(base + '/ueditor.all.min.js', function () {
                                _self.init();
                            });
                        }
                    },


                    setContent: function (content) {
                        if (editor && editorReady) {
                            editor.setContent(content);
                        }
                    }
                };
                ctrl.$render = function () {
                    _initContent = ctrl.$isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue;
                    editorHandler.setContent(_initContent);//双向绑定
                };
                editorHandler.init();
                //事件
                $rootScope.$on('$routeChangeStart', function () {
                    editor && editor.destroy();
                });
            }
        }
    }
]);