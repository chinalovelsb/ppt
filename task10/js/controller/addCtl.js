/**
 * Created by Master on 2016/12/26.
 */
angular.module('routerApp')
    .controller("addCtl", function ($ocLazyLoad, $scope, $http, $rootScope,$location) {
        (function () {
            if($location.search().hasOwnProperty('id')){
                $scope.id=$location.search().id
               $http.get('/student-ajax/student/'+$scope.id)
                   .success(function (UserMsg) {
                       console.log(UserMsg)
                       $scope.name=UserMsg.name;
                       $scope.qq=UserMsg.qq*1;
                       $scope.type=UserMsg.type;
                       $scope.school=UserMsg.school;
                       $scope.talent=UserMsg.talent;
                       $scope.joinTime=UserMsg.jointime;
                       $scope.level=UserMsg.level;
                       $scope.wish=UserMsg.wish;
                   })
            }

        })()

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

                console.log( typeof $scope.wish)
            $scope.checkName = !(!!oName && 2 <= oName.length && oName.length <= 5 && !pattern.test(oName));
            $scope.checkQQ = !(!!oQQ && 6 <= oQQ.toString().length && oQQ.toString().length <= 15);
            $scope.checkType = !("number" === typeof (oType*1));
            $scope.checkSchool = !oSchool;
            $scope.checkTalent = !("number" === typeof (oTalent*1));
            $scope.checkLevel = !("number" === typeof (oLevel*1));
            $scope.checkJoinTime = !oJoinTime;

            $scope.$apply(function() { $scope.checkWish = !oWish;
                $scope.checkForm = ($scope.checkName || $scope.checkQQ || $scope.checkType || $scope.checkSchool ||
                $scope.checkTalent || $scope.checkLevel || $scope.checkWish);})

           /* console.log($scope.wish)
            console.log($scope.checkWish)
            console.log($scope.checkForm)*/
        };

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