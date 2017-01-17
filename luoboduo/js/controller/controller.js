/**
 * Created by Master on 2017/1/6.
 */

angular.module('app').controller('ProfessionDetailCtrl', ['$scope', '$stateParams', '$location', 'getProfession', '$http', '$filter', function ($scope, $stateParams, $location, getProfession, $http, $filter) {

    var id = $stateParams.id || $location.search().id;

    $location.search({'id': id});
    getProfession.ProfessionDetail(id).then(function (res) {
        $scope.profession = res
        $scope.city = $filter('city')(res)
    })
       /* .success(function (rec) {
                $scope.profession = rec.data;
                $scope.city = $filter('city')($scope.profession)
            }
        )*/
}]);
//首页
angular.module('app').controller('CarouselDemoCtrl', function ($scope, $http, $filter, getProfession, $stateParams) {
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;
    var data = [];
    var arr = [];


    getProfession.ProfessionList({recommend: 0, size: 20})
        .success(function (response) {
            data = response.data;
            for (var i = 0; i < data.length; i += 4) {
                arr.push(data.slice(i, i + 4))
            }
            for (var i = 0; i < arr.length; i++) {
                $scope.addSlide(i);
            }
        });
    $scope.addSlide = function (i) {
        slides.push({
            list: arr[i],
            id: currIndex++
        });
    };

    //首页banner
    $http.get('/lbd/a/article/search?type=0')
        .success(function (response) {
            //noinspection JSUnresolvedVariable
            $scope.bannerUrl = response.data.articleList[0].img
        });

    (function () {


        var params = {};
        params.recommend = $stateParams.recommend;
        getProfession.ProfessionList(params)
            .success(
                function (response) {
                    $scope.jobList = response.data
                }
            )

    })()

});
//找职位页在招职位轮播

angular.module('app').controller('jobListCarousel', ['$scope', '$http', '$filter', 'getProfession', function ($scope, $http, $filter, getProfession) {
    $scope.jobInterval = 3000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    getProfession.companyList({returnPage: 1})
        .success(function (res) {
            var jobList = $scope.jobList = [],
                list = res.approvedCompanyList;
            for (var i = 0; i < 4; i++) {
                jobList.push({
                    slide: list[i],
                    id: i
                })

            }
        });

}]);
//找职位页
angular.module('app').controller('findProfession', ['$scope', '$http', '$filter', 'getProfession','jobPanel', function ($scope, $http, $filter, getProfession,jobPanel) {
    var vm = this;
        vm.panel=jobPanel;
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var industry;
    $scope.thisCard = true;
    $scope.professionList = [];



    // 搜索页banner轮播

    getProfession.articleList({type: 1})
        .success(function (res) {
            var slides = $scope.slides = [],
                list = res.data.articleList;
            for (var i = 0; i < 3; i++) {
                slides.push({
                    slide: list[i],
                    id: i

                })

            }
        });

    //切换标签
    $scope.checked = function (a) {
        a ? $scope.thisCard = false : $scope.thisCard = true;
        $scope.changeCard(0);
    };

    //获取推荐职位、最新职位
    $scope.changeCard = function (type) {
        getProfession.ProfessionList({'recommend': type, 'size': 8}).success(function (res) {
            $scope.professionList.push(res.data);
            vm.test()
        })
    };
    $scope.changeCard(1);


    //公司列表
    getProfession.companyList({returnPage: 1}).success(function (res) {
        $scope.companyList = res.approvedCompanyList;
        $scope.imgUrl = res.industryImg.industryImg;
    })

    vm.test=function () {
        $('.nav_job_item').hover(
            function(){$(this).children('.nav_detail').css('display','block')},
            function(){$(this).children('.nav_detail').css('display','none')}
        )


    }
    vm.test();

    //banner大图
    getProfession.companyList({approved: 1, size: 1})
        .success(function (res) {
            $scope.companyNEW = res.data[0];
            $scope.companyNewCity = $filter('city')(res.data[0]);
            industry = res.data[0].industryList[0];
        })


}])

