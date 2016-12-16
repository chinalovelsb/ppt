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
        });

      /*.state('list.new',{
            url:'/cild',
            templateUrl:'user.html'
            }

        )*/
});

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
/*routerApp.service("request",function ($http,port,requestType,requestData) {
    this.testF =function () {
        $http({
            url:"/test/"+port,
            method:requestType,
            data:requestData}
        )
    }


});*/
routerApp.controller("listCtl", function ($scope,$http) {

   $scope.localeData={
       "type":["CSS", "JS", "JAVA", "运维", "DBA", "产品", "IOS", "ANDROID"],
        "talent":["学渣", "学霸"],
        "level": ["0基础", "修行3个月以内", "修行6个月以内", "修行1年以内", "修行3年以内", "修行3年以上"]
   }



    $scope.talent = [{name:"全部",value:0},{name:"学渣",value:1}, {name:"学霸",value:2}];
    $scope.level = [{name:"全部",value:0},{name:"0基础",value:1},{ name:"修行3个月以内",value:2},
        { name:"修行6个月以内",value:3},{name:"修行1年以内",value:4},{name:"修行3年以内",value:5},{
        name:"修行3年以上",value:6}];
    $scope.type = [{name:"全部",value:0},{name:"CSS",value:1},{name:"JS",value:2},{name:"JAVA",value:3},{name:"运维",value:4},
        {name:"DBA",value:5},{name:"产品",value:6},{name:"IOS",value:7},{name:"ANDROID",value:8}];
    $scope.selectType = $scope.type[0].value;
    $scope.selectLevel = $scope.level[0].value;
    $scope.selectTalent = $scope.talent[0].value;
/*    request($http,students,get)*/
    $http.get("/test/students")
    .success(function(response){
        if(response.message==="查询成功"){
            $scope.userList = response.data;
            $scope.time = function(joinTime){
                 time=new Date(joinTime).toLocaleString().replace(/\//g,"-");
                return  time;
            }
        }


})
});
