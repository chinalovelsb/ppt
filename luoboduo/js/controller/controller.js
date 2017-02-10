/**
 * Created by Master on 2017/1/6.
 */
"use strict";
//导航标记
angular.module('app')
    .controller('BarController', BarController);
BarController.$inject = ['$scope', '$location'];
function BarController($scope, $location) {
    $scope.url = function (a) {
        $scope.Url = a;
    };
    $scope.Url = $location.path();
}
//关于我们
angular.module('app')
    .controller('AboutController', AboutController);
AboutController.$inject = [];
function AboutController() {
    var vm = this;
    vm.card = true;
    vm.change = function (n) {
        vm.card = n
    }
}
//职位详情
angular.module('app')
    .controller('ProfessionDetailCtrl', ProfessionDetailCtrl);
ProfessionDetailCtrl.$inject = ['$stateParams', '$location', 'requestData', '$filter'];
function ProfessionDetailCtrl($stateParams, $location, requestData, $filter) {
    var vm = this;
    var id = $stateParams.id || $location.search().id;

    $location.search({'id': id});
    requestData.ProfessionDetail(id).then(function (res) {
        vm.profession = res;
        vm.city = $filter('city')(res);
    });

}
//首页
angular.module('app')
    .controller('FirstController', FirstController);
FirstController.$inject = ['$scope', '$http'];
function FirstController($scope, $http) {
    //首页banner
    $http.get('/lbd/a/article/search?type=0')
        .success(function (response) {
            $scope.bannerUrl = response.data.articleList[0].img
        });
}


//找职位页
angular.module('app')
    .controller('FindProfessionController', FindProfessionController);
FindProfessionController.$inject = ['requestData'];
function FindProfessionController(requestData) {
    var vm = this;

    vm.professionList = [];


    //切换标签
    vm.thisCard = true;
    vm.checked = function (a) {
        !a ? vm.thisCard = false : vm.thisCard = true;
        vm.changeCard(a);
    };

    //获取推荐职位、最新职位
    vm.changeCard = function (type) {
        requestData.ProfessionList({'recommend': type, 'size': 8}).success(function (res) {
            vm.professionList = res.data;
        })
    };
    vm.changeCard(1);


    //公司列表
    requestData.companyList({returnPage: 1}).success(function (res) {
        vm.companyList = res.approvedCompanyList;
        vm.industryImg = res.industryImg;
    })


}

//找精英
angular.module('app')
    .controller('EliteController', EliteController);
EliteController.$inject = ['requestData'];
function EliteController(requestData) {
    var vm = this;
    getBanner();
    function getBanner() {
        requestData.articleList({type: 2}).then(function (res) {
            vm.banner = res.data.data.articleList[0].img
        })
    }

    (function getCompanyList() {
        requestData.companyList({size: 8}).then(function (res) {
            vm.companyList = res.data.data
        })
    })()
}


//公司详情
angular.module('app')
    .controller('CompanyDetailController', CompanyDetailController);
CompanyDetailController.$inject = ['$filter', 'requestData', '$stateParams', '$location'];
function CompanyDetailController($filter, requestData, $stateParams, $location) {
    var vm = this;
    var id;
    id = $stateParams.id || $location.search().id;
    $location.search('id', id);
    //公司详情
    requestData.companyDetail(id).success(function (res) {
        vm.company = res.data.company;
        vm.industryList = $filter('industry')(res.data.industryList);
        vm.tag = res.data.tagList;
        vm.city = $filter('city')(vm.company)
    });
    //在招职位
    var paramas = {};
    paramas.companyId = id;
    requestData.ProfessionList(paramas)
        .success(function (res) {
            vm.total = res.total;
            vm.professionList = res.data;
        })

}

//搜索页标签
angular.module('app')
    .controller('SearchController', SearchController);
SearchCompanyController.$inject = ['$location'];
function SearchController($location) {
    var vm = this;

    $location.path() === "/job/search/companyList" ? vm.Url = false : vm.Url = true;
    $location.path() === "/job/search/searchcompany" ? vm.chosen = 'cpy' : vm.chosen = 'job';
    vm.choose = change;
    function change(type) {
        vm.chosen = type;
    }
}

//搜索职位
angular.module('app')
    .controller('SearchJobController', SearchJobController);
SearchJobController.$inject = ['requestData', '$stateParams', '$location', 'clean', '$state', 'paramster', 'ObjIsNull'];

function SearchJobController(requestData, $stateParams, $location, clean, $state, paramster, ObjIsNull) {
    var vm = this;
    var params, startParams;
    startParams = $stateParams;
    startParams.returnTags = 1;
    startParams.recommend = $stateParams.recommend || $location.search().recommend;

    vm.search = search;
    vm.clean = cleanFn;
    vm.pageChanged = search;

    ObjIsNull(paramster.get()) ? startParams = vm.profession = paramster.get() : '';
    search(startParams);
    //清空
    function cleanFn() {
        clean(vm.profession);
        vm.doClean = !vm.doClean;//
    }

    //搜索
    function search(startParams) {
        startParams ? params = startParams : params = vm.profession;
        params ? paramster.set(params) : '';
        requestData.ProfessionList(params).success(function (response) {
            response.total ? '' : $state.go('search.searchjob.nofound');
            vm.professionList = response.data;
            vm.totalItems = response.total;
            vm.totalItems ? '' : recommendProfession();
            function recommendProfession() {
                requestData.ProfessionList({recommend: 1, size: 3}).then(function (res) {
                    vm.professionList = res.data.data;
                })
            }
        });
    }
}
//公司搜索
angular.module('app')
    .controller('SearchCompanyController', SearchCompanyController);
SearchCompanyController.$inject = ['requestData', '$stateParams', 'clean', '$location', 'paramster', 'toNum'];
function SearchCompanyController(requestData, $stateParams, clean, $location, paramster, toNum) {
    var vm = this;
    var params;
    var startParams = {};
    vm.Url = $location.path();
    startParams.name = $stateParams.name;//找职位页的搜索字符
    vm.pageChanged = search;
    vm.clean = cleanFn;
    vm.search = search;
    //搜索URL参数or找职位传入的参数
    !startParams.name ? search(toNum(paramster.get())) : search(startParams);

    function cleanFn() {
        clean(vm.company);
        vm.doClean = !vm.doClean;//
    }

    function search(data) {
        data ? params = vm.company = data : params = vm.company;
        paramster.set(params);
        params.size = 9;
        requestData.companyList(params).then(function (res) {
                vm.items = res.data.data;
                vm.totalItems = res.data.total;
                vm.totalItems ? '' : recommendCompany();
                function recommendCompany() {
                    requestData.companyList({'returnPage': '', size: 3}).then(function (res) {
                        vm.reItems = res.data.data;
                    })
                }
            }
        )
    }
}
