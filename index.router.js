// { "framework": "Vue"} 

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _util = __webpack_require__(19);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 框架核心方法
 */
var modal = weex.requireModule('modal');
var animation = weex.requireModule('animation');
var navigator = weex.requireModule('navigator');
var navigatorEx = weex.requireModule("NavigatorExModule");
var stream = weex.requireModule('stream');
var meta = weex.requireModule('meta');
var app = weex.requireModule("AppModule"); //仅支持在Link中使用

var buiweex = {
    /**
     * 吐司信息
     * @param msg {string} 提示文本
     */
    toast: function toast(msg) {
        if (typeof msg !== 'string') {
            msg = JSON.stringify(msg);
        }
        modal.toast({
            message: msg || "",
            duration: 1
        });
    },


    /**
     * 弹出警告
     * @param msg {string} 提示文本
     * @param callback {function} 点击确定后回调函数
     * @param option {object} 参数
     * @param option.okTitle {string} 确定按钮文本
     */
    alert: function alert(msg, callback, option) {
        var okTitle = "确定";
        if (option) {
            if (option.okTitle) okTitle = option.okTitle;
        }
        if (typeof msg !== 'string') {
            msg = JSON.stringify(msg);
        }
        modal.alert({
            message: msg || "",
            duration: 1,
            okTitle: okTitle
        }, function (value) {
            callback && callback(value);
        });
    },


    /**
     * 弹出确认框
     * @param msg {string} 提示文本
     * @param callback {function} 点击确定/取消后回调函数
     * @param option {object} 参数
     * @param option.okTitle {string} 确定按钮文本
     * @param option.cancelTitle {string} 取消按钮文本
     */
    confirm: function confirm(msg, callback, option) {
        var okTitle = "确定",
            cancelTitle = "取消";
        if (option) {
            if (option.okTitle) okTitle = option.okTitle;
            if (option.cancelTitle) cancelTitle = option.cancelTitle;
        }
        modal.confirm({
            message: msg || "",
            duration: 0.4,
            okTitle: okTitle,
            cancelTitle: cancelTitle
        }, function (value) {
            callback && callback(value);
        });
    },


    /**
     * 显示一个组件（可设置动画）
     * @param params
     * @param callback
     */
    show: function show(params, callback) {
        var el = params.id;
        if (!el) {
            return;
        }
        var duration = params.duration;
        var transform = params.transform || 'translate(0, 0)';
        var transformOrigin = params.transformOrigin || 'center center';
        var timingFunction = params.timingFunction || 'ease';

        animation.transition(el, {
            styles: {
                opacity: '1',
                transform: transform,
                transformOrigin: transformOrigin
            },
            duration: duration || 0,
            timingFunction: timingFunction,
            delay: 0
        }, function () {
            callback && callback();
        });
    },


    /**
     * 隐藏一个组件(可设置动画)
     * @param params
     * @param callback
     */
    hide: function hide(params, callback) {
        var el = params.id;
        if (!el) {
            return;
        }
        var duration = params.duration;
        var transform = params.transform || 'translate(0, 0)';
        var transformOrigin = params.transformOrigin || 'center center';
        var timingFunction = params.timingFunction || 'ease';
        animation.transition(el, {
            styles: {
                opacity: '0',
                transform: transform,
                transformOrigin: transformOrigin
            },
            duration: duration || 0,
            timingFunction: timingFunction,
            delay: 0
        }, function () {
            callback && callback();
        });
    },


    /**
     * 获取当前上下文路径
     * @return {string} 当前上下文路径
     */
    getContextPath: function getContextPath() {
        var url = weex.config.bundleUrl;
        if (url.indexOf('?') > 0) {
            url = url.substring(0, url.indexOf('?'));
        }
        url = url.split('/').slice(0, -1).join('/');
        return url;
    },


    /**
     * 加载一个新的页面(bundleJS)
     * @method push
     * @param url {string} bundle js 地址
     * @param params {object} 传递的参数
     */
    push: function push(url, params, callback) {
        var paramsStr = "";
        var _this = buiweex;
        if (params) {
            for (var key in params) {
                paramsStr += key + "=" + encodeURIComponent(params[key]) + "&";
            }
        }
        if (url.indexOf('?') < 0 && paramsStr != "") {
            url += "?";
        }
        url += paramsStr;
        //link平台中使用navigatorEx,playground中使用navigator
        try {
            if (url.indexOf('http') == 0 || url.indexOf('file') == 0) navigatorEx.push(url);else {
                url = _this.getContextPath() + '/' + url;
                navigatorEx.push(url);
            }
        } catch (ex) {
            if (url.indexOf('http') == 0 || url.indexOf('file') == 0) {
                navigator.push({
                    url: url,
                    animated: 'true'
                }, callback);
            } else {
                url = _this.getContextPath() + '/' + url;
                navigator.push({
                    url: url,
                    animated: 'true'
                }, callback);
            }
        }
    },


    /**
     * 返回上个页面
     * @method pop
     * @param options {object} 配置参数
     * @param options.animated {bool} 是否需要过渡动画，默认true
     * @param options.level {int} 返回层级，默认1
     * @param callback {function} 回调函数
     */
    pop: function pop(callback, options) {
        options = options || {};
        navigator.pop({
            animated: options.animated || 'true',
            level: options.level || 1
        }, callback);
    },


    /**
     * 退出当前轻应用
     * @param options {object} 配置参数
     */
    close: function close(options) {
        options = options || {};
        try {
            navigatorEx.close();
        } catch (ex) {
            navigator.close({
                animated: options.animated || "true"
            });
        }
    },


    /**
     * 获取页面参数(bundleJS),从url查询参数中获取
     * @method getPageParams
     * @return {object} 返回json数据
     */
    getPageParams: function getPageParams() {
        var params = {};
        var url = weex.config.bundleUrl;
        var index = url.indexOf("?");
        if (index > 0) {
            var query = url.substring(index + 1);
            var temp = query.split('&');
            var key = void 0,
                value = void 0;
            for (var p in temp) {
                if (temp[p]) {
                    key = temp[p].split('=')[0];
                    value = temp[p].split('=')[1];
                    params[key] = decodeURIComponent(value);
                }
            }
        }
        return params;
    },


    /**
     * 发送POST请求
     * @method post
     * @param params {object} 请求参数
     * @param params.url {string} 请求的URL
     * @param params.headers {object} 请求头, Content-Type默认值是 application/x-www-form-urlencoded
     * @param params.type {string} 响应类型, json(默认),text
     * @param params.data {object} 请求数据，带到 HTTP body中
     * @param params.timeout {int} 超时时间 默认30s
     * @return {Promise.<TResult>} 成功: resolve(data, status, statusText), 失败: reject(status, statusText)
     */
    post: function post(params) {
        var url = params.url || "";
        var headers = params.headers || {};
        var data = params.data;
        var type = params.type || "json";
        if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) == "object") {
            data = JSON.stringify(data);
        }
        // headers["Content-Type"]="application/x-www-form-urlencoded";
        // headers["Content-Type"]="application/json";
        return new Promise(function (resolve, reject) {
            stream.fetch({
                method: "POST",
                type: type,
                url: url,
                headers: headers,
                body: data,
                timeout: params.timeout || 30000
            }, function (res) {
                if (res.status >= 200 && res.status <= 299) {
                    resolve(res.data, res.status, res.statusText, res);
                } else {
                    reject(res.status, res.statusText);
                }
            });
        });
    },


    /**
     * 发送GET请求
     * @method get
     * @param params {object} 请求参数
     * @param params.url {string} 请求的URL
     * @param params.headers {object} 请求头
     * @param params.type {string} 响应类型, json(默认),text
     * @param params.data {object} 请求数据，自动拼接到url后面
     * @param params.timeout {int} 超时时间 默认30s
     * @return {Promise.<TResult>} 成功: resolve(data, status, statusText), 失败: reject(status, statusText)
     */
    get: function get(params) {
        return new Promise(function (resolve, reject) {
            var url = params.url || "";
            var headers = params.headers || {};
            var data = params.data || {};
            var type = params.type || "json";
            if (url.indexOf("?") < 0) {
                url += "?";
            }
            if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) == "object") {
                var dLength = Object.keys(data).length;
                for (var i = 0; i < dLength; i++) {
                    var key = Object.keys(data)[i];
                    var value = encodeURIComponent(data[key]);
                    url += key + '=' + value;
                    if (i != dLength - 1) {
                        url += "&";
                    }
                }
            }
            stream.fetch({
                method: "GET",
                type: type,
                url: url,
                headers: headers,
                timeout: params.timeout || 30000
            }, function (res) {
                if (res.status >= 200 && res.status <= 299) {
                    resolve(res.data, res.status, res.statusText, res);
                } else {
                    reject(res.status, res.statusText);
                }
            });
        });
    },


    /**
     * 适配viewport,主要处理ipad下的viewport
     * @method fixViewport
     */
    fixViewport: function fixViewport() {
        var width = 750;
        if (_util2.default.isIPad()) {
            width = 1536;
        }
        meta.setViewport({
            width: width
        });
    },


    /**
     * 显示加载中进度条
     * @method showLoading
     * @param {object} params 参数
     * @param {string} params.title 显示文本
     */
    showLoading: function showLoading(params) {
        var options = { title: "加载中..." };
        if (typeof params == "string") {
            options.title = params;
        }
        if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) == "object") {
            options = Object.assign(options, params);
        }
        try {
            app.showLoading(options);
        } catch (e) {}
    },


    /**
     * 隐藏加载中进度条
     * @method hideLoading
     */
    hideLoading: function hideLoading() {
        try {
            app.hideLoading();
        } catch (e) {}
    },


    /**
     * 显示操作成功
     * @method showSuccess
     * @param {object} params 参数
     * @param {string} params.title 显示文本
     */
    showSuccess: function showSuccess(params) {
        var options = { title: "操作成功" };
        if (typeof params == "string") {
            options.title = params;
        }
        if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) == "object") {
            options = Object.assign(options, params);
        }
        try {
            app.showSuccess(options);
        } catch (e) {}
    },


    /**
     * 显示操作失败
     * @method showError
     * @param {object} params 参数
     * @param {string} params.title 显示文本
     */
    showError: function showError(params) {
        var options = { title: "操作失败" };
        if (typeof params == "string") {
            options.title = params;
        }
        if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) == "object") {
            options = Object.assign(options, params);
        }
        try {
            app.showError(options);
        } catch (e) {}
    },
    install: function install(Vue, options) {
        var that = buiweex;
        Vue.mixin({
            components: {
                'bui-header': that.buiHeader,
                'bui-icon': that.buiIcon,
                'bui-button': that.buiButton,
                'bui-image': that.buiImage,
                'bui-actionsheet': that.buiActionSheet,
                'bui-checkbox': that.buiCheckbox,
                'bui-checkbox-list': that.buiCheckboxList,
                'bui-dialog': that.buiDialog,
                'bui-dropdown': that.buiDropdown,
                'bui-lazy-render': that.buiLazyRender,
                'bui-load': that.buiLoad,
                'bui-mask': that.buiMask,
                'bui-panel': that.buiPanel,
                'bui-radio': that.buiRadio,
                'bui-radio-list': that.buiRadioList,
                'bui-searchbar-center': that.buiSearchbarCenter,
                'bui-searchbar-left': that.buiSearchbarLeft,
                'bui-switch': that.buiSwitch,
                'bui-tabbar': that.buiTabbar,
                'bui-tip': that.buiTip,
                'bui-video': that.buiVideo,
                'bui-content': that.buiContent,
                'bui-content-scroll': that.buiContentScroll,
                'bui-image-slider': that.buiImageSlider,
                'bui-cell': that.buiCell,
                'bui-popup': that.buiPopup,
                'bui-number-input': that.buiNumberInput,
                'bui-richcell': that.buiRichcell,
                'bui-popupshow': that.buiPopupShow,
                'bui-grid-select': that.buiGridSelect,
                'bui-flow': that.buiFlow,
                'bui-swipe-cell': that.buiSwipeCell,
                'icon': that.icon,
                'bui-tabbar-scroller': that.buiTabbarScroller,
                'bui-timeline': that.buiTimeline,
                'bui-timeline-item': that.buiTimelineItem,
                'bui-tag': that.buiTag,
                'bui-option-list': that.buiOptionList,
                'bui-dropload': that.buiDropload,
                'bui-popover': that.buiPopover,
                'bui-poptip': that.buiPoptip
            }
        });

        Vue.prototype.$alert = that.alert;

        Vue.prototype.$toast = that.toast;

        Vue.prototype.$confirm = that.confirm;

        Vue.prototype.$show = that.show;

        Vue.prototype.$hide = that.hide;

        Vue.prototype.$getContextPath = that.getContextPath;

        Vue.prototype.$push = that.push;

        Vue.prototype.$pop = that.pop;

        Vue.prototype.$close = that.close;

        Vue.prototype.$getPageParams = that.getPageParams;

        Vue.prototype.$post = that.post;

        Vue.prototype.$get = that.get;

        Vue.prototype.$formatDate = _util2.default.formatDate;

        Vue.prototype.$isIPad = _util2.default.isIPad;

        Vue.prototype.$isIPhoneX = _util2.default.isIPhoneX;

        Vue.prototype.$isIPhone = _util2.default.isIPhone;

        Vue.prototype.$isAndroid = _util2.default.isAndroid;

        Vue.prototype.$fixStyle = _util2.default.fixStyle;

        Vue.prototype.$showLoading = that.showLoading;

        Vue.prototype.$hideLoading = that.hideLoading;

        Vue.prototype.$showSuccess = that.showSuccess;

        Vue.prototype.$showError = that.showError;

        Vue.prototype.$fixViewport = that.fixViewport;
    }
};

module.exports = buiweex;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _indexrouter = __webpack_require__(2);

var _indexrouter2 = _interopRequireDefault(_indexrouter);

var _router = __webpack_require__(7);

var _router2 = _interopRequireDefault(_router);

var _buiweex = __webpack_require__(0);

var _buiweex2 = _interopRequireDefault(_buiweex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.use(_buiweex2.default); // 入口*.vue文件，对象命名为"App"，在编译文件"webpack.common.conf.js"里引用


new Vue(Vue.util.extend({ el: '#root', router: _router2.default }, _indexrouter2.default));
_router2.default.push('/');

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(3)
)
__vue_styles__.push(__webpack_require__(4)
)

/* script */
__vue_exports__ = __webpack_require__(5)

/* template */
var __vue_template__ = __webpack_require__(6)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/molock/Movies/Midea/project/midea_Iot_github开源项目/weex-demo-template/src/widgets/T0x13/views/indexrouter.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-90f65e80"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {
  "flex-row": {
    "flexDirection": "row"
  },
  "flex-fluid": {
    "flexWrap": "wrap"
  },
  "center": {
    "justifyContent": "center",
    "alignItems": "center"
  },
  "column-center-top": {
    "alignItems": "center"
  },
  "column-center-bottom": {
    "justifyContent": "flex-end",
    "alignItems": "center"
  },
  "column-center-left": {
    "justifyContent": "center",
    "alignItems": "flex-start"
  },
  "column-center-right": {
    "justifyContent": "center",
    "alignItems": "flex-end"
  },
  "column-left-top": {
    "alignItems": "flex-start"
  },
  "column-right-top": {
    "alignItems": "flex-end"
  },
  "column-left-bottom": {
    "justifyContent": "flex-end",
    "alignItems": "flex-start"
  },
  "column-right-bottom": {
    "justifyContent": "flex-end",
    "alignItems": "flex-end"
  },
  "row-space-between": {
    "justifyContent": "space-between",
    "alignItems": "center"
  },
  "row-center-top": {
    "justifyContent": "center",
    "alignItems": "flex-start"
  },
  "row-center-bottom": {
    "justifyContent": "center",
    "alignItems": "flex-end"
  },
  "row-center-left": {
    "alignItems": "center"
  },
  "row-center-right": {
    "justifyContent": "flex-end",
    "alignItems": "center"
  },
  "row-left-top": {
    "alignItems": "flex-start"
  },
  "row-right-top": {
    "justifyContent": "flex-end",
    "alignItems": "flex-start"
  },
  "row-left-bottom": {
    "alignItems": "flex-end"
  },
  "row-right-bottom": {
    "justifyContent": "flex-end",
    "alignItems": "flex-end"
  },
  "span1": {
    "flex": 1
  },
  "span2": {
    "flex": 2
  },
  "span3": {
    "flex": 3
  },
  "span4": {
    "flex": 4
  },
  "span5": {
    "flex": 5
  },
  "span6": {
    "flex": 6
  },
  "span7": {
    "flex": 7
  },
  "span8": {
    "flex": 8
  },
  "span9": {
    "flex": 9
  },
  "span10": {
    "flex": 10
  },
  "span11": {
    "flex": 11
  },
  "span12": {
    "flex": 12
  },
  "flex1": {
    "flex": 1
  },
  "flex2": {
    "flex": 2
  },
  "flex3": {
    "flex": 3
  },
  "flex4": {
    "flex": 4
  },
  "flex5": {
    "flex": 5
  },
  "flex6": {
    "flex": 6
  },
  "flex7": {
    "flex": 7
  },
  "flex8": {
    "flex": 8
  },
  "flex9": {
    "flex": 9
  },
  "flex10": {
    "flex": 10
  },
  "flex11": {
    "flex": 11
  },
  "flex12": {
    "flex": 12
  },
  "p-a": {
    "position": "absolute"
  },
  "badges": {
    "backgroundColor": "#ff4e24",
    "width": "50",
    "height": "40",
    "borderRadius": "30",
    "textAlign": "center",
    "color": "#ffffff",
    "paddingTop": "7",
    "fontSize": "24"
  },
  "large-badges": {
    "backgroundColor": "#ff4e24",
    "width": "70",
    "height": "40",
    "borderRadius": "30",
    "textAlign": "center",
    "color": "#ffffff",
    "paddingTop": "7"
  },
  "bui-form-label": {
    "width": "200",
    "fontSize": "35",
    "color": "#999999",
    "lines": 1,
    "textOverflow": "ellipsis"
  },
  "bui-form-input": {
    "flex": 1,
    "fontSize": "35",
    "height": "80"
  },
  "bui-form-switch": {
    "right": "0",
    "backgroundColor": "#FF0000"
  },
  "bui-list": {
    "flex": 1
  },
  "bui-cell": {
    "flexDirection": "row",
    "alignItems": "center",
    "height": "100",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d7dde4",
    "borderBottomStyle": "solid",
    "backgroundColor:active": "#f5f5f5"
  },
  "bui-cell-large": {
    "flexDirection": "row",
    "height": "120",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d7dde4",
    "borderBottomStyle": "solid",
    "backgroundColor:active": "#f5f5f5"
  },
  "bui-cell-swipe-menu": {
    "flexDirection": "row",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d7dde4",
    "borderBottomStyle": "solid"
  },
  "bui-cell-xlarge": {
    "flexDirection": "row",
    "alignItems": "center",
    "height": "140",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d7dde4",
    "borderBottomStyle": "solid",
    "backgroundColor:active": "#f5f5f5"
  },
  "bui-list-left": {
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "paddingLeft": "20"
  },
  "bui-list-main": {
    "paddingLeft": "20",
    "flex": 1,
    "justifyContent": "center"
  },
  "bui-list-right": {
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "paddingRight": "20"
  },
  "bui-list-title": {
    "fontSize": "34",
    "color": "#464c5b",
    "textOverflow": "ellipsis",
    "lines": 1
  },
  "bui-list-subtitle": {
    "fontSize": "30",
    "color": "#9ea7b4",
    "textOverflow": "ellipsis",
    "lines": 1
  },
  "bui-list-thumb": {
    "width": "80",
    "height": "80"
  },
  "bui-list-action": {
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "width": "300"
  },
  "bui-loading": {
    "width": "750",
    "height": "150",
    "alignItems": "center",
    "justifyContent": "center",
    "paddingTop": "10",
    "paddingBottom": "10"
  },
  "bui-refresh": {
    "justifyContent": "center",
    "flexDirection": "row",
    "width": "750",
    "height": "100",
    "alignItems": "center",
    "paddingTop": "10",
    "paddingBottom": "10"
  },
  "bui-loading-indicator": {
    "fontSize": "30",
    "textAlign": "center",
    "color": "#9ea7b4"
  },
  "bui-indicator": {
    "height": "60",
    "width": "60",
    "color": "#9ea7b4"
  },
  "bui-list-swipe": {
    "position": "absolute",
    "left": "0",
    "right": "0",
    "top": "0",
    "bottom": "0",
    "flexDirection": "row",
    "justifyContent": "flex-end"
  },
  "bui-list-swipe-btn": {
    "flexDirection": "row",
    "width": "120",
    "alignItems": "center",
    "justifyContent": "center",
    "textAlign": "center",
    "backgroundColor": "#c6c7c8"
  },
  "bgRed": {
    "backgroundColor": "#fa3300"
  },
  "bui-list-swipe-btn-text": {
    "fontSize": "30",
    "color": "#ffffff"
  },
  "bui-list-swipe-main": {
    "flexDirection": "row"
  },
  "bui-list-main-left": {
    "justifyContent": "center",
    "flex": 1
  },
  "bui-list-desc": {
    "fontSize": "25",
    "color": "#464c5b"
  },
  "h1": {
    "fontSize": "80",
    "lineHeight": "120",
    "color": "#464c5b"
  },
  "h2": {
    "fontSize": "60",
    "lineHeight": "100",
    "color": "#464c5b"
  },
  "h3": {
    "fontSize": "45",
    "lineHeight": "60",
    "color": "#464c5b"
  },
  "h4": {
    "fontSize": "32",
    "lineHeight": "45",
    "color": "#464c5b"
  },
  "h5": {
    "fontSize": "28",
    "lineHeight": "40",
    "color": "#464c5b"
  }
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {
  "panel": {
    "flexDirection": "row",
    "height": "100",
    "borderBottomWidth": "1",
    "borderColor": "#eeeeee",
    "justifyContent": "space-between"
  },
  "link": {
    "lineHeight": "100",
    "textAlign": "center",
    "flex": 1,
    "color": "#00B4FF"
  }
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var globalEvent = weex.requireModule('globalEvent');
module.exports = {
    data: function data() {
        return {
            leftItem: {
                icon: 'ion-chevron-left'
            },
            id: "weex router"
        };
    },
    methods: {
        back: function back() {
            this.$pop();
        },
        linkTo: function linkTo(path) {
            //点击后改变路由
            this.$router.push({
                path: path
            });
        }
    },
    components: {},
    watch: {
        $route: function $route(to, from) {
            // this.$alert(to.path);
        }
    },
    mounted: function mounted() {
        var _this = this;

        // this.$alert(this.$route);
        globalEvent.addEventListener("androidback", function (e) {
            _this.$pop();
        });
    }
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["flex-column"]
  }, [_c('div', {
    staticClass: ["panel"]
  }, [_c('text', {
    staticClass: ["link"],
    style: {
      'color:active': 'black'
    },
    on: {
      "click": function($event) {
        _vm.linkTo("/")
      }
    }
  }, [_vm._v("首页")]), _c('text', {
    staticClass: ["link"],
    style: {
      'color:active': 'black'
    },
    on: {
      "click": function($event) {
        _vm.linkTo(("/focus/" + _vm.id))
      }
    }
  }, [_vm._v("关注")]), _c('text', {
    staticClass: ["link"],
    style: {
      'color:active': 'black'
    },
    on: {
      "click": function($event) {
        _vm.linkTo("/recommend")
      }
    }
  }, [_vm._v("推荐")])]), _c('div', {
    staticClass: ["span1"],
    staticStyle: {
      height: "750px"
    }
  }, [_c('router-view')], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vueRouter = __webpack_require__(8);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _home = __webpack_require__(9);

var _home2 = _interopRequireDefault(_home);

var _focus = __webpack_require__(12);

var _focus2 = _interopRequireDefault(_focus);

var _recommend = __webpack_require__(16);

var _recommend2 = _interopRequireDefault(_recommend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*global Vue*/
Vue.use(_vueRouter2.default);

exports.default = new _vueRouter2.default({
    routes: [{
        path: '/',
        name: 'home',
        component: _home2.default
    }, {
        //传参
        path: '/focus/:id',
        name: 'focus',
        component: _focus2.default
    }, {
        path: '/recommend',
        name: 'recommend',
        component: _recommend2.default
    }]
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/*!
  * vue-router v3.1.5
  * (c) 2020 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if ("development" !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

function isExtendedError (constructor, err) {
  return (
    err instanceof constructor ||
    // _name is to support IE9 too
    (err && (err.name === constructor.name || err._name === constructor._name))
  )
}

function extend (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

var View = {
  name: 'RouterView',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    // used by devtools to display a router-view badge
    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      var vnodeData = parent.$vnode ? parent.$vnode.data : {};
      if (vnodeData.routerView) {
        depth++;
      }
      if (vnodeData.keepAlive && parent._directInactive && parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      var cachedData = cache[name];
      var cachedComponent = cachedData && cachedData.component;
      if (cachedComponent) {
        // #2301
        // pass props
        if (cachedData.configProps) {
          fillPropsinData(cachedComponent, data, cachedData.route, cachedData.configProps);
        }
        return h(cachedComponent, data, children)
      } else {
        // render previous empty view
        return h()
      }
    }

    var matched = route.matched[depth];
    var component = matched && matched.components[name];

    // render empty node if no matched route or no config component
    if (!matched || !component) {
      cache[name] = null;
      return h()
    }

    // cache component
    cache[name] = { component: component };

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // register instance in init hook
    // in case kept-alive component be actived when routes changed
    data.hook.init = function (vnode) {
      if (vnode.data.keepAlive &&
        vnode.componentInstance &&
        vnode.componentInstance !== matched.instances[name]
      ) {
        matched.instances[name] = vnode.componentInstance;
      }
    };

    var configProps = matched.props && matched.props[name];
    // save route and configProps in cachce
    if (configProps) {
      extend(cache[name], {
        route: route,
        configProps: configProps
      });
      fillPropsinData(component, data, route, configProps);
    }

    return h(component, data, children)
  }
};

function fillPropsinData (component, data, route, configProps) {
  // resolve props
  var propsToPass = data.props = resolveProps(route, configProps);
  if (propsToPass) {
    // clone to prevent mutation
    propsToPass = data.props = extend({}, propsToPass);
    // pass non-declared props as attrs
    var attrs = data.attrs = data.attrs || {};
    for (var key in propsToPass) {
      if (!component.props || !(key in component.props)) {
        attrs[key] = propsToPass[key];
        delete propsToPass[key];
      }
    }
  }
}

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (true) {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    "development" !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}
pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  params = params || {};
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));

    // Fix #2505 resolving asterisk routes { name: 'not-found', params: { pathMatch: '/not-found' }}
    if (params.pathMatch) { params[0] = params.pathMatch; }

    return filler(params, { pretty: true })
  } catch (e) {
    if (true) {
      // Fix #3072 no warn if `pathMatch` is string
      warn(typeof params.pathMatch === 'string', ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  } finally {
    // delete the 0 if it was added
    delete params[0];
  }
}

/*  */

function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next._normalized) {
    return next
  } else if (next.name) {
    next = extend({}, raw);
    var params = next.params;
    if (params && typeof params === 'object') {
      next.params = extend({}, params);
    }
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = extend({}, next);
    next._normalized = true;
    var params$1 = extend(extend({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params$1;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params$1, ("path " + (current.path)));
    } else if (true) {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var noop = function () {};

var Link = {
  name: 'RouterLink',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(
      this.to,
      current,
      this.append
    );
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback =
      globalActiveClass == null ? 'router-link-active' : globalActiveClass;
    var exactActiveClassFallback =
      globalExactActiveClass == null
        ? 'router-link-exact-active'
        : globalExactActiveClass;
    var activeClass =
      this.activeClass == null ? activeClassFallback : this.activeClass;
    var exactActiveClass =
      this.exactActiveClass == null
        ? exactActiveClassFallback
        : this.exactActiveClass;

    var compareTarget = route.redirectedFrom
      ? createRoute(null, normalizeLocation(route.redirectedFrom), null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location, noop);
        } else {
          router.push(location, noop);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) {
        on[e] = handler;
      });
    } else {
      on[this.event] = handler;
    }

    var data = { class: classes };

    var scopedSlot =
      !this.$scopedSlots.$hasNormal &&
      this.$scopedSlots.default &&
      this.$scopedSlots.default({
        href: href,
        route: route,
        navigate: handler,
        isActive: classes[activeClass],
        isExactActive: classes[exactActiveClass]
      });

    if (scopedSlot) {
      if (scopedSlot.length === 1) {
        return scopedSlot[0]
      } else if (scopedSlot.length > 1 || !scopedSlot.length) {
        if (true) {
          warn(
            false,
            ("RouterLink with to=\"" + (this.to) + "\" is trying to use a scoped slot but it didn't provide exactly one child. Wrapping the content with a span element.")
          );
        }
        return scopedSlot.length === 0 ? h() : h('span', {}, scopedSlot)
      }
    }

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var aData = (a.data = extend({}, a.data));
        aData.on = aData.on || {};
        // transform existing events in both objects into arrays so we can push later
        for (var event in aData.on) {
          var handler$1 = aData.on[event];
          if (event in on) {
            aData.on[event] = Array.isArray(handler$1) ? handler$1 : [handler$1];
          }
        }
        // append new listeners for router-link
        for (var event$1 in on) {
          if (event$1 in aData.on) {
            // on[event] is always a function
            aData.on[event$1].push(on[event$1]);
          } else {
            aData.on[event$1] = handler;
          }
        }

        var aAttrs = (a.data.attrs = extend({}, a.data.attrs));
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('RouterView', View);
  Vue.component('RouterLink', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  if (true) {
    // warn if routes do not include leading slashes
    var found = pathList
    // check for missing leading slash
      .filter(function (path) { return path && path.charAt(0) !== '*' && path.charAt(0) !== '/'; });

    if (found.length > 0) {
      var pathNames = found.map(function (path) { return ("- " + path); }).join('\n');
      warn(false, ("Non-nested routes must include a leading slash character. Fix the following routes: \n" + pathNames));
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (true) {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(
        path || name
      )) + " cannot be a " + "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions =
    route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict);

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props:
      route.props == null
        ? {}
        : route.components
          ? route.props
          : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (true) {
      if (
        route.name &&
        !route.redirect &&
        route.children.some(function (child) { return /^\/?$/.test(child.path); })
      ) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
            "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
            "the default child route will not be rendered. Remove the name from " +
            "this route and use the name of the default child route for named " +
            "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias) ? route.alias : [route.alias];
    for (var i = 0; i < aliases.length; ++i) {
      var alias = aliases[i];
      if ("development" !== 'production' && alias === path) {
        warn(
          false,
          ("Found an alias with the same value as the path: \"" + path + "\". You have to remove that alias. It will be ignored in development.")
        );
        // skip in dev to make it work
        continue
      }

      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    }
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if ("development" !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
          "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (
  path,
  pathToRegexpOptions
) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (true) {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(
        !keys[key.name],
        ("Duplicate param keys in route with path: \"" + path + "\"")
      );
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (
  path,
  parent,
  strict
) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */



function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (true) {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
      return _createRoute(record, location, redirectedFrom)
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
      ? originalRedirect(createRoute(record, location, null, router))
      : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (true) {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (true) {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (true) {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      // Fix #1994: using * with props: true generates a param named 0
      params[key.name || 'pathMatch'] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */

// use User Timing api (if present) for more accurate key precision
var Time =
  inBrowser && window.performance && window.performance.now
    ? window.performance
    : Date;

function genStateKey () {
  return Time.now().toFixed(3)
}

var _key = genStateKey();

function getStateKey () {
  return _key
}

function setStateKey (key) {
  return (_key = key)
}

/*  */

var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  // Fix for #2195 Add optional third attribute to workaround a bug in safari https://bugs.webkit.org/show_bug.cgi?id=182678
  // Fix for #2774 Support for apps loaded from Windows file shares not mapped to network drives: replaced location.origin with
  // window.location.protocol + '//' + window.location.host
  // location.host contains the port and location.hostname doesn't
  var protocolAndPath = window.location.protocol + '//' + window.location.host;
  var absolutePath = window.location.href.replace(protocolAndPath, '');
  window.history.replaceState({ key: getStateKey() }, '', absolutePath);
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (true) {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior.call(
      router,
      to,
      from,
      isPop ? position : null
    );

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll
        .then(function (shouldScroll) {
          scrollToPosition((shouldScroll), position);
        })
        .catch(function (err) {
          if (true) {
            assert(false, err.toString());
          }
        });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

var hashStartsWithNumberRE = /^#\d/;

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    // getElementById would still fail if the selector contains a more complicated query like #main[data-attr]
    // but at the same time, it doesn't make much sense to select an element with an id and an extra selector
    var el = hashStartsWithNumberRE.test(shouldScroll.selector) // $flow-disable-line
      ? document.getElementById(shouldScroll.selector.slice(1)) // $flow-disable-line
      : document.querySelector(shouldScroll.selector);

    if (el) {
      var offset =
        shouldScroll.offset && typeof shouldScroll.offset === 'object'
          ? shouldScroll.offset
          : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState =
  inBrowser &&
  (function () {
    var ua = window.navigator.userAgent;

    if (
      (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
      ua.indexOf('Mobile Safari') !== -1 &&
      ua.indexOf('Chrome') === -1 &&
      ua.indexOf('Windows Phone') === -1
    ) {
      return false
    }

    return window.history && 'pushState' in window.history
  })();

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      // preserve existing history state as it could be overriden by the user
      var stateCopy = extend({}, history.state);
      stateCopy.key = getStateKey();
      history.replaceState(stateCopy, '', url);
    } else {
      history.pushState({ key: setStateKey(genStateKey()) }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          "development" !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

var NavigationDuplicated = /*@__PURE__*/(function (Error) {
  function NavigationDuplicated (normalizedLocation) {
    Error.call(this);
    this.name = this._name = 'NavigationDuplicated';
    // passing the message to super() doesn't seem to work in the transpiled version
    this.message = "Navigating to current location (\"" + (normalizedLocation.fullPath) + "\") is not allowed";
    // add a stack property so services like Sentry can correctly display it
    Object.defineProperty(this, 'stack', {
      value: new Error().stack,
      writable: true,
      configurable: true
    });
    // we could also have used
    // Error.captureStackTrace(this, this.constructor)
    // but it only exists on node and chrome
  }

  if ( Error ) NavigationDuplicated.__proto__ = Error;
  NavigationDuplicated.prototype = Object.create( Error && Error.prototype );
  NavigationDuplicated.prototype.constructor = NavigationDuplicated;

  return NavigationDuplicated;
}(Error));

// support IE9
NavigationDuplicated._name = 'NavigationDuplicated';

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (
  location,
  onComplete,
  onAbort
) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(
    route,
    function () {
      this$1.updateRoute(route);
      onComplete && onComplete(route);
      this$1.ensureURL();

      // fire ready cbs once
      if (!this$1.ready) {
        this$1.ready = true;
        this$1.readyCbs.forEach(function (cb) {
          cb(route);
        });
      }
    },
    function (err) {
      if (onAbort) {
        onAbort(err);
      }
      if (err && !this$1.ready) {
        this$1.ready = true;
        this$1.readyErrorCbs.forEach(function (cb) {
          cb(err);
        });
      }
    }
  );
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    // after merging https://github.com/vuejs/vue-router/pull/2771 we
    // When the user navigates through history through back/forward buttons
    // we do not want to throw the error. We only throw it if directly calling
    // push/replace. That's why it's not included in isError
    if (!isExtendedError(NavigationDuplicated, err) && isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) {
          cb(err);
        });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort(new NavigationDuplicated(route))
  }

  var ref = resolveQueue(
    this.current.matched,
    route.matched
  );
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' &&
            (typeof to.path === 'string' || typeof to.name === 'string'))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) {
            cb();
          });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(
    activated,
    'beforeRouteEnter',
    function (guard, _, match, key) {
      return bindEnterGuard(guard, match, key, cbs, isValid)
    }
  )
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
      next(cb);
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (
    instances[key] &&
    !instances[key]._isBeingDestroyed // do not reuse being destroyed instance
  ) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */

var HTML5History = /*@__PURE__*/(function (History) {
  function HTML5History (router, base) {
    var this$1 = this;

    History.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (supportsScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History ) HTML5History.__proto__ = History;
  HTML5History.prototype = Object.create( History && History.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = decodeURI(window.location.pathname);
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */

var HashHistory = /*@__PURE__*/(function (History) {
  function HashHistory (router, base, fallback) {
    History.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History ) HashHistory.__proto__ = History;
  HashHistory.prototype = Object.create( History && History.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(
      supportsPushState ? 'popstate' : 'hashchange',
      function () {
        var current = this$1.current;
        if (!ensureSlash()) {
          return
        }
        this$1.transitionTo(getHash(), function (route) {
          if (supportsScroll) {
            handleScroll(this$1.router, route, current, true);
          }
          if (!supportsPushState) {
            replaceHash(route.fullPath);
          }
        });
      }
    );
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(
      location,
      function (route) {
        pushHash(route.fullPath);
        handleScroll(this$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(
      location,
      function (route) {
        replaceHash(route.fullPath);
        handleScroll(this$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(cleanPath(base + '/#' + location));
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  // empty path
  if (index < 0) { return '' }

  href = href.slice(index + 1);
  // decode the hash but not the search or hash
  // as search(query) is already decoded
  // https://github.com/vuejs/vue-router/issues/2708
  var searchIndex = href.indexOf('?');
  if (searchIndex < 0) {
    var hashIndex = href.indexOf('#');
    if (hashIndex > -1) {
      href = decodeURI(href.slice(0, hashIndex)) + href.slice(hashIndex);
    } else { href = decodeURI(href); }
  } else {
    href = decodeURI(href.slice(0, searchIndex)) + href.slice(searchIndex);
  }

  return href
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */

var AbstractHistory = /*@__PURE__*/(function (History) {
  function AbstractHistory (router, base) {
    History.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History ) AbstractHistory.__proto__ = History;
  AbstractHistory.prototype = Object.create( History && History.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(
      location,
      function (route) {
        this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
        this$1.index++;
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(
      location,
      function (route) {
        this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(
      route,
      function () {
        this$1.index = targetIndex;
        this$1.updateRoute(route);
      },
      function (err) {
        if (isExtendedError(NavigationDuplicated, err)) {
          this$1.index = targetIndex;
        }
      }
    );
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */



var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (true) {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  "development" !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // set up app destroyed handler
  // https://github.com/vuejs/vue-router/issues/2639
  app.$once('hook:destroyed', function () {
    // clean out app from this.apps array once destroyed
    var index = this$1.apps.indexOf(app);
    if (index > -1) { this$1.apps.splice(index, 1); }
    // ensure we still have a main app or null if no apps
    // we do not release the router so it can be reused
    if (this$1.app === app) { this$1.app = this$1.apps[0] || null; }
  });

  // main app previously initialized
  // return as we don't need to set up new history listener
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

  // $flow-disable-line
  if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
    return new Promise(function (resolve, reject) {
      this$1.history.push(location, resolve, reject);
    })
  } else {
    this.history.push(location, onComplete, onAbort);
  }
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

  // $flow-disable-line
  if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
    return new Promise(function (resolve, reject) {
      this$1.history.replace(location, resolve, reject);
    })
  } else {
    this.history.replace(location, onComplete, onAbort);
  }
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  current = current || this.history.current;
  var location = normalizeLocation(
    to,
    current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '3.1.5';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["default"] = (VueRouter);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(10)
)

/* template */
var __vue_template__ = __webpack_require__(11)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/molock/Movies/Midea/project/midea_Iot_github开源项目/weex-demo-template/src/widgets/T0x13/views/router/home.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-a7bcd5ec"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = {
  "flex-row": {
    "flexDirection": "row"
  },
  "flex-fluid": {
    "flexWrap": "wrap"
  },
  "center": {
    "justifyContent": "center",
    "alignItems": "center"
  },
  "column-center-top": {
    "alignItems": "center"
  },
  "column-center-bottom": {
    "justifyContent": "flex-end",
    "alignItems": "center"
  },
  "column-center-left": {
    "justifyContent": "center",
    "alignItems": "flex-start"
  },
  "column-center-right": {
    "justifyContent": "center",
    "alignItems": "flex-end"
  },
  "column-left-top": {
    "alignItems": "flex-start"
  },
  "column-right-top": {
    "alignItems": "flex-end"
  },
  "column-left-bottom": {
    "justifyContent": "flex-end",
    "alignItems": "flex-start"
  },
  "column-right-bottom": {
    "justifyContent": "flex-end",
    "alignItems": "flex-end"
  },
  "row-space-between": {
    "justifyContent": "space-between",
    "alignItems": "center"
  },
  "row-center-top": {
    "justifyContent": "center",
    "alignItems": "flex-start"
  },
  "row-center-bottom": {
    "justifyContent": "center",
    "alignItems": "flex-end"
  },
  "row-center-left": {
    "alignItems": "center"
  },
  "row-center-right": {
    "justifyContent": "flex-end",
    "alignItems": "center"
  },
  "row-left-top": {
    "alignItems": "flex-start"
  },
  "row-right-top": {
    "justifyContent": "flex-end",
    "alignItems": "flex-start"
  },
  "row-left-bottom": {
    "alignItems": "flex-end"
  },
  "row-right-bottom": {
    "justifyContent": "flex-end",
    "alignItems": "flex-end"
  },
  "span1": {
    "flex": 1
  },
  "span2": {
    "flex": 2
  },
  "span3": {
    "flex": 3
  },
  "span4": {
    "flex": 4
  },
  "span5": {
    "flex": 5
  },
  "span6": {
    "flex": 6
  },
  "span7": {
    "flex": 7
  },
  "span8": {
    "flex": 8
  },
  "span9": {
    "flex": 9
  },
  "span10": {
    "flex": 10
  },
  "span11": {
    "flex": 11
  },
  "span12": {
    "flex": 12
  },
  "flex1": {
    "flex": 1
  },
  "flex2": {
    "flex": 2
  },
  "flex3": {
    "flex": 3
  },
  "flex4": {
    "flex": 4
  },
  "flex5": {
    "flex": 5
  },
  "flex6": {
    "flex": 6
  },
  "flex7": {
    "flex": 7
  },
  "flex8": {
    "flex": 8
  },
  "flex9": {
    "flex": 9
  },
  "flex10": {
    "flex": 10
  },
  "flex11": {
    "flex": 11
  },
  "flex12": {
    "flex": 12
  },
  "p-a": {
    "position": "absolute"
  },
  "badges": {
    "backgroundColor": "#ff4e24",
    "width": "50",
    "height": "40",
    "borderRadius": "30",
    "textAlign": "center",
    "color": "#ffffff",
    "paddingTop": "7",
    "fontSize": "24"
  },
  "large-badges": {
    "backgroundColor": "#ff4e24",
    "width": "70",
    "height": "40",
    "borderRadius": "30",
    "textAlign": "center",
    "color": "#ffffff",
    "paddingTop": "7"
  },
  "bui-form-label": {
    "width": "200",
    "fontSize": "35",
    "color": "#999999",
    "lines": 1,
    "textOverflow": "ellipsis"
  },
  "bui-form-input": {
    "flex": 1,
    "fontSize": "35",
    "height": "80"
  },
  "bui-form-switch": {
    "right": "0",
    "backgroundColor": "#FF0000"
  },
  "bui-list": {
    "flex": 1
  },
  "bui-cell": {
    "flexDirection": "row",
    "alignItems": "center",
    "height": "100",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d7dde4",
    "borderBottomStyle": "solid",
    "backgroundColor:active": "#f5f5f5"
  },
  "bui-cell-large": {
    "flexDirection": "row",
    "height": "120",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d7dde4",
    "borderBottomStyle": "solid",
    "backgroundColor:active": "#f5f5f5"
  },
  "bui-cell-swipe-menu": {
    "flexDirection": "row",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d7dde4",
    "borderBottomStyle": "solid"
  },
  "bui-cell-xlarge": {
    "flexDirection": "row",
    "alignItems": "center",
    "height": "140",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d7dde4",
    "borderBottomStyle": "solid",
    "backgroundColor:active": "#f5f5f5"
  },
  "bui-list-left": {
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "paddingLeft": "20"
  },
  "bui-list-main": {
    "paddingLeft": "20",
    "flex": 1,
    "justifyContent": "center"
  },
  "bui-list-right": {
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "paddingRight": "20"
  },
  "bui-list-title": {
    "fontSize": "34",
    "color": "#464c5b",
    "textOverflow": "ellipsis",
    "lines": 1
  },
  "bui-list-subtitle": {
    "fontSize": "30",
    "color": "#9ea7b4",
    "textOverflow": "ellipsis",
    "lines": 1
  },
  "bui-list-thumb": {
    "width": "80",
    "height": "80"
  },
  "bui-list-action": {
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "width": "300"
  },
  "bui-loading": {
    "width": "750",
    "height": "150",
    "alignItems": "center",
    "justifyContent": "center",
    "paddingTop": "10",
    "paddingBottom": "10"
  },
  "bui-refresh": {
    "justifyContent": "center",
    "flexDirection": "row",
    "width": "750",
    "height": "100",
    "alignItems": "center",
    "paddingTop": "10",
    "paddingBottom": "10"
  },
  "bui-loading-indicator": {
    "fontSize": "30",
    "textAlign": "center",
    "color": "#9ea7b4"
  },
  "bui-indicator": {
    "height": "60",
    "width": "60",
    "color": "#9ea7b4"
  },
  "bui-list-swipe": {
    "position": "absolute",
    "left": "0",
    "right": "0",
    "top": "0",
    "bottom": "0",
    "flexDirection": "row",
    "justifyContent": "flex-end"
  },
  "bui-list-swipe-btn": {
    "flexDirection": "row",
    "width": "120",
    "alignItems": "center",
    "justifyContent": "center",
    "textAlign": "center",
    "backgroundColor": "#c6c7c8"
  },
  "bgRed": {
    "backgroundColor": "#fa3300"
  },
  "bui-list-swipe-btn-text": {
    "fontSize": "30",
    "color": "#ffffff"
  },
  "bui-list-swipe-main": {
    "flexDirection": "row"
  },
  "bui-list-main-left": {
    "justifyContent": "center",
    "flex": 1
  },
  "bui-list-desc": {
    "fontSize": "25",
    "color": "#464c5b"
  },
  "h1": {
    "fontSize": "80",
    "lineHeight": "120",
    "color": "#464c5b"
  },
  "h2": {
    "fontSize": "60",
    "lineHeight": "100",
    "color": "#464c5b"
  },
  "h3": {
    "fontSize": "45",
    "lineHeight": "60",
    "color": "#464c5b"
  },
  "h4": {
    "fontSize": "32",
    "lineHeight": "45",
    "color": "#464c5b"
  },
  "h5": {
    "fontSize": "28",
    "lineHeight": "40",
    "color": "#464c5b"
  }
}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["span1", "center"]
  }, [_c('text', [_vm._v("路由：首页（HOME）")])])
}]}
module.exports.render._withStripped = true

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(13)
)

/* script */
__vue_exports__ = __webpack_require__(14)

/* template */
var __vue_template__ = __webpack_require__(15)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/molock/Movies/Midea/project/midea_Iot_github开源项目/weex-demo-template/src/widgets/T0x13/views/router/focus.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-84f9ee86"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {
  "flex-row": {
    "flexDirection": "row"
  },
  "flex-fluid": {
    "flexWrap": "wrap"
  },
  "center": {
    "justifyContent": "center",
    "alignItems": "center"
  },
  "column-center-top": {
    "alignItems": "center"
  },
  "column-center-bottom": {
    "justifyContent": "flex-end",
    "alignItems": "center"
  },
  "column-center-left": {
    "justifyContent": "center",
    "alignItems": "flex-start"
  },
  "column-center-right": {
    "justifyContent": "center",
    "alignItems": "flex-end"
  },
  "column-left-top": {
    "alignItems": "flex-start"
  },
  "column-right-top": {
    "alignItems": "flex-end"
  },
  "column-left-bottom": {
    "justifyContent": "flex-end",
    "alignItems": "flex-start"
  },
  "column-right-bottom": {
    "justifyContent": "flex-end",
    "alignItems": "flex-end"
  },
  "row-space-between": {
    "justifyContent": "space-between",
    "alignItems": "center"
  },
  "row-center-top": {
    "justifyContent": "center",
    "alignItems": "flex-start"
  },
  "row-center-bottom": {
    "justifyContent": "center",
    "alignItems": "flex-end"
  },
  "row-center-left": {
    "alignItems": "center"
  },
  "row-center-right": {
    "justifyContent": "flex-end",
    "alignItems": "center"
  },
  "row-left-top": {
    "alignItems": "flex-start"
  },
  "row-right-top": {
    "justifyContent": "flex-end",
    "alignItems": "flex-start"
  },
  "row-left-bottom": {
    "alignItems": "flex-end"
  },
  "row-right-bottom": {
    "justifyContent": "flex-end",
    "alignItems": "flex-end"
  },
  "span1": {
    "flex": 1
  },
  "span2": {
    "flex": 2
  },
  "span3": {
    "flex": 3
  },
  "span4": {
    "flex": 4
  },
  "span5": {
    "flex": 5
  },
  "span6": {
    "flex": 6
  },
  "span7": {
    "flex": 7
  },
  "span8": {
    "flex": 8
  },
  "span9": {
    "flex": 9
  },
  "span10": {
    "flex": 10
  },
  "span11": {
    "flex": 11
  },
  "span12": {
    "flex": 12
  },
  "flex1": {
    "flex": 1
  },
  "flex2": {
    "flex": 2
  },
  "flex3": {
    "flex": 3
  },
  "flex4": {
    "flex": 4
  },
  "flex5": {
    "flex": 5
  },
  "flex6": {
    "flex": 6
  },
  "flex7": {
    "flex": 7
  },
  "flex8": {
    "flex": 8
  },
  "flex9": {
    "flex": 9
  },
  "flex10": {
    "flex": 10
  },
  "flex11": {
    "flex": 11
  },
  "flex12": {
    "flex": 12
  },
  "p-a": {
    "position": "absolute"
  },
  "badges": {
    "backgroundColor": "#ff4e24",
    "width": "50",
    "height": "40",
    "borderRadius": "30",
    "textAlign": "center",
    "color": "#ffffff",
    "paddingTop": "7",
    "fontSize": "24"
  },
  "large-badges": {
    "backgroundColor": "#ff4e24",
    "width": "70",
    "height": "40",
    "borderRadius": "30",
    "textAlign": "center",
    "color": "#ffffff",
    "paddingTop": "7"
  },
  "bui-form-label": {
    "width": "200",
    "fontSize": "35",
    "color": "#999999",
    "lines": 1,
    "textOverflow": "ellipsis"
  },
  "bui-form-input": {
    "flex": 1,
    "fontSize": "35",
    "height": "80"
  },
  "bui-form-switch": {
    "right": "0",
    "backgroundColor": "#FF0000"
  },
  "bui-list": {
    "flex": 1
  },
  "bui-cell": {
    "flexDirection": "row",
    "alignItems": "center",
    "height": "100",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d7dde4",
    "borderBottomStyle": "solid",
    "backgroundColor:active": "#f5f5f5"
  },
  "bui-cell-large": {
    "flexDirection": "row",
    "height": "120",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d7dde4",
    "borderBottomStyle": "solid",
    "backgroundColor:active": "#f5f5f5"
  },
  "bui-cell-swipe-menu": {
    "flexDirection": "row",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d7dde4",
    "borderBottomStyle": "solid"
  },
  "bui-cell-xlarge": {
    "flexDirection": "row",
    "alignItems": "center",
    "height": "140",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d7dde4",
    "borderBottomStyle": "solid",
    "backgroundColor:active": "#f5f5f5"
  },
  "bui-list-left": {
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "paddingLeft": "20"
  },
  "bui-list-main": {
    "paddingLeft": "20",
    "flex": 1,
    "justifyContent": "center"
  },
  "bui-list-right": {
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "paddingRight": "20"
  },
  "bui-list-title": {
    "fontSize": "34",
    "color": "#464c5b",
    "textOverflow": "ellipsis",
    "lines": 1
  },
  "bui-list-subtitle": {
    "fontSize": "30",
    "color": "#9ea7b4",
    "textOverflow": "ellipsis",
    "lines": 1
  },
  "bui-list-thumb": {
    "width": "80",
    "height": "80"
  },
  "bui-list-action": {
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "width": "300"
  },
  "bui-loading": {
    "width": "750",
    "height": "150",
    "alignItems": "center",
    "justifyContent": "center",
    "paddingTop": "10",
    "paddingBottom": "10"
  },
  "bui-refresh": {
    "justifyContent": "center",
    "flexDirection": "row",
    "width": "750",
    "height": "100",
    "alignItems": "center",
    "paddingTop": "10",
    "paddingBottom": "10"
  },
  "bui-loading-indicator": {
    "fontSize": "30",
    "textAlign": "center",
    "color": "#9ea7b4"
  },
  "bui-indicator": {
    "height": "60",
    "width": "60",
    "color": "#9ea7b4"
  },
  "bui-list-swipe": {
    "position": "absolute",
    "left": "0",
    "right": "0",
    "top": "0",
    "bottom": "0",
    "flexDirection": "row",
    "justifyContent": "flex-end"
  },
  "bui-list-swipe-btn": {
    "flexDirection": "row",
    "width": "120",
    "alignItems": "center",
    "justifyContent": "center",
    "textAlign": "center",
    "backgroundColor": "#c6c7c8"
  },
  "bgRed": {
    "backgroundColor": "#fa3300"
  },
  "bui-list-swipe-btn-text": {
    "fontSize": "30",
    "color": "#ffffff"
  },
  "bui-list-swipe-main": {
    "flexDirection": "row"
  },
  "bui-list-main-left": {
    "justifyContent": "center",
    "flex": 1
  },
  "bui-list-desc": {
    "fontSize": "25",
    "color": "#464c5b"
  },
  "h1": {
    "fontSize": "80",
    "lineHeight": "120",
    "color": "#464c5b"
  },
  "h2": {
    "fontSize": "60",
    "lineHeight": "100",
    "color": "#464c5b"
  },
  "h3": {
    "fontSize": "45",
    "lineHeight": "60",
    "color": "#464c5b"
  },
  "h4": {
    "fontSize": "32",
    "lineHeight": "45",
    "color": "#464c5b"
  },
  "h5": {
    "fontSize": "28",
    "lineHeight": "40",
    "color": "#464c5b"
  }
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
//
//
//
//
//
//
//
//

var globalEvent = weex.requireModule('globalEvent');

module.exports = {
    mounted: function mounted() {
        var _this = this;

        globalEvent.addEventListener("androidback", function (e) {
            _this.$pop();
        });
    }
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["span1", "center"]
  }, [_c('text', [_vm._v("路由：关注 (FOCUS)")]), _c('text', [_vm._v("传入的路由参数： " + _vm._s(_vm.$route.params.id))])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(17)
)

/* script */
__vue_exports__ = __webpack_require__(18)

/* template */
var __vue_template__ = __webpack_require__(20)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/molock/Movies/Midea/project/midea_Iot_github开源项目/weex-demo-template/src/widgets/T0x13/views/router/recommend.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-6e3dc421"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {
  "flex-row": {
    "flexDirection": "row"
  },
  "flex-fluid": {
    "flexWrap": "wrap"
  },
  "center": {
    "justifyContent": "center",
    "alignItems": "center"
  },
  "column-center-top": {
    "alignItems": "center"
  },
  "column-center-bottom": {
    "justifyContent": "flex-end",
    "alignItems": "center"
  },
  "column-center-left": {
    "justifyContent": "center",
    "alignItems": "flex-start"
  },
  "column-center-right": {
    "justifyContent": "center",
    "alignItems": "flex-end"
  },
  "column-left-top": {
    "alignItems": "flex-start"
  },
  "column-right-top": {
    "alignItems": "flex-end"
  },
  "column-left-bottom": {
    "justifyContent": "flex-end",
    "alignItems": "flex-start"
  },
  "column-right-bottom": {
    "justifyContent": "flex-end",
    "alignItems": "flex-end"
  },
  "row-space-between": {
    "justifyContent": "space-between",
    "alignItems": "center"
  },
  "row-center-top": {
    "justifyContent": "center",
    "alignItems": "flex-start"
  },
  "row-center-bottom": {
    "justifyContent": "center",
    "alignItems": "flex-end"
  },
  "row-center-left": {
    "alignItems": "center"
  },
  "row-center-right": {
    "justifyContent": "flex-end",
    "alignItems": "center"
  },
  "row-left-top": {
    "alignItems": "flex-start"
  },
  "row-right-top": {
    "justifyContent": "flex-end",
    "alignItems": "flex-start"
  },
  "row-left-bottom": {
    "alignItems": "flex-end"
  },
  "row-right-bottom": {
    "justifyContent": "flex-end",
    "alignItems": "flex-end"
  },
  "span1": {
    "flex": 1
  },
  "span2": {
    "flex": 2
  },
  "span3": {
    "flex": 3
  },
  "span4": {
    "flex": 4
  },
  "span5": {
    "flex": 5
  },
  "span6": {
    "flex": 6
  },
  "span7": {
    "flex": 7
  },
  "span8": {
    "flex": 8
  },
  "span9": {
    "flex": 9
  },
  "span10": {
    "flex": 10
  },
  "span11": {
    "flex": 11
  },
  "span12": {
    "flex": 12
  },
  "flex1": {
    "flex": 1
  },
  "flex2": {
    "flex": 2
  },
  "flex3": {
    "flex": 3
  },
  "flex4": {
    "flex": 4
  },
  "flex5": {
    "flex": 5
  },
  "flex6": {
    "flex": 6
  },
  "flex7": {
    "flex": 7
  },
  "flex8": {
    "flex": 8
  },
  "flex9": {
    "flex": 9
  },
  "flex10": {
    "flex": 10
  },
  "flex11": {
    "flex": 11
  },
  "flex12": {
    "flex": 12
  },
  "p-a": {
    "position": "absolute"
  },
  "badges": {
    "backgroundColor": "#ff4e24",
    "width": "50",
    "height": "40",
    "borderRadius": "30",
    "textAlign": "center",
    "color": "#ffffff",
    "paddingTop": "7",
    "fontSize": "24"
  },
  "large-badges": {
    "backgroundColor": "#ff4e24",
    "width": "70",
    "height": "40",
    "borderRadius": "30",
    "textAlign": "center",
    "color": "#ffffff",
    "paddingTop": "7"
  },
  "bui-form-label": {
    "width": "200",
    "fontSize": "35",
    "color": "#999999",
    "lines": 1,
    "textOverflow": "ellipsis"
  },
  "bui-form-input": {
    "flex": 1,
    "fontSize": "35",
    "height": "80"
  },
  "bui-form-switch": {
    "right": "0",
    "backgroundColor": "#FF0000"
  },
  "bui-list": {
    "flex": 1
  },
  "bui-cell": {
    "flexDirection": "row",
    "alignItems": "center",
    "height": "100",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d7dde4",
    "borderBottomStyle": "solid",
    "backgroundColor:active": "#f5f5f5"
  },
  "bui-cell-large": {
    "flexDirection": "row",
    "height": "120",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d7dde4",
    "borderBottomStyle": "solid",
    "backgroundColor:active": "#f5f5f5"
  },
  "bui-cell-swipe-menu": {
    "flexDirection": "row",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d7dde4",
    "borderBottomStyle": "solid"
  },
  "bui-cell-xlarge": {
    "flexDirection": "row",
    "alignItems": "center",
    "height": "140",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d7dde4",
    "borderBottomStyle": "solid",
    "backgroundColor:active": "#f5f5f5"
  },
  "bui-list-left": {
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "paddingLeft": "20"
  },
  "bui-list-main": {
    "paddingLeft": "20",
    "flex": 1,
    "justifyContent": "center"
  },
  "bui-list-right": {
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "paddingRight": "20"
  },
  "bui-list-title": {
    "fontSize": "34",
    "color": "#464c5b",
    "textOverflow": "ellipsis",
    "lines": 1
  },
  "bui-list-subtitle": {
    "fontSize": "30",
    "color": "#9ea7b4",
    "textOverflow": "ellipsis",
    "lines": 1
  },
  "bui-list-thumb": {
    "width": "80",
    "height": "80"
  },
  "bui-list-action": {
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "width": "300"
  },
  "bui-loading": {
    "width": "750",
    "height": "150",
    "alignItems": "center",
    "justifyContent": "center",
    "paddingTop": "10",
    "paddingBottom": "10"
  },
  "bui-refresh": {
    "justifyContent": "center",
    "flexDirection": "row",
    "width": "750",
    "height": "100",
    "alignItems": "center",
    "paddingTop": "10",
    "paddingBottom": "10"
  },
  "bui-loading-indicator": {
    "fontSize": "30",
    "textAlign": "center",
    "color": "#9ea7b4"
  },
  "bui-indicator": {
    "height": "60",
    "width": "60",
    "color": "#9ea7b4"
  },
  "bui-list-swipe": {
    "position": "absolute",
    "left": "0",
    "right": "0",
    "top": "0",
    "bottom": "0",
    "flexDirection": "row",
    "justifyContent": "flex-end"
  },
  "bui-list-swipe-btn": {
    "flexDirection": "row",
    "width": "120",
    "alignItems": "center",
    "justifyContent": "center",
    "textAlign": "center",
    "backgroundColor": "#c6c7c8"
  },
  "bgRed": {
    "backgroundColor": "#fa3300"
  },
  "bui-list-swipe-btn-text": {
    "fontSize": "30",
    "color": "#ffffff"
  },
  "bui-list-swipe-main": {
    "flexDirection": "row"
  },
  "bui-list-main-left": {
    "justifyContent": "center",
    "flex": 1
  },
  "bui-list-desc": {
    "fontSize": "25",
    "color": "#464c5b"
  },
  "h1": {
    "fontSize": "80",
    "lineHeight": "120",
    "color": "#464c5b"
  },
  "h2": {
    "fontSize": "60",
    "lineHeight": "100",
    "color": "#464c5b"
  },
  "h3": {
    "fontSize": "45",
    "lineHeight": "60",
    "color": "#464c5b"
  },
  "h4": {
    "fontSize": "32",
    "lineHeight": "45",
    "color": "#464c5b"
  },
  "h5": {
    "fontSize": "28",
    "lineHeight": "40",
    "color": "#464c5b"
  }
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _buiweex = __webpack_require__(0);

var _buiweex2 = _interopRequireDefault(_buiweex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//

var globalEvent = weex.requireModule('globalEvent');

module.exports = {
    data: function data() {
        return {};
    },

    methods: {
        jumpTo: function jumpTo() {
            this.$router.go(-1);
        }
    }
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = {
    formatDate: function formatDate(time, format) {
        format = format || "yyyy-MM-dd hh:mm:ss";
        var d = new Date(); //创建时间对象
        var localTime = time; //当地时间戳
        var localOffset = d.getTimezoneOffset() * 60000; //获得当地时间偏移的毫秒数
        var utc = localTime + localOffset; //utc即GMT时间
        var offset = 8; //中国在东8区
        time = utc + 3600000 * offset; //真正的时间戳
        var date = new Date(time);
        var o = {
            "M+": date.getMonth() + 1, //month
            "d+": date.getDate(), //day
            "h+": date.getHours(), //hour
            "m+": date.getMinutes(), //minute
            "s+": date.getSeconds(), //second
            "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
            "S": date.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }return format;
    },
    isIPad: function isIPad() {
        return WXEnvironment && WXEnvironment.deviceModel.indexOf('iPad') === 0;
    },
    isAppleSimulator: function isAppleSimulator() {
        return WXEnvironment && WXEnvironment.deviceModel === 'x86_64';
    },
    isIPhoneX: function isIPhoneX() {
        return WXEnvironment && (WXEnvironment.deviceModel === 'iPhone10,3' || WXEnvironment.deviceModel === 'iPhone10,6' || WXEnvironment.deviceModel === 'iPhone11,6' || WXEnvironment.deviceModel === 'iPhone11,2' || WXEnvironment.deviceModel === 'iPhone11,4' || WXEnvironment.deviceModel === 'iPhone11,8');
    },
    isIPhone: function isIPhone() {
        return WXEnvironment && WXEnvironment.platform === 'iOS';
    },
    isAndroid: function isAndroid() {
        return WXEnvironment && WXEnvironment.platform === 'android';
    },

    // 适配
    fixStyle: function fixStyle() {
        var that = util;
        if (that.isIPhoneX()) {
            return {
                borderTopWidth: '80px',
                borderTopStyle: 'solid',
                borderTopColor: '#F39424'
            };
        } else if (that.isIPhone()) {
            return {
                borderTopWidth: '40px',
                borderTopStyle: 'solid',
                borderTopColor: '#F39424'
            };
        } else if (that.isAndroid()) {
            return {};
        } else {
            return {};
        }
    }
};

module.exports = util;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["span1", "center"]
  }, [_c('text', [_vm._v("路由：推荐 (recommend)")]), _c('bui-button', {
    attrs: {
      "type": "primary",
      "value": "返回"
    },
    on: {
      "click": _vm.jumpTo
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })
/******/ ]);