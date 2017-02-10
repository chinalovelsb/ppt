/**
 * Created by Master on 2017/1/14.
 */
"use strict"
angular.module('app')
//导航轮播
    .directive('navCarousel', function (requestData) {
        return {
            restrict: 'E',
            templateUrl: 'tpls/navCarousel.html',
            scope: {},
            replace: 'true',
            link: function (scope, ele, attrs) {
                scope.Interval = attrs.interval;
                scope.noWrapSlides = false;
                scope.active = 0;
                scope.slides = [];
                requestData.articleList({type: 1}).success(function (res) {
                    scope.slides = res.data.articleList
                });
            }
        }
    })
    //推荐职位轮播
    .directive('professionCarousel', function (requestData) {
        return {
            restrict: 'E',
            templateUrl: 'tpls/professionCarousel.html',
            scope: {},
            replace: 'true',
            link: function (scope, ele, attrs) {
                scope.Interval = attrs.interval || 5000;//周期
                scope.params = attrs.params;
                scope.noWrapSlides = false;
                scope.active = 0;//第一张
                var num = 4;//每页显示条数
                var data = [];
                scope.slides = [];//轮播页列表
                requestData.ProfessionList(scope.params || {recommend: 0, size: 20})
                    .success(function (response) {
                            data = response.data;
                            for (var i = 0; i < data.length; i += num) {
                                scope.slides.push(data.slice(i, i + num))
                            }
                        }
                    );
            }
        }
    })
    //公司在招轮播
    .directive('companyCarousel', function (requestData) {
        return {
            restrict: 'E',
            templateUrl: 'tpls/companyCarousel.html',
            scope: {
                vertical: '='
            },
            replace: 'true',
            link: function (scope, ele, attrs) {
                scope.Interval = 3000;
                scope.noWrapSlides = false;
                scope.active = 0;
                scope.slides = [];
                requestData.companyList({returnPage: 1}).success(function (res) {
                    scope.slides = res.approvedCompanyList
                })

            }

        }
    })

    //找工作面板
    .directive('searchPanel', function ($timeout) {
        return {
            restrict: 'E',
            templateUrl: 'tpls/searchPanel.html',
            scope: {},
            replace: 'true',
            link: function (scope, ele, attrs) {
                scope.panel = [
                    {
                        'class': '产品类',
                        'data': [{
                            name: "产品", category: 1,
                            data: [{type: '', name: '不限', choose: true},
                                {type: 1, name: '助理', choose: false},
                                {type: 2, name: '初级', choose: false},
                                {type: 3, name: '中级', choose: false},
                                {type: 4, name: '高级', choose: false},
                                {type: 5, name: '总监', choose: false}]
                        },
                            {
                                name: "UI", category: 2,
                                data: [{type: '', name: '不限', choose: true},
                                    {type: 1, name: '初级', choose: false},
                                    {type: 2, name: '中级', choose: false},
                                    {type: 3, name: '高级', choose: false},
                                    {type: 4, name: '总监', choose: false}
                                ]
                            },
                            {
                                name: "QA", category: 3,
                                data: [{type: '', name: '不限', choose: true},
                                    {type: 1, name: '初级', choose: false},
                                    {type: 2, name: '中级', choose: false},
                                    {type: 3, name: '高级', choose: false}
                                ]
                            }]


                    }, {
                        'class': '技术类',
                        'data': [
                            {
                                name: "Android", category: 4,
                                data: [{type: '', name: '不限', choose: true},
                                    {type: 1, name: '初级', choose: false},
                                    {type: 2, name: '中级', choose: false},
                                    {type: 3, name: '高级', choose: false}
                                ]
                            },
                            {
                                name: "IOS", category: 5,
                                data: [{type: '', name: '不限', choose: true},
                                    {type: 1, name: '初级', choose: false},
                                    {type: 2, name: '中级', choose: false},
                                    {type: 3, name: '高级', choose: false}
                                ]
                            },
                            {
                                name: "WEB", category: 6,
                                data: [{type: '', name: '不限', choose: true},
                                    {type: 1, name: '初级', choose: false},
                                    {type: 2, name: '中级', choose: false},
                                    {type: 3, name: '高级', choose: false}
                                ]
                            },
                            {
                                name: "OP", category: 7,
                                data: [{type: '', name: '不限', choose: true},
                                    {type: 1, name: '初级', choose: false},
                                    {type: 2, name: '中级', choose: false},
                                    {type: 3, name: '高级', choose: false}
                                ]
                            },
                            {
                                name: "Java", category: 8,
                                data: [{type: '', name: '不限', choose: true},
                                    {type: 1, name: '初级', choose: false},
                                    {type: 2, name: '中级', choose: false},
                                    {type: 3, name: '高级', choose: false},
                                    {type: 4, name: '总监', choose: false}
                                ]
                            }


                        ]
                    }, {
                        'class': '大数据',
                        'data': [
                            {
                                name: "NLP", category: 9,
                                data: [{type: '', name: '不限', choose: true},
                                    {type: 1, name: '初级', choose: false},
                                    {type: 2, name: '中级', choose: false},
                                    {type: 3, name: '高级', choose: false}
                                ]
                            },
                            {
                                name: "DM", category: 10,
                                data: [{type: '', name: '不限', choose: true},
                                    {type: 1, name: '初级', choose: false},
                                    {type: 2, name: '中级', choose: false},
                                    {type: 3, name: '高级', choose: false}
                                ]
                            },
                            {
                                name: "DL", category: 11,
                                data: [{type: '', name: '不限', choose: true},
                                    {type: 1, name: '初级', choose: false},
                                    {type: 2, name: '中级', choose: false},
                                    {type: 3, name: '高级', choose: false}
                                ]
                            }
                        ]
                    }];
                //等待DOM加载
                $timeout(function () {
                    scope.test = function () {
                        $('.nav_job_item').hover(
                            function () {
                                $(this).children('.nav_detail').css('display', 'block')
                            },
                            function () {
                                $(this).children('.nav_detail').css('display', 'none')
                            }
                        )
                    }
                    scope.test();
                }, 0)

            }

        }
    })

    //筛选
    .directive('options', function (searchData, paramster, duplicateRemoval, $timeout, toNum) {
        return {
            restrict: 'E',
            templateUrl: 'tpls/options.html',
            scope: {
                doCleaner: '=?',//清空 值变化则执行清空
                optionsName: '@',//参数名
                selectValue: '=ngModel',//输出值
            },
            replace: 'true',
            link: function (scope, ele, attrs) {
                var arr = [];
                scope.doCleaner = false;
                scope.valueArr = [];
                scope.labelName = attrs.labelName;
                scope.checkBox = attrs.checkbox;
                scope.options = searchData[scope.optionsName];//调用参数
                scope.selectValue = +paramster.get(scope.optionsName) || null;//从URL取参数（单选）
                //多选URL取值
                scope.checkBox && paramster.get(scope.optionsName) ? scope.valueArr = arr = toNum(paramster.get(scope.optionsName).toString().split(',')) : scope.valueArr = [null];


                //是否进入多选模式
                scope.checkBox ? scope.choose = chooseBox : scope.choose = choose;
                //单选
                function choose(value) {
                    scope.selectValue = value
                }

                //多选
                function chooseBox(value) {
                    //选不限则清空，否则去重
                    value === null ? arr = [null] : arr = duplicateRemoval(value, arr);
                    //至少一个选项为不限
                    scope.valueArr.length ? scope.valueArr = arr : scope.valueArr = [null];

                    scope.selectValue = arr.join();//输出值
                }

                //监听清空命令
                scope.$watch('doCleaner', function (n, o) {
                    n !== o ? scope.valueArr = arr = [null] : ''
                })
            }
        }
    })
    //分页
    .directive('paging', function () {
        return {
            restrict: 'E',
            templateUrl: 'tpls/paging.html',
            scope: {
                totalItems: '=',
                currentPage: '=',
                pageChange: '&'
            },
            replace: 'true',
            link: function (scope, ele, attrs) {
                //页数按钮数量 每页显示条目
                scope.maxSize = attrs.maxSize;
                scope.itemsPerPage = attrs.itemsPerPage;
                scope.jump = attrs.jum;
                //当前页数变化执行
                scope.$watch('currentPage', function (n) {
                    n ? scope.pageChange() : ''
                });
                //跳页
                scope.setPage = function () {
                    scope.pageNo <= 0 ? scope.currentPage = scope.pageNo = 1 : '';
                    scope.pageNo > scope.numPages ? scope.currentPage = scope.pageNo = scope.numPages : scope.currentPage = scope.pageNo;
                }
            }
        }
    })
