/**
 * Created by Master on 2017/1/5.
 */
var app = angular.module('app', ['ui.router', 'oc.lazyLoad', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);
app.config(function ($stateProvider, $urlRouterProvider) {
    /*
     $locationProvider.html5Mode(true);
     */

    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
                url: '/home',
                templateUrl: 'home.html',
                controller: 'FirstController',
                resolve: {
                    loadFile: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['../css/first.css'])
                    }]

                }

            }
        )

        .state('elite', {
            url: '/elite',
            templateUrl: 'elite.html',
            controller: 'EliteController',
            controllerAs: 'vm',
            resolve: {
                loadFile: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('../css/elite.css')
                }]
            }
        })

        .state('job', {
            url: '/job',
            templateUrl: 'findjob.html',
            controller: 'FindProfessionController',
            controllerAs: 'vm',
            /*  params:{'name':null},*/
            resolve: {
                loadFile: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('../css/findjob.css')

                }]
            }
        })
        .state('elite.conpanyList', {
            url: '/companyList',
            params: {'name': null},
            templateUrl: 'searchcompany.html',
            controller: 'SearchCompanyController',
            controllerAs: 'vm',
            resolve: {
                loadFile: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['../css/search.css', '../css/elite.css'])

                }]
            }
        })


        .state('about', {
            url: '/about?tag',
            templateUrl: 'about.html',
            controller: 'AboutController',
            controllerAs: 'vm',
            resolve: {
                loadFile: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('../css/about.css')

                }]
            }
        })
        .state('job.companyDetail', {
            url: '/companyDetail',
            templateUrl: 'companyDetail.html',
            controller: 'CompanyDetailController',
            controllerAs: 'vm',
            params: {'id': null},
            resolve: {
                loadFile: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['../css/findjob.css'])

                }]
            }

        })
        .state('job.companyDetail.companyJob', {
            url: '/companyJob',
            templateUrl: 'companyJob.html',
            controllerAs: 'vm',
            params: {'id': null},
            controller: 'CompanyDetailController',
            resolve: {
                loadFile: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['../css/findjob.css'])

                }]
            }

        })

        .state('job.professionDetail', {
            url: '/professionDetail',
            params: {'id': null},
            templateUrl: 'professionDetail.html',
            controllerAs: 'vm',
            controller: 'ProfessionDetailCtrl',
            resolve: {
                loadFile: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['../css/findjob.css'])

                }]
            }
        })
        .state('job.search', {
            url: '/search?recommend=',
            params: {'id': null},
            templateUrl: 'search.html',
            controller: 'SearchController',
            controllerAs: 'vm',
            resolve: {
                loadFile: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['../css/search.css'])

                }]
            }
        })
        .state('job.search.searchcompany', {
            url: '/searchcompany',
            params: {'name': null},
            templateUrl: 'searchcompany.html',
            controller: 'SearchCompanyController',
            controllerAs: 'vm',
            resolve: {
                loadFile: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['../css/search.css'])
                }]
            }
        })
        .state('job.search.companyList', {
            url: '/companyList',
            params: {'name': null},
            templateUrl: 'searchcompany.html',
            controller: 'SearchCompanyController',
            controllerAs: 'vm',
            resolve: {
                loadFile: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['../css/search.css', '../css/elite.css'])

                }]
            }
        })
        .state('job.search.searchjob', {
            url: '/searchjob',
            params: {'id': null, 'recommend': null, 'category': null, 'subCategory': null},
            templateUrl: 'searchjob.html',
            controller: 'SearchJobController',
            controllerAs: 'vm',
            resolve: {
                loadFile: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['../css/search.css'])

                }]
            }
        })


})
    .run(function ($rootScope, $state, $stateParams, $window) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            $rootScope.currentState = $state;

        })


    })

