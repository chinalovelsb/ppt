/**
 * Created by Master on 2017/1/8.
 */
angular.module('app')
    .factory('getProfession',['$q','$http',function ($q,$http) {
        return {
            //banner图
            articleList:function (params) {
                return $http.get('/lbd/a/article/search',{params:params})
            },

           //职位信息列表 (最新、推荐，页数，数量)
            ProfessionList:function (params) {
                return $http.get('/lbd/a/profession/search',{params:params})
            },

            //职业详情
            ProfessionDetail:function (id) {
                var deferred = $q.defer(),
                    promise = deferred.promise;
                    $http.get('/lbd/a/profession/' +id).success(function (res) {
                        deferred.resolve(res.data)
                    })
                return promise
            },

            //公司列表
            companyList:function (params) {
                return $http.get('/lbd/a/company/search',{params:params})
            },

            companyDetail:function (id) {
                return $http.get('/lbd/a/company/'+id)
            }

        }
    }])

    //搜索面板
    .factory('searchPanel',searchPanel);
    searchPanel.$inject=[];
    function searchPanel() {
        return {
            company:function (idx, type,vm) {
                    switch (type){
                        case 'industry':
                            vm.chosen.industry=idx;
                            idx===0?vm.params.industry='':vm.params.industry=idx-1;
                            break;
                        case 'financingtype':
                            vm.chosen.financingtype=idx;
                            idx===0?vm.params.financing='':vm.params.financing=idx-1;
                            break;
                        case 'city':
                            vm.chosen.city=idx;
                            idx===0?vm.params.city='':vm.params.city=idx;
                            break;
                    }
            },
            profession:function (idx, type, vm) {
                    switch (type){
                        case 'industry':
                            vm.chosen.industry=idx;
                            idx===0?vm.params.industry='':vm.params.industry=idx-1;
                            break;
                        case 'education':
                            vm.chosen.education=idx;
                            idx===0?vm.params.education='':vm.params.education=idx-1;
                            break;
                        case 'city':
                            vm.chosen.city=idx;
                            idx===0?vm.params.city='':vm.params.city=idx;
                            break;
                        case 'salary':
                            vm.chosen.compensation=idx;
                            idx===0?vm.params.compensation='':vm.params.compensation=idx-1;
                            break;
                        case 'experience':
                            vm.chosen.experience=idx;
                            idx===0?vm.params.experience='':vm.params.experience=idx-1;
                            break;
                        case 'pubdate':
                            vm.chosen.pubdate=idx;
                            idx===0?vm.params.pubdate='':vm.params.pubdate=idx;
                            break;

                }
            }
        }
    }
