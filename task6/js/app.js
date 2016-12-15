/**
 * Created by Master on 2016/12/14.
 */
var routerApp = angular.module("routerApp",["ui.router"]);
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

      /*.state('list.new',{
            url:'/cild',
            templateUrl:'user.html'
            }

        )*/
})

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
routerApp.controller("listCtl", function ($scope,$http) {
    $scope.type = ["CSS", "JS", "JAVA", "运维", "DBA", "产品", "IOS", "ANDROID"];
    $scope.talent = ["学渣", "学霸"];
    $scope.level = ["0基础", "修行3个月以内", "修行6个月以内", "修行1年以内", "修行3年以内", "修行3年以上"];
$http.get("/test/students")
    .success(function(response){
        if(response.message==="查询成功"){
            $scope.userList = response.data
            $scope.time = function(joinTime){
                var time=new Date(joinTime).toLocaleString().replace(/\//g,"-");
                return  time
            }

        }


})
})
