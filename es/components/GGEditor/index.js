import "core-js/modules/es.array.for-each";
import "core-js/modules/es.date.to-string";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/web.dom-collections.for-each";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React from 'react';
import Editor from "../Base/Editor";
import { EDITOR_EVENTS, EDITOR_REACT_EVENTS, EVENT_BEFORE_ADD_PAGE, EVENT_AFTER_ADD_PAGE } from "../../common/constants";
import { pick } from "../../utils";
import Global from "../../common/Global";
import GGEditorContext from "../../common/context/GGEditorContext";
import PropsAPIContext from "../../common/context/PropsAPIContext";
import PropsAPI from "../../common/context/PropsAPIContext/propsAPI";

var GGEditor = /*#__PURE__*/function (_React$Component) {
  _inherits(GGEditor, _React$Component);

  var _super = _createSuper(GGEditor);

  _createClass(GGEditor, [{
    key: "currentPage",
    get: function get() {
      return this.editor.getCurrentPage();
    }
  }], [{
    key: "setTrackable",
    value: function setTrackable(value) {
      Global.set('trackable', Boolean(value));
    }
  }]);

  function GGEditor(props) {
    var _this;

    _classCallCheck(this, GGEditor);

    _this = _super.call(this, props);
    _this.editor = null;

    _this.addListener = function (target, eventName, handler) {
      if (typeof handler === 'function') target.on(eventName, handler);
    };

    _this.handleBeforeAddPage = function (func) {
      _this.editor.on(EVENT_BEFORE_ADD_PAGE, func);
    };

    _this.handleAfterAddPage = function (func) {
      var _assertThisInitialize = _assertThisInitialized(_this),
          page = _assertThisInitialize.currentPage;

      if (page) {
        func({
          page: page
        });
        return;
      }

      _this.editor.on(EVENT_AFTER_ADD_PAGE, func);
    };

    _this.init();

    _this.bindEvent();

    return _this;
  }

  _createClass(GGEditor, [{
    key: "init",
    value: function init() {
      this.editor = new Editor();
      this.ggEditor = {
        editor: this.editor,
        onBeforeAddPage: this.handleBeforeAddPage,
        onAfterAddPage: this.handleAfterAddPage
      };
      this.propsAPI = new PropsAPI(this.editor);
    }
  }, {
    key: "bindEvent",
    value: function bindEvent() {
      var _this2 = this;

      EDITOR_EVENTS.forEach(function (event) {
        _this2.addListener(_this2.editor, [event], _this2.props[EDITOR_REACT_EVENTS[event]]);
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.editor.destroy();
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return /*#__PURE__*/React.createElement(GGEditorContext.Provider, {
        value: this.ggEditor
      }, /*#__PURE__*/React.createElement(PropsAPIContext.Provider, {
        value: this.propsAPI
      }, /*#__PURE__*/React.createElement("div", pick(this.props, ['style', 'className']), children)));
    }
  }]);

  return GGEditor;
}(React.Component);

export default GGEditor;