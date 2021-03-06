"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.regexp.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _g = _interopRequireDefault(require("@antv/g6"));

var _utils = require("../../utils");

var _constants = require("../../common/constants");

var _withGGEditorContext = _interopRequireDefault(require("../../common/context/GGEditorContext/withGGEditorContext"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

require('@antv/g6/build/plugin.tool.minimap');

var G6Minimap = _g["default"].Components.Minimap;

var Minimap = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Minimap, _React$Component);

  var _super = _createSuper(Minimap);

  (0, _createClass2["default"])(Minimap, [{
    key: "containerId",
    get: function get() {
      var editor = this.props.editor;
      return "".concat(_constants.MINIMAP_CONTAINER, "_").concat(editor.id);
    }
  }, {
    key: "currentPage",
    get: function get() {
      var editor = this.props.editor;
      return editor.getCurrentPage();
    }
  }]);

  function Minimap(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Minimap);
    _this = _super.call(this, props);
    _this.minimap = null;

    _this.bindEvent();

    return _this;
  }

  (0, _createClass2["default"])(Minimap, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.init();
      this.bindPage();
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      var _this$props = this.props,
          _this$props$container = _this$props.container,
          container = _this$props$container === void 0 ? this.containerId : _this$props$container,
          width = _this$props.width,
          height = _this$props.height,
          viewportWindowStyle = _this$props.viewportWindowStyle,
          viewportBackStyle = _this$props.viewportBackStyle;

      var _document$getElementB = document.getElementById(container),
          clientWidth = _document$getElementB.clientWidth,
          clientHeight = _document$getElementB.clientHeight;

      this.minimap = new G6Minimap({
        container: container,
        width: width || clientWidth,
        height: height || clientHeight,
        viewportWindowStyle: viewportWindowStyle,
        viewportBackStyle: viewportBackStyle
      });

      this.minimap.getGraph = function () {
        return _this2.currentPage.getGraph();
      };
    }
  }, {
    key: "bindPage",
    value: function bindPage() {
      if (!this.minimap || !this.currentPage) {
        return;
      }

      var graph = this.currentPage.getGraph();
      this.minimap.bindGraph(graph);
      this.minimap.debounceRender();
    }
  }, {
    key: "bindEvent",
    value: function bindEvent() {
      var _this3 = this;

      var onAfterAddPage = this.props.onAfterAddPage;
      onAfterAddPage(function () {
        _this3.bindPage();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var container = this.props.container;

      if (container) {
        return null;
      }

      return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
        id: this.containerId
      }, (0, _utils.pick)(this.props, ['style', 'className'])));
    }
  }]);
  return Minimap;
}(_react["default"].Component);

var _default = (0, _withGGEditorContext["default"])(Minimap);

exports["default"] = _default;