/**
 * Created by Master on 2016/12/26.
 */
angular.module('routerApp')
    .factory('Common', [
    '$http', function ($http) {
        return {
            loadScript: function (url, callback) {
                var head = document.getElementsByTagName("head")[0];
                var script = document.createElement("script");
                script.setAttribute("type", "text/javascript");
                script.setAttribute("src", url);
                script.setAttribute("async", true);
                script.setAttribute("defer", true);
                head.appendChild(script);
                if (document.all) {
                    //IE
                    script.onreadystatechange = function () {
                        var state = this.readyState;
                        if (state === 'loaded' || state === 'complete') {
                            callback && callback();
                        }
                    }
                }
                else {
                    //firefox, chrome
                    script.onload = function () {
                        callback && callback();
                    }
                }
            },
            loadCss: function (url) {
                var ele = document.createElement('link');
                ele.href = url;
                ele.rel = 'stylesheet';
                if (ele.onload == null) {
                    ele.onload = function () {
                    };
                }
                else {
                    ele.onreadystatechange = function () {
                    };
                }
                angular.element(document.querySelector('body')).prepend(ele);
            }
        }
    }
]);
angular.module('routerApp')
    .directive('ueditor', [
    'Common',
    '$rootScope',
    function (Common, $rootScope) {
        return {
            restrict: 'EA',
            require: 'ngModel',
            link: function (scope, ele, attrs, ctrl) {
                $rootScope.$emit('loading', '初始化编辑器...');//广播loading事件，可以删除
                var _self = this,
                    _initContent,
                    editor,
                    editorReady = false,
                    base = '../task5/UEditor', //ueditor目录
                    _id = attrs.ueditor;
                var editorHandler = {

                    init: function () {
                        window.UEDITOR_HOME_URL = base + '/';
                        var _self = this;
                        if (typeof UE != 'undefined') {
                            editor = UE.getEditor(_id, {
                                toolbars: [
                                    [
                                        'fontsize', '|',
                                        'blockquote', 'horizontal', '|',
                                        'removeformat', '|',
                                        'insertimage', '|',
                                        'bold', 'italic', 'underline', 'forecolor', 'backcolor', '|',
                                        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify',
                                        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                                        'insertorderedlist', 'insertunorderedlist', '|',
                                        'link', 'unlink', '|',
                                        'emotion'
                                    ]
                                ]
                            });
                            editor.ready(function () {
                                editor.setHeight(180);
                                editorReady = true;
                                $rootScope.$emit('loading', '');//编辑器初始化完成
                                editor.addListener('contentChange', function () {//双向绑定
                                    if (!scope.$$phase) {
                                        scope.$apply(function () {
                                            ctrl.$setViewValue(editor.getContent());
                                        });
                                    }
                                })
                                editor.addListener("blur", function () {
                                    $rootScope.check();
                                })
                                ;
                            });
                        }
                        else {
                            Common.loadScript(base + '/ueditor.config.js', null);
                            Common.loadScript(base + '/ueditor.all.min.js', function () {
                                _self.init();
                            });
                        }
                    },


                    setContent: function (content) {
                        if (editor && editorReady) {
                            editor.setContent(content);
                        }
                    }
                };
                ctrl.$render = function () {
                    _initContent = ctrl.$isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue;
                    editorHandler.setContent(_initContent);//双向绑定
                };
                editorHandler.init();
                //事件
                $rootScope.$on('$routeChangeStart', function () {
                    editor && editor.destroy();
                });
            }
        }
    }
]);