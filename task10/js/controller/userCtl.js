/**
 * Created by Master on 2016/12/26.
 */
angular.module('routerApp')
    .controller("userCtl", function ($scope, $http, $rootScope) {
        $scope.upLoad = function (files) {
            var fd = new FormData();
            var show = document.getElementById("after");
            $scope.imageUrl = window.URL.createObjectURL(files[0]);
            show.src = $scope.imageUrl;//本地预览
            fd.append("file", files[0]);
            $rootScope.uploaded = function () {

                $http.post("/lbd-admin/a/u/img/test", fd, {
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