//公司详情
angular.module('app').controller('CompanyDetail', ['$scope', '$http', '$filter', 'getProfession', '$stateParams', '$location', function ($scope, $http, $filter, getProfession, $stateParams, $location) {
    var id = '';

    id = $stateParams.id || $location.search().id;
    $location.search('id', id);
    getProfession.companyDetail(id)
        .success(function (res) {
            $scope.company = res.data.company;
            $scope.industryList = $filter('industry')(res.data.industryList);
            $scope.tag = res.data.tagList;
            $scope.city = $filter('city')($scope.company)
        });
    //在招职位
    var paramas = {};
    paramas.companyId = id;
    getProfession.ProfessionList(paramas)
        .success(function (res) {
            $scope.total = res.total;
            $scope.professionList = res.data;
        })

}]);
//搜索页标签
angular.module('app')
    .controller('SearchController',SearchController);
    SearchCompanyController.$inject=['$location']
    function SearchController($location) {

        var vm = this,
            site=$location.$$path
            $location.$$path==="/search/searchcompany"?vm.chosen='cpy':vm.chosen='job';
        vm.choose=change;
        function change(type) {
            vm.chosen=type;
        }
    }
//找职位
angular.module('app')
    .controller('SearchJobController', SearchJobController);
SearchJobController.$inject = [
    '$scope',
    '$http',
    '$filter',
    'getProfession',
    '$stateParams',
    '$location',
    'local',
    'trade',
    'education',
    'experience',
    'Salary',
    'time',
    'searchPanel'
];

function SearchJobController(
    $scope,
    $http,
    $filter,
    getProfession,
    $stateParams,
    $location,
    local,
    trade,
    education,
    experience,
    Salary,
    time,
    searchPanel
) {
    var vm = this;
     vm.params=$stateParams;
     vm.params.returnTags = 1;
     vm.params.recommend = $stateParams.recommend || $location.search().recommend;
     vm.chosen={'city':0,'industry':0,'education':0,'experience':0,'compensation':0,'pubdate':0};
    $scope.local = local;
    $scope.trade = trade;
    $scope.education = education;
    $scope.experience = experience;
    $scope.Salary = Salary;
    $scope.time = time;
    vm.search=getJobData;
    vm.choose=choice;
    vm.clean=clear;
    vm.pagechanged=paging;
    vm.search(vm.params);
    function getJobData(params) {
        params.name=vm.keyword;
        params.page=vm.currentPage;
        if (params) {
            $location.search(params);
            getProfession.ProfessionList(params)
                .success(
                    function (response) {
                        $scope.jobList = response.data;
                        vm.totalItems = response.total;
                    }
                )
        }
    }
    function choice(idx,type) {
        searchPanel.profession(idx,type,vm)
    }
    function clear() {
        vm.chosen={'city':0,'industry':0,'education':0,'experience':0,'compensation':0,'pubdate':0
        };
    }
   function paging() {
        vm.search(vm.params)
    };






}
//公司搜索
angular.module('app')
    .controller('SearchCompanyController', SearchCompanyController);
SearchCompanyController.$inject = [
    '$scope',
    '$location',
    '$http',
    '$filter',
    'getProfession',
    '$stateParams',
    'trade',
    'local',
    'financingtype',
    'searchPanel'
];
function SearchCompanyController(
    $scope,
    $location,
    $http,
    $filter,
    getProfession,
    $stateParams,
    trade,
    local,
    financingtype,
    searchPanel
                                 ) {
    var vm = this;
       vm.params={'size':9};
        vm.params.name =  $stateParams.name || vm.keyword;
    vm.keyword = $stateParams.name;
    $scope.local = local;
    $scope.trade = trade;
    $scope.financingtype = financingtype;


    vm.pagechanged=paging;
    vm.choose = choice;
    vm.clean = clear;
    vm.search=getCompanyData;
    vm.search(vm.params);
    vm.clean()
    function choice(idx, type) {
        searchPanel.company(idx,type,vm)
    }

    function clear() {
        vm.chosen = {'city':0,'industry':0,'financingtype':0}
    }
    function getCompanyData(params) {
        params.name=vm.keyword;
/*
        $location.search({'params':params});
*/
        getProfession.companyList(params).then(
            function (res) {
                vm.items = res.data.data
                vm.totalItems=res.data.total;
            }
        )
    }
    function paging() {
        vm.search(vm.params)
    };


}
