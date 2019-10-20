(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types'], factory) :
  (global = global || self, factory(global['react-sketch'] = {}, global.React, global.PropTypes));
}(this, function (exports, React, PropTypes) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  /**
   * Maintains the history of an object
   */
  var History =
  /*#__PURE__*/
  function () {
    function History() {
      var undoLimit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      _classCallCheck(this, History);

      this.undoLimit = undoLimit;
      this.undoList = [];
      this.redoList = [];
      this.current = null;
      this.debug = debug;
    }
    /**
     * Get the limit of undo/redo actions
     *
     * @returns {number|*} the undo limit, as it is configured when constructing the history instance
     */


    _createClass(History, [{
      key: "getUndoLimit",
      value: function getUndoLimit() {
        return this.undoLimit;
      }
      /**
       * Get Current state
       *
       * @returns {null|*}
       */

    }, {
      key: "getCurrent",
      value: function getCurrent() {
        return this.current;
      }
      /**
       * Keep an object to history
       *
       * This method will set the object as current value and will push the previous "current" object to the undo history
       *
       * @param obj
       */

    }, {
      key: "keep",
      value: function keep(obj) {
        try {
          this.redoList = [];

          if (this.current) {
            this.undoList.push(this.current);
          }

          if (this.undoList.length > this.undoLimit) {
            this.undoList.shift();
          }

          this.current = obj;
        } finally {
          this.print();
        }
      }
      /**
       * Undo the last object, this operation will set the current object to one step back in time
       *
       * @returns the new current value after the undo operation, else null if no undo operation was possible
       */

    }, {
      key: "undo",
      value: function undo() {
        try {
          if (this.current) {
            this.redoList.push(this.current);

            if (this.redoList.length > this.undoLimit) {
              this.redoList.shift();
            }

            if (this.undoList.length === 0) this.current = null;
          }

          if (this.undoList.length > 0) {
            this.current = this.undoList.pop();
            return this.current;
          }

          return null;
        } finally {
          this.print();
        }
      }
      /**
       * Redo the last object, redo happens only if no keep operations have been performed
       *
       * @returns the new current value after the redo operation, or null if no redo operation was possible
       */

    }, {
      key: "redo",
      value: function redo() {
        try {
          if (this.redoList.length > 0) {
            if (this.current) this.undoList.push(this.current);
            this.current = this.redoList.pop();
            return this.current;
          }

          return null;
        } finally {
          this.print();
        }
      }
      /**
       * Checks whether we can perform a redo operation
       *
       * @returns {boolean}
       */

    }, {
      key: "canRedo",
      value: function canRedo() {
        return this.redoList.length > 0;
      }
      /**
       * Checks whether we can perform an undo operation
       *
       * @returns {boolean}
       */

    }, {
      key: "canUndo",
      value: function canUndo() {
        return this.undoList.length > 0 || this.current !== null;
      }
      /**
       * Clears the history maintained, can be undone
       */

    }, {
      key: "clear",
      value: function clear() {
        this.undoList = [];
        this.redoList = [];
        this.current = null;
        this.print();
      }
    }, {
      key: "print",
      value: function print() {
        if (this.debug) {
          /* eslint-disable no-console */
          console.log(this.undoList, ' -> ' + this.current + ' <- ', this.redoList.slice(0).reverse());
        }
      }
    }]);

    return History;
  }();

  /**
   * Determine the mouse position
   *
   * @param event the canvas event
   * @returns *[] tuple of position x,y
   * @private
   */
  /**
   * Calculate the distance of two x,y points
   *
   * @param point1 an object with x,y attributes representing the start point
   * @param point2 an object with x,y attributes representing the end point
   *
   * @returns {number}
   */

  var linearDistance = function linearDistance(point1, point2) {
    var xs = point2.x - point1.x;
    var ys = point2.y - point1.y;
    return Math.sqrt(xs * xs + ys * ys);
  };
  /**
   * Return a random uuid of the form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
   * @returns {string}
   */

  var uuid4 = function uuid4() {
    var uuid = '',
        ii;

    for (ii = 0; ii < 32; ii += 1) {
      switch (ii) {
        case 8:
        case 20:
          uuid += '-';
          uuid += (Math.random() * 16 | 0).toString(16);
          break;

        case 12:
          uuid += '-';
          uuid += '4';
          break;

        case 16:
          uuid += '-';
          uuid += (Math.random() * 4 | 8).toString(16);
          break;

        default:
          uuid += (Math.random() * 16 | 0).toString(16);
      }
    }

    return uuid;
  };

  /* eslint no-unused-vars: 0 */

  /**
   * "Abstract" like base class for a Canvas tool
   */
  var FabricCanvasTool =
  /*#__PURE__*/
  function () {
    function FabricCanvasTool(canvas) {
      _classCallCheck(this, FabricCanvasTool);

      this._canvas = canvas;
    }

    _createClass(FabricCanvasTool, [{
      key: "configureCanvas",
      value: function configureCanvas(props) {}
    }, {
      key: "doMouseUp",
      value: function doMouseUp(event) {}
    }, {
      key: "doMouseDown",
      value: function doMouseDown(event) {}
    }, {
      key: "doMouseMove",
      value: function doMouseMove(event) {}
    }, {
      key: "doMouseOut",
      value: function doMouseOut(event) {}
    }]);

    return FabricCanvasTool;
  }();

  var Select =
  /*#__PURE__*/
  function (_FabricCanvasTool) {
    _inherits(Select, _FabricCanvasTool);

    function Select() {
      _classCallCheck(this, Select);

      return _possibleConstructorReturn(this, _getPrototypeOf(Select).apply(this, arguments));
    }

    _createClass(Select, [{
      key: "configureCanvas",
      value: function configureCanvas(props) {
        var canvas = this._canvas;
        canvas.isDrawingMode = false;
        canvas.selection = true;
        canvas.forEachObject(function (o) {
          o.selectable = o.evented = true;
        });
      }
    }]);

    return Select;
  }(FabricCanvasTool);

  var Pencil =
  /*#__PURE__*/
  function (_FabricCanvasTool) {
    _inherits(Pencil, _FabricCanvasTool);

    function Pencil() {
      _classCallCheck(this, Pencil);

      return _possibleConstructorReturn(this, _getPrototypeOf(Pencil).apply(this, arguments));
    }

    _createClass(Pencil, [{
      key: "configureCanvas",
      value: function configureCanvas(props) {
        this._canvas.isDrawingMode = true;
        this._canvas.freeDrawingBrush.width = props.lineWidth;
        this._canvas.freeDrawingBrush.color = props.lineColor;
      }
    }]);

    return Pencil;
  }(FabricCanvasTool);

  var fabric = require('fabric').fabric;

  var Line =
  /*#__PURE__*/
  function (_FabricCanvasTool) {
    _inherits(Line, _FabricCanvasTool);

    function Line() {
      _classCallCheck(this, Line);

      return _possibleConstructorReturn(this, _getPrototypeOf(Line).apply(this, arguments));
    }

    _createClass(Line, [{
      key: "configureCanvas",
      value: function configureCanvas(props) {
        var canvas = this._canvas;
        canvas.isDrawingMode = canvas.selection = false;
        canvas.forEachObject(function (o) {
          return o.selectable = o.evented = false;
        });
        this._width = props.lineWidth;
        this._color = props.lineColor;
      }
    }, {
      key: "doMouseDown",
      value: function doMouseDown(o) {
        this.isDown = true;
        var canvas = this._canvas;
        var pointer = canvas.getPointer(o.e);
        var points = [pointer.x, pointer.y, pointer.x, pointer.y];
        this.line = new fabric.Line(points, {
          strokeWidth: this._width,
          fill: this._color,
          stroke: this._color,
          originX: 'center',
          originY: 'center',
          selectable: false,
          evented: false
        });
        canvas.add(this.line);
      }
    }, {
      key: "doMouseMove",
      value: function doMouseMove(o) {
        if (!this.isDown) return;
        var canvas = this._canvas;
        var pointer = canvas.getPointer(o.e);
        this.line.set({
          x2: pointer.x,
          y2: pointer.y
        });
        this.line.setCoords();
        canvas.renderAll();
      }
    }, {
      key: "doMouseUp",
      value: function doMouseUp(o) {
        this.isDown = false;
      }
    }, {
      key: "doMouseOut",
      value: function doMouseOut(o) {
        this.isDown = false;
      }
    }]);

    return Line;
  }(FabricCanvasTool);

  var fabric$1 = require('fabric').fabric;

  var Arrow =
  /*#__PURE__*/
  function (_FabricCanvasTool) {
    _inherits(Arrow, _FabricCanvasTool);

    function Arrow() {
      _classCallCheck(this, Arrow);

      return _possibleConstructorReturn(this, _getPrototypeOf(Arrow).apply(this, arguments));
    }

    _createClass(Arrow, [{
      key: "configureCanvas",
      value: function configureCanvas(props) {
        var canvas = this._canvas;
        canvas.isDrawingMode = canvas.selection = false;
        canvas.forEachObject(function (o) {
          return o.selectable = o.evented = false;
        });
        this._width = props.lineWidth;
        this._color = props.lineColor;
      }
    }, {
      key: "doMouseDown",
      value: function doMouseDown(o) {
        this.isDown = true;
        var canvas = this._canvas;
        var pointer = canvas.getPointer(o.e);
        var points = [pointer.x, pointer.y, pointer.x, pointer.y];
        this.line = new fabric$1.Line(points, {
          strokeWidth: this._width,
          fill: this._color,
          stroke: this._color,
          originX: 'center',
          originY: 'center',
          selectable: false,
          evented: false
        });
        this.head = new fabric$1.Triangle({
          fill: this._color,
          left: pointer.x,
          top: pointer.y,
          originX: 'center',
          originY: 'center',
          height: 3 * this._width,
          width: 3 * this._width,
          selectable: false,
          evented: false,
          angle: 90
        });
        canvas.add(this.line);
        canvas.add(this.head);
      }
    }, {
      key: "doMouseMove",
      value: function doMouseMove(o) {
        if (!this.isDown) return;
        var canvas = this._canvas;
        var pointer = canvas.getPointer(o.e);
        this.line.set({
          x2: pointer.x,
          y2: pointer.y
        });
        this.line.setCoords();
        var x_delta = pointer.x - this.line.x1;
        var y_delta = pointer.y - this.line.y1;
        this.head.set({
          left: pointer.x,
          top: pointer.y,
          angle: 90 + Math.atan2(y_delta, x_delta) * 180 / Math.PI
        });
        canvas.renderAll();
      }
    }, {
      key: "doMouseUp",
      value: function doMouseUp(o) {
        this.isDown = false;
        var canvas = this._canvas;
        canvas.remove(this.line);
        canvas.remove(this.head);
        var arrow = new fabric$1.Group([this.line, this.head]);
        canvas.add(arrow);
      }
    }, {
      key: "doMouseOut",
      value: function doMouseOut(o) {
        this.isDown = false;
      }
    }]);

    return Arrow;
  }(FabricCanvasTool);

  var fabric$2 = require('fabric').fabric;

  var Rectangle =
  /*#__PURE__*/
  function (_FabricCanvasTool) {
    _inherits(Rectangle, _FabricCanvasTool);

    function Rectangle() {
      _classCallCheck(this, Rectangle);

      return _possibleConstructorReturn(this, _getPrototypeOf(Rectangle).apply(this, arguments));
    }

    _createClass(Rectangle, [{
      key: "configureCanvas",
      value: function configureCanvas(props) {
        var canvas = this._canvas;
        canvas.isDrawingMode = canvas.selection = false;
        canvas.forEachObject(function (o) {
          return o.selectable = o.evented = false;
        });
        this._width = props.lineWidth;
        this._color = props.lineColor;
        this._fill = props.fillColor;
      }
    }, {
      key: "doMouseDown",
      value: function doMouseDown(o) {
        var canvas = this._canvas;
        this.isDown = true;
        var pointer = canvas.getPointer(o.e);
        this.startX = pointer.x;
        this.startY = pointer.y;
        this.rect = new fabric$2.Rect({
          left: this.startX,
          top: this.startY,
          originX: 'left',
          originY: 'top',
          width: pointer.x - this.startX,
          height: pointer.y - this.startY,
          stroke: this._color,
          strokeWidth: this._width,
          fill: this._fill,
          //fill: 'rgba(255,0,0,0.5)',
          transparentCorners: false,
          selectable: false,
          evented: false,
          angle: 0
        });
        canvas.add(this.rect);
      }
    }, {
      key: "doMouseMove",
      value: function doMouseMove(o) {
        if (!this.isDown) return;
        var canvas = this._canvas;
        var pointer = canvas.getPointer(o.e);

        if (this.startX > pointer.x) {
          this.rect.set({
            left: Math.abs(pointer.x)
          });
        }

        if (this.startY > pointer.y) {
          this.rect.set({
            top: Math.abs(pointer.y)
          });
        }

        this.rect.set({
          width: Math.abs(this.startX - pointer.x)
        });
        this.rect.set({
          height: Math.abs(this.startY - pointer.y)
        });
        this.rect.setCoords();
        canvas.renderAll();
      }
    }, {
      key: "doMouseUp",
      value: function doMouseUp(o) {
        this.isDown = false;
      }
    }]);

    return Rectangle;
  }(FabricCanvasTool);

  var fabric$3 = require('fabric').fabric;

  var Circle =
  /*#__PURE__*/
  function (_FabricCanvasTool) {
    _inherits(Circle, _FabricCanvasTool);

    function Circle() {
      _classCallCheck(this, Circle);

      return _possibleConstructorReturn(this, _getPrototypeOf(Circle).apply(this, arguments));
    }

    _createClass(Circle, [{
      key: "configureCanvas",
      value: function configureCanvas(props) {
        var canvas = this._canvas;
        canvas.isDrawingMode = canvas.selection = false;
        canvas.forEachObject(function (o) {
          return o.selectable = o.evented = false;
        });
        this._width = props.lineWidth;
        this._color = props.lineColor;
        this._fill = props.fillColor;
      }
    }, {
      key: "doMouseDown",
      value: function doMouseDown(o) {
        var canvas = this._canvas;
        this.isDown = true;
        var pointer = canvas.getPointer(o.e);
        var _ref = [pointer.x, pointer.y];
        this.startX = _ref[0];
        this.startY = _ref[1];
        this.circle = new fabric$3.Circle({
          left: this.startX,
          top: this.startY,
          originX: 'left',
          originY: 'center',
          strokeWidth: this._width,
          stroke: this._color,
          fill: this._fill,
          selectable: false,
          evented: false,
          radius: 1
        });
        canvas.add(this.circle);
      }
    }, {
      key: "doMouseMove",
      value: function doMouseMove(o) {
        if (!this.isDown) return;
        var canvas = this._canvas;
        var pointer = canvas.getPointer(o.e);
        this.circle.set({
          radius: linearDistance({
            x: this.startX,
            y: this.startY
          }, {
            x: pointer.x,
            y: pointer.y
          }) / 2,
          angle: Math.atan2(pointer.y - this.startY, pointer.x - this.startX) * 180 / Math.PI
        });
        this.circle.setCoords();
        canvas.renderAll();
      }
    }, {
      key: "doMouseUp",
      value: function doMouseUp(o) {
        this.isDown = false;
      }
    }]);

    return Circle;
  }(FabricCanvasTool);

  var fabric$4 = require('fabric').fabric;

  var Pan =
  /*#__PURE__*/
  function (_FabricCanvasTool) {
    _inherits(Pan, _FabricCanvasTool);

    function Pan() {
      _classCallCheck(this, Pan);

      return _possibleConstructorReturn(this, _getPrototypeOf(Pan).apply(this, arguments));
    }

    _createClass(Pan, [{
      key: "configureCanvas",
      value: function configureCanvas(props) {
        var canvas = this._canvas;
        canvas.isDrawingMode = canvas.selection = false;
        canvas.forEachObject(function (o) {
          return o.selectable = o.evented = false;
        }); //Change the cursor to the move grabber

        canvas.defaultCursor = 'move';
      }
    }, {
      key: "doMouseDown",
      value: function doMouseDown(o) {
        var canvas = this._canvas;
        this.isDown = true;
        var pointer = canvas.getPointer(o.e);
        this.startX = pointer.x;
        this.startY = pointer.y;
      }
    }, {
      key: "doMouseMove",
      value: function doMouseMove(o) {
        if (!this.isDown) return;
        var canvas = this._canvas;
        var pointer = canvas.getPointer(o.e);
        canvas.relativePan({
          x: pointer.x - this.startX,
          y: pointer.y - this.startY
        });
        canvas.renderAll();
      }
    }, {
      key: "doMouseUp",
      value: function doMouseUp(o) {
        this.isDown = false;
      }
    }]);

    return Pan;
  }(FabricCanvasTool);

  var Tool = {
    Circle: 'circle',
    Line: 'line',
    Arrow: 'arrow',
    Pencil: 'pencil',
    Rectangle: 'rectangle',
    Select: 'select',
    Pan: 'pan'
  };

  var fabric$5 = require('fabric').fabric;
  /**
   * Sketch Tool based on FabricJS for React Applications
   */


  var SketchField =
  /*#__PURE__*/
  function (_PureComponent) {
    _inherits(SketchField, _PureComponent);

    function SketchField() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, SketchField);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SketchField)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "state", {
        action: true
      });

      _defineProperty(_assertThisInitialized(_this), "_initTools", function (fabricCanvas) {
        _this._tools = {};
        _this._tools[Tool.Select] = new Select(fabricCanvas);
        _this._tools[Tool.Pencil] = new Pencil(fabricCanvas);
        _this._tools[Tool.Line] = new Line(fabricCanvas);
        _this._tools[Tool.Arrow] = new Arrow(fabricCanvas);
        _this._tools[Tool.Rectangle] = new Rectangle(fabricCanvas);
        _this._tools[Tool.Circle] = new Circle(fabricCanvas);
        _this._tools[Tool.Pan] = new Pan(fabricCanvas);
      });

      _defineProperty(_assertThisInitialized(_this), "enableTouchScroll", function () {
        var canvas = _this._fc;
        if (canvas.allowTouchScrolling) return;
        canvas.allowTouchScrolling = true;
      });

      _defineProperty(_assertThisInitialized(_this), "disableTouchScroll", function () {
        var canvas = _this._fc;

        if (canvas.allowTouchScrolling) {
          canvas.allowTouchScrolling = false;
        }
      });

      _defineProperty(_assertThisInitialized(_this), "addImg", function (dataUrl) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var canvas = _this._fc;
        fabric$5.Image.fromURL(dataUrl, function (oImg) {
          var opts = {
            left: Math.random() * (canvas.getWidth() - oImg.width * 0.5),
            top: Math.random() * (canvas.getHeight() - oImg.height * 0.5),
            scale: 0.5
          };
          Object.assign(opts, options);
          oImg.scale(opts.scale);
          oImg.set({
            'left': opts.left,
            'top': opts.top
          });
          canvas.add(oImg);
        });
      });

      _defineProperty(_assertThisInitialized(_this), "_onObjectAdded", function (e) {
        if (!_this.state.action) {
          _this.setState({
            action: true
          });

          return;
        }

        var obj = e.target;
        obj.__version = 1; // record current object state as json and save as originalState

        var objState = obj.toJSON();
        obj.__originalState = objState;
        var state = JSON.stringify(objState); // object, previous state, current state

        _this._history.keep([obj, state, state]);
      });

      _defineProperty(_assertThisInitialized(_this), "_onObjectMoving", function (e) {});

      _defineProperty(_assertThisInitialized(_this), "_onObjectScaling", function (e) {});

      _defineProperty(_assertThisInitialized(_this), "_onObjectRotating", function (e) {});

      _defineProperty(_assertThisInitialized(_this), "_onObjectModified", function (e) {
        var obj = e.target;
        obj.__version += 1;
        var prevState = JSON.stringify(obj.__originalState);
        var objState = obj.toJSON(); // record current object state as json and update to originalState

        obj.__originalState = objState;
        var currState = JSON.stringify(objState);

        _this._history.keep([obj, prevState, currState]);
      });

      _defineProperty(_assertThisInitialized(_this), "_onObjectRemoved", function (e) {
        var obj = e.target;

        if (obj.__removed) {
          obj.__version += 1;
          return;
        }

        obj.__version = 0;
      });

      _defineProperty(_assertThisInitialized(_this), "_onMouseDown", function (e) {
        _this._selectedTool.doMouseDown(e);
      });

      _defineProperty(_assertThisInitialized(_this), "_onMouseMove", function (e) {
        _this._selectedTool.doMouseMove(e);
      });

      _defineProperty(_assertThisInitialized(_this), "_onMouseOut", function (e) {
        _this._selectedTool.doMouseOut(e);

        if (_this.props.onChange) {
          var onChange = _this.props.onChange;
          setTimeout(function () {
            onChange(e.e);
          }, 10);
        }
      });

      _defineProperty(_assertThisInitialized(_this), "_onMouseUp", function (e) {
        _this._selectedTool.doMouseUp(e); // Update the final state to new-generated object
        // Ignore Path object since it would be created after mouseUp
        // Assumed the last object in canvas.getObjects() in the newest object


        if (_this.props.tool !== Tool.Pencil) {
          var canvas = _this._fc;
          var objects = canvas.getObjects();
          var newObj = objects[objects.length - 1];

          if (newObj && newObj.__version === 1) {
            newObj.__originalState = newObj.toJSON();
          }
        }

        if (_this.props.onChange) {
          var onChange = _this.props.onChange;
          setTimeout(function () {
            onChange(e.e);
          }, 10);
        }
      });

      _defineProperty(_assertThisInitialized(_this), "_resize", function (e) {
        if (e) e.preventDefault();
        var _this$props = _this.props,
            widthCorrection = _this$props.widthCorrection,
            heightCorrection = _this$props.heightCorrection;
        var canvas = _this._fc;
        var _this$_container = _this._container,
            offsetWidth = _this$_container.offsetWidth,
            clientHeight = _this$_container.clientHeight;
        var prevWidth = canvas.getWidth();
        var prevHeight = canvas.getHeight();
        var wfactor = ((offsetWidth - widthCorrection) / prevWidth).toFixed(2);
        var hfactor = ((clientHeight - heightCorrection) / prevHeight).toFixed(2);
        canvas.setWidth(offsetWidth - widthCorrection);
        canvas.setHeight(clientHeight - heightCorrection);

        if (canvas.backgroundImage) {
          // Need to scale background images as well
          var bi = canvas.backgroundImage;
          bi.width = bi.width * wfactor;
          bi.height = bi.height * hfactor;
        }

        var objects = canvas.getObjects();

        for (var i in objects) {
          var obj = objects[i];
          var scaleX = obj.scaleX;
          var scaleY = obj.scaleY;
          var left = obj.left;
          var top = obj.top;
          var tempScaleX = scaleX * wfactor;
          var tempScaleY = scaleY * hfactor;
          var tempLeft = left * wfactor;
          var tempTop = top * hfactor;
          obj.scaleX = tempScaleX;
          obj.scaleY = tempScaleY;
          obj.left = tempLeft;
          obj.top = tempTop;
          obj.setCoords();
        }

        canvas.renderAll();
        canvas.calcOffset();
      });

      _defineProperty(_assertThisInitialized(_this), "_backgroundColor", function (color) {
        if (!color) return;
        var canvas = _this._fc;
        canvas.setBackgroundColor(color, function () {
          return canvas.renderAll();
        });
      });

      _defineProperty(_assertThisInitialized(_this), "zoom", function (factor) {
        var canvas = _this._fc;
        var objects = canvas.getObjects();

        for (var i in objects) {
          objects[i].scaleX = objects[i].scaleX * factor;
          objects[i].scaleY = objects[i].scaleY * factor;
          objects[i].left = objects[i].left * factor;
          objects[i].top = objects[i].top * factor;
          objects[i].setCoords();
        }

        canvas.renderAll();
        canvas.calcOffset();
      });

      _defineProperty(_assertThisInitialized(_this), "undo", function () {
        var history = _this._history;

        var _history$getCurrent = history.getCurrent(),
            _history$getCurrent2 = _slicedToArray(_history$getCurrent, 3),
            obj = _history$getCurrent2[0],
            prevState = _history$getCurrent2[1],
            currState = _history$getCurrent2[2];

        history.undo();

        if (obj.__removed) {
          _this.setState({
            action: false
          }, function () {
            _this._fc.add(obj);

            obj.__version -= 1;
            obj.__removed = false;
          });
        } else if (obj.__version <= 1) {
          _this._fc.remove(obj);
        } else {
          obj.__version -= 1;
          obj.setOptions(JSON.parse(prevState));
          obj.setCoords();

          _this._fc.renderAll();
        }

        if (_this.props.onChange) {
          _this.props.onChange();
        }
      });

      _defineProperty(_assertThisInitialized(_this), "redo", function () {
        var history = _this._history;

        if (history.canRedo()) {
          var canvas = _this._fc; //noinspection Eslint

          var _history$redo = history.redo(),
              _history$redo2 = _slicedToArray(_history$redo, 3),
              obj = _history$redo2[0],
              prevState = _history$redo2[1],
              currState = _history$redo2[2];

          if (obj.__version === 0) {
            _this.setState({
              action: false
            }, function () {
              canvas.add(obj);
              obj.__version = 1;
            });
          } else {
            obj.__version += 1;
            obj.setOptions(JSON.parse(currState));
          }

          obj.setCoords();
          canvas.renderAll();

          if (_this.props.onChange) {
            _this.props.onChange();
          }
        }
      });

      _defineProperty(_assertThisInitialized(_this), "canUndo", function () {
        return _this._history.canUndo();
      });

      _defineProperty(_assertThisInitialized(_this), "canRedo", function () {
        return _this._history.canRedo();
      });

      _defineProperty(_assertThisInitialized(_this), "toDataURL", function (options) {
        return _this._fc.toDataURL(options);
      });

      _defineProperty(_assertThisInitialized(_this), "toJSON", function (propertiesToInclude) {
        return _this._fc.toJSON(propertiesToInclude);
      });

      _defineProperty(_assertThisInitialized(_this), "fromJSON", function (json) {
        if (!json) return;
        var canvas = _this._fc;
        setTimeout(function () {
          canvas.loadFromJSON(json, function () {
            canvas.renderAll();

            if (_this.props.onChange) {
              _this.props.onChange();
            }
          });
        }, 100);
      });

      _defineProperty(_assertThisInitialized(_this), "clear", function (propertiesToInclude) {
        var discarded = _this.toJSON(propertiesToInclude);

        _this._fc.clear();

        _this._history.clear();

        return discarded;
      });

      _defineProperty(_assertThisInitialized(_this), "removeSelected", function () {
        var canvas = _this._fc;
        var activeObj = canvas.getActiveObject();

        if (activeObj) {
          var selected = [];

          if (activeObj.type === 'activeSelection') {
            activeObj.forEachObject(function (obj) {
              return selected.push(obj);
            });
          } else {
            selected.push(activeObj);
          }

          selected.forEach(function (obj) {
            obj.__removed = true;
            var objState = obj.toJSON();
            obj.__originalState = objState;
            var state = JSON.stringify(objState);

            _this._history.keep([obj, state, state]);

            canvas.remove(obj);
          });
          canvas.discardActiveObject();
          canvas.requestRenderAll();
        }
      });

      _defineProperty(_assertThisInitialized(_this), "copy", function () {
        var canvas = _this._fc;
        canvas.getActiveObject().clone(function (cloned) {
          return _this._clipboard = cloned;
        });
      });

      _defineProperty(_assertThisInitialized(_this), "paste", function () {
        // clone again, so you can do multiple copies.
        _this._clipboard.clone(function (clonedObj) {
          var canvas = _this._fc;
          canvas.discardActiveObject();
          clonedObj.set({
            left: clonedObj.left + 10,
            top: clonedObj.top + 10,
            evented: true
          });

          if (clonedObj.type === 'activeSelection') {
            // active selection needs a reference to the canvas.
            clonedObj.canvas = canvas;
            clonedObj.forEachObject(function (obj) {
              return canvas.add(obj);
            });
            clonedObj.setCoords();
          } else {
            canvas.add(clonedObj);
          }

          _this._clipboard.top += 10;
          _this._clipboard.left += 10;
          canvas.setActiveObject(clonedObj);
          canvas.requestRenderAll();
        });
      });

      _defineProperty(_assertThisInitialized(_this), "setBackgroundFromDataUrl", function (dataUrl) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var canvas = _this._fc;
        var img = new Image();

        var stretched = options.stretched,
            stretchedX = options.stretchedX,
            stretchedY = options.stretchedY,
            fabricOptions = _objectWithoutProperties(options, ["stretched", "stretchedX", "stretchedY"]);

        img.onload = function () {
          var imgObj = new fabric$5.Image(img);
          if (stretched || stretchedX) imgObj.scaleToWidth(canvas.width);
          if (stretched || stretchedY) imgObj.scaleToHeight(canvas.height);
          canvas.setBackgroundImage(imgObj, function () {
            return canvas.renderAll();
          }, fabricOptions);
        };

        img.src = dataUrl;
      });

      _defineProperty(_assertThisInitialized(_this), "addText", function (text) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var canvas = _this._fc;
        var iText = new fabric$5.IText(text, options);
        var opts = {
          left: (canvas.getWidth() - iText.width) * 0.5,
          top: (canvas.getHeight() - iText.height) * 0.5
        };
        Object.assign(options, opts);
        iText.set({
          'left': options.left,
          'top': options.top
        });
        canvas.add(iText);
      });

      _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
        var _this$props2 = _this.props,
            tool = _this$props2.tool,
            value = _this$props2.value,
            undoSteps = _this$props2.undoSteps,
            defaultValue = _this$props2.defaultValue,
            backgroundColor = _this$props2.backgroundColor;
        var canvas = _this._fc = new fabric$5.Canvas(_this._canvas
        /*, {
        preserveObjectStacking: false,
        renderOnAddRemove: false,
        skipTargetFind: true
        }*/
        );

        _this._initTools(canvas); // set initial backgroundColor


        _this._backgroundColor(backgroundColor);

        var selectedTool = _this._tools[tool];
        selectedTool.configureCanvas(_this.props);
        _this._selectedTool = selectedTool; // Control resize

        window.addEventListener('resize', _this._resize, false); // Initialize History, with maximum number of undo steps

        _this._history = new History(undoSteps); // Events binding

        canvas.on('object:added', _this._onObjectAdded);
        canvas.on('object:modified', _this._onObjectModified);
        canvas.on('object:removed', _this._onObjectRemoved);
        canvas.on('mouse:down', _this._onMouseDown);
        canvas.on('mouse:move', _this._onMouseMove);
        canvas.on('mouse:up', _this._onMouseUp);
        canvas.on('mouse:out', _this._onMouseOut);
        canvas.on('object:moving', _this._onObjectMoving);
        canvas.on('object:scaling', _this._onObjectScaling);
        canvas.on('object:rotating', _this._onObjectRotating); // IText Events fired on Adding Text
        // canvas.on("text:event:changed", console.log)
        // canvas.on("text:selection:changed", console.log)
        // canvas.on("text:editing:entered", console.log)
        // canvas.on("text:editing:exited", console.log)

        _this.disableTouchScroll();

        _this._resize(); // initialize canvas with controlled value if exists


        (value || defaultValue) && _this.fromJSON(value || defaultValue);
      });

      _defineProperty(_assertThisInitialized(_this), "componentWillUnmount", function () {
        return window.removeEventListener('resize', _this._resize);
      });

      _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (prevProps, prevState) {
        if (_this.props.width !== prevProps.width || _this.props.height !== prevProps.height) {
          _this._resize();
        }

        if (_this.props.tool !== prevProps.tool) {
          _this._selectedTool = _this._tools[_this.props.tool] || _this._tools[Tool.Pencil];
        } //Bring the cursor back to default if it is changed by a tool


        _this._fc.defaultCursor = 'default';

        _this._selectedTool.configureCanvas(_this.props);

        if (_this.props.backgroundColor !== prevProps.backgroundColor) {
          _this._backgroundColor(_this.props.backgroundColor);
        }

        if (_this.props.value !== prevProps.value || _this.props.value && _this.props.forceValue) {
          _this.fromJSON(_this.props.value);
        }
      });

      _defineProperty(_assertThisInitialized(_this), "render", function () {
        var _this$props3 = _this.props,
            className = _this$props3.className,
            style = _this$props3.style,
            width = _this$props3.width,
            height = _this$props3.height;
        var canvasDivStyle = Object.assign({}, style ? style : {}, width ? {
          width: width
        } : {}, height ? {
          height: height
        } : {
          height: 512
        });
        return React__default.createElement("div", {
          className: className,
          ref: function ref(c) {
            return _this._container = c;
          },
          style: canvasDivStyle
        }, React__default.createElement("canvas", {
          id: uuid4(),
          ref: function ref(c) {
            return _this._canvas = c;
          }
        }, "Sorry, Canvas HTML5 element is not supported by your browser :("));
      });

      return _this;
    }

    return SketchField;
  }(React.PureComponent);

  _defineProperty(SketchField, "propTypes", {
    // the color of the line
    lineColor: PropTypes.string,
    // The width of the line
    lineWidth: PropTypes.number,
    // the fill color of the shape when applicable
    fillColor: PropTypes.string,
    // the background color of the sketch
    backgroundColor: PropTypes.string,
    // the opacity of the object
    opacity: PropTypes.number,
    // number of undo/redo steps to maintain
    undoSteps: PropTypes.number,
    // The tool to use, can be pencil, rectangle, circle, brush;
    tool: PropTypes.string,
    // image format when calling toDataURL
    imageFormat: PropTypes.string,
    // Sketch data for controlling sketch from
    // outside the component
    value: PropTypes.object,
    // Set to true if you wish to force load the given value, even if it is  the same
    forceValue: PropTypes.bool,
    // Specify some width correction which will be applied on auto resize
    widthCorrection: PropTypes.number,
    // Specify some height correction which will be applied on auto resize
    heightCorrection: PropTypes.number,
    // Specify action on change
    onChange: PropTypes.func,
    // Default initial value
    defaultValue: PropTypes.object,
    // Sketch width
    width: PropTypes.number,
    // Sketch height
    height: PropTypes.number,
    // Class name to pass to container div of canvas
    className: PropTypes.string,
    // Style options to pass to container div of canvas
    style: PropTypes.object
  });

  _defineProperty(SketchField, "defaultProps", {
    lineColor: 'black',
    lineWidth: 10,
    fillColor: 'transparent',
    backgroundColor: 'transparent',
    opacity: 1.0,
    undoSteps: 25,
    tool: Tool.Pencil,
    widthCorrection: 2,
    heightCorrection: 0,
    forceValue: false
  });

  exports.SketchField = SketchField;
  exports.Tools = Tool;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
