/**
 * Created by Master on 2016/12/26.
 */
var routerApp = angular.module("routerApp", ["ui.router", "oc.lazyLoad","meta.umeditor"]);
routerApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", '/login');
    $stateProvider

        .state('login', {
            url: "/login",
            templateUrl: "login.html",
            controller: "loginCtl"
        })

        .state('admin', {
            url: "/admin",
            templateUrl: "admin.html",
            controller: "listCtl",
            resolve: {
                loadJs: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controller/listCtl.js')
                }]
            }
        })

        .state('admin.list', {
            url: "/list",
            templateUrl: "list.html",
            controller: "listCtl"
        })

        .state('admin.add', {
            url: "/add",
            templateUrl: "add.html",
            controller: "addCtl",
            resolve: {
                loadFile: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'css/task10.css',
                        'js/controller/addCtl.js',
                        'css/umeditor.min.css',
                        'umeditor/umeditor.min.js',
                        'umeditor/umeditor.config.js',
                    ])
                }]
            }

        })
        .state('admin.user', {
            url: "/user",
            templateUrl: "user.html",
            controller: "userCtl",
            resolve: {
                loadFile: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['js/controller/userCtl.js'])
                }]
            }
        })
})
    .run(function ($rootScope, $templateCache) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (typeof(current) !== 'undefined') {
                $templateCache.remove(current.templateUrl);
            }
        });
    });
