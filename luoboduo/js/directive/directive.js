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
                            //数据条目不为4的倍数时,截取数组开头n个数据进行补全
                            if (data.length % 4) {
                                angular.forEach(data.slice(0, 4 - (data.length % 4)), function (item) {
                                    data.push(item)
                                })
                            }
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
    .directive('partnerCarousel', function ($timeout, $interval) {
        return {
            restrict: 'E',
            templateUrl: 'tpls/partnerCarousel.html',
            scope: {},
            replace: 'true',
            link: function (scope) {
                scope.jsonData = [
                    {
                        'logo': '../images/xd.png',
                        'name': '北京咸蛋科技',
                        'contant': '萝卜多在技术人员的推荐成功率出奇的高，绝对值得一试！'
                    }, {
                        'logo': '../images/ms.png',
                        'name': '北京美数信息科技',
                        'contant': '萝卜多的推荐非常精准，可以很好领会用人单位对技术人员的需求，并且能够快速给到候选人。是非常好的招聘合作伙伴。'

                    }, {
                        'logo': '../images/bt.png',
                        'name': '北京贝兔科技',
                        'contant': '跟萝卜王（葡萄藤CEO李亚冲）认识很久了，对他的能力和思想都非常的认同，今年开始自己创业，也从这里请了几个萝卜共事，结果是非常满意的。支持葡萄藤，推荐萝卜多。'

                    }, {
                        'logo': '../images/kh.png',
                        'name': '中国康辉旅游社集团',
                        'contant': '“萝卜多”对应聘者和招聘公司的需求了解的非常清晰，不像平台类产品的以量取胜，而是量身定做的以质取胜。通过“萝卜多”内推的员工已成为能够独当一面的核心骨干。'

                    }, {
                        'logo': '../images/tx.png',
                        'name': '北京天晓启航',
                        'contant': '萝卜多推荐的人才质量比较高，很务实，很给力！'

                    }, {
                        'logo': '../images/tes.png',
                        'name': '北京拓尔思信息科技',
                        'contant': '萝卜多推荐的同学有一个共性就是高度的工作责任感与吃苦耐劳的结合，同时技术过硬，工作扎实、认真。来我司服务的两名同事入职以来，表现优异，都在工作中起到了关键作用。萝卜多，为你点个赞。'
                    }]
                $timeout(function () {
                    var carousels = $('#partner').carousel();
                    carousels.each(function () {
                        var $obj = $(this);
                        var $inner = $obj.find('.carousel-inner');

                        var id = 'uuid' + new Date().getTime();
                        $obj.addClass(id);

                        if ($obj.data('shift') === 1) {
                            var items = $obj.find('.item > [class*="col-"]'),
                                visibleCnt = $obj.find('.item:first [class*="col-"]').length,
                                wrapper = "";

                            // build styles
                            var rule_base = '.carousel.' + id + ' .carousel-inner > .item',
                                styles = $('<style></style>'),
                                rules = [];
                            rules[0] = rule_base + '.next {left: ' + (100 / visibleCnt) + '%; transform: none;}';
                            rules[1] = rule_base + '.active {left: 0;}';
                            rules[2] = rule_base + '.active.left {left: -' + (100 / visibleCnt) + '%; transform: none;}';
                            rules[3] = rule_base + '.next.left {left: 0;}';
                            rules[4] = rule_base + '.active.right {left: ' + (100 / visibleCnt) + '%; transform: none;}';
                            rules[5] = rule_base + '.prev.right {left: 0;}';
                            rules[6] = rule_base + '.prev {left: -' + (100 / visibleCnt) + '%; transform: none;}';
                            for (var i = 0; i < rules.length; i++) {
                                styles.append(rules[i]);
                            }
                            $obj.prepend(styles);

                            // rebuild items
                            for (var i = 0; i < $(items).length; i++) {
                                var $item = $(items[i]);
                                var parent = $item.parent();
                                if (parent.hasClass('item')) {
                                    if (!wrapper.length) {
                                        wrapper = parent.clone().removeClass('active').html('');
                                    }
                                    $item.unwrap();
                                }

                                var itemGroup = [$item];
                                for (var x = 1; x < visibleCnt; x++) {
                                    var a = i + x;
                                    var next = $(items[a]);
                                    if (!next.length) {
                                        next = $(items[(a - $(items).length)]);
                                    }
                                    itemGroup[x] = next.clone();
                                }
                                var newSet = wrapper.clone().html(itemGroup);
                                if (i == 0) {
                                    newSet.addClass('active');
                                }
                                newSet.appendTo($inner);
                            }
                        }
                    });
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
