/**
 * Created by Master on 2017/1/8.
 */
"use strict"
var app = angular.module('app')
    .factory('requestData', ['$q', '$http', function ($q, $http) {
        return {
            //banner图
            articleList: function (params) {
                return $http.get('/lbd/a/article/search', {params: params})

            },

            //职位信息列表 (最新、推荐，页数，数量)
            ProfessionList: function (params) {
                return $http.get('/lbd/a/profession/search', {params: params})
            },

            //职业详情
            ProfessionDetail: function (id) {
                var deferred = $q.defer(),
                    promise = deferred.promise;
                $http.get('/lbd/a/profession/' + id).success(function (res) {
                    deferred.resolve(res.data)
                });
                return promise
            },

            //公司列表
            companyList: function (params) {
                return $http.get('/lbd/a/company/search', {params: params})
            },

            companyDetail: function (id) {
                return $http.get('/lbd/a/company/' + id)
            }

        }
    }]);
app.factory('clean', clean);
function clean() {
    return function (obj) {
        for (var x in obj) {
            angular.isArray(obj[x]) ? obj[x] = [null] : obj[x] = null;
        }
        return obj;
    }
}
app.factory('duplicateRemoval', function () {
    return function (n, arr) {
        var inArr = false;
        arr[0] === null ? arr = [] : '';
        angular.forEach(arr, function (data, idx) {
            data === n ? remove(idx) : '';
        });
        function remove(idx) {
            arr.splice(idx, 1);
            inArr = true;
        }

        inArr ? '' : arr.push(n);
        return arr
    }
});
//对象属性转number
app.factory('toNum', function () {
    return function (obj) {
        if (angular.isArray(obj)) {
            var arr = [];
            angular.forEach(obj, function (data) {
                arr.push(+data);
                obj = arr
            })
        } else {
            /*  for (var x in obj) {
             isNaN(+obj[x]) ? '' : obj[x] = +obj[x]
             }*/
            angular.forEach(obj, function (data) {
                isNaN(+data) ? '' : data = +data
            })
        }
        return obj
    }
})
app.factory('ObjIsNull', function () {
    return function (obj) {
        var bl;
        angular.forEach(obj, function (data) {
            return data ? bl = true : bl = false;
        })
        return bl
    }
})
//URL存取参数
app.factory('paramster', function ($location, toNum) {
    function set(params) {
        $location.search(params)
    }

    function get(param) {
        return param ? $location.search()[param] : $location.search()
    }

    return {
        set: set,
        get: get
    }
})