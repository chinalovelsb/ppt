/**
 * Created by Master on 2017/1/5.
 */
var app = angular.module('app', ['ui.router', 'oc.lazyLoad','ngAnimate', 'ngSanitize', 'ui.bootstrap']);
app.config(function ($stateProvider, $urlRouterProvider) {
    /*
     $locationProvider.html5Mode(true);
     */

    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
                url: '/home',
                templateUrl: 'home.html',
                controller:'CarouselDemoCtrl',
            resolve:{
                    loadFile:['$ocLazyLoad',function($ocLazyLoad){
             return $ocLazyLoad.load(['../css/first.css','../js/controller/controller.js'])
            }]

            }

            }
        )
        .state('elite', {
            url: '/elite',
            templateUrl: 'elite.html',
            resolve: {
                loadFile: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('../css/elite.css')
                }]
            }
        })

        .state('job', {
            url: '/job',
            templateUrl: 'findjob.html',
            controller:'findProfession',
            controllerAs:'vm',
          /*  params:{'name':null},*/
            resolve: {
                loadFile:['$ocLazyLoad',function ($ocLazyLoad) {
                    return $ocLazyLoad.load('../css/findjob.css')

                }]
            }
        })

        .state('about', {
            url: '/about',
            templateUrl: 'about.html',
            resolve: {
                loadFile:['$ocLazyLoad',function ($ocLazyLoad) {
                    return $ocLazyLoad.load('../css/about.css')

                }]
            }
        })
        .state('list', {
            url: '/list',
            templateUrl: 'newjob.html',
            controller:'SearchJobController',
            controllerAs:'vm',
            params:{'recommend':null,'name':null},
            resolve: {
                loadFile:['$ocLazyLoad',function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['../css/findjob.css'])

                }]
            }
        })
        .state('company',{
            url:'/company',
            templateUrl:'company.html',
            controller:'CompanyDetail',
            params:{'id':null},
            resolve: {
                loadFile:['$ocLazyLoad',function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['../css/findjob.css','../js/controller/controller.js'])

                }]
            }

        })
        .state('company.companyJob',{
            url:'/companyJob',
            templateUrl:'companyJob.html',
            params:{'id':null},
            controller:'CompanyDetail',
            resolve: {
                loadFile:['$ocLazyLoad',function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['../css/findjob.css','../js/controller/controller.js'])

                }]
            }

        })
        .state('company.companyInfo',{
            url:'/companyInfo',
            templateUrl:'companyInfo.html',
            params:{'id':null},
            controller:'CompanyDetail',
            resolve: {
                loadFile:['$ocLazyLoad',function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['../css/findjob.css','../js/controller/controller.js'])

                }]
            }

        })
        .state('profession',{
            url:'/profession',
            params:{'id':null},
            templateUrl:'profession.html',
            controller:'ProfessionDetailCtrl',
            resolve: {
                loadFile:['$ocLazyLoad',function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['../css/findjob.css'])

                }]
            }
        })
         .state('search',{
            url:'/search',
            params:{'id':null},
            templateUrl:'search.html',
            controller:'SearchController',
             controllerAs:'vm',
            resolve: {
                loadFile:['$ocLazyLoad',function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['../css/search.css'])

                }]
            }
        })
         .state('search.searchcompany',{
            url:'/searchcompany',
            params:{'name':null},
            templateUrl:'searchcompany.html',
            controller:'SearchCompanyController',
            controllerAs:'vm',
            resolve: {
                loadFile:['$ocLazyLoad',function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['../css/search.css'])

                }]
            }
        })
         .state('search.searchjob',{
            url:'/searchjob',
            params:{'id':null,'recommend':null,'category':null,'subCategory':null},
            templateUrl:'searchjob.html',
            controller:'SearchJobController',
            controllerAs:'vm',
            resolve: {
                loadFile:['$ocLazyLoad',function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['../css/search.css'])

                }]
            }
        })


});
