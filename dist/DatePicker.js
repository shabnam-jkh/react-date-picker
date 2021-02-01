var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import makeEventProps from 'make-event-props';
import mergeClassNames from 'merge-class-names';
import Calendar from 'react-calendar';
import Fit from 'react-fit';

import DateInput from './DateInput';

import { isMaxDate, isMinDate } from './shared/propTypes';

var baseClassName = 'react-date-picker';
var outsideActionEvents = ['mousedown', 'focusin', 'touchstart'];
var allViews = ['century', 'decade', 'year', 'month'];

var DatePicker = function (_PureComponent) {
  _inherits(DatePicker, _PureComponent);

  function DatePicker() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DatePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.onOutsideAction = function (event) {
      if (_this.wrapper && !_this.wrapper.contains(event.target)) {
        _this.closeCalendar();
      }
    }, _this.onChange = function (value) {
      var closeCalendar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props.closeCalendar;
      var onChange = _this.props.onChange;


      if (closeCalendar) {
        _this.closeCalendar();
      }

      if (onChange) {
        onChange(value);
      }
    }, _this.onFocus = function (event) {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          onFocus = _this$props.onFocus;


      if (onFocus) {
        onFocus(event);
      }

      // Internet Explorer still fires onFocus on disabled elements
      if (disabled) {
        return;
      }

      _this.openCalendar();
    }, _this.openCalendar = function () {
      _this.setState({ isOpen: true });
    }, _this.closeCalendar = function () {
      _this.setState(function (prevState) {
        if (!prevState.isOpen) {
          return null;
        }

        return { isOpen: false };
      });
    }, _this.toggleCalendar = function () {
      _this.setState(function (prevState) {
        return { isOpen: !prevState.isOpen };
      });
    }, _this.stopPropagation = function (event) {
      return event.stopPropagation();
    }, _this.clear = function () {
      return _this.onChange(null);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DatePicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleOutsideActionListeners();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var isOpen = this.state.isOpen;
      var _props = this.props,
          onCalendarClose = _props.onCalendarClose,
          onCalendarOpen = _props.onCalendarOpen;


      if (isOpen !== prevState.isOpen) {
        this.handleOutsideActionListeners();
        var callback = isOpen ? onCalendarOpen : onCalendarClose;
        if (callback) callback();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.handleOutsideActionListeners(false);
    }
  }, {
    key: 'handleOutsideActionListeners',
    value: function handleOutsideActionListeners(shouldListen) {
      var _this2 = this;

      var isOpen = this.state.isOpen;


      var shouldListenWithFallback = typeof shouldListen !== 'undefined' ? shouldListen : isOpen;
      var fnName = shouldListenWithFallback ? 'addEventListener' : 'removeEventListener';
      outsideActionEvents.forEach(function (eventName) {
        return document[fnName](eventName, _this2.onOutsideAction);
      });
    }
  }, {
    key: 'renderInputs',
    value: function renderInputs() {
      var _props2 = this.props,
          autoFocus = _props2.autoFocus,
          calendarAriaLabel = _props2.calendarAriaLabel,
          calendarIcon = _props2.calendarIcon,
          clearAriaLabel = _props2.clearAriaLabel,
          clearIcon = _props2.clearIcon,
          dayAriaLabel = _props2.dayAriaLabel,
          dayPlaceholder = _props2.dayPlaceholder,
          disableCalendar = _props2.disableCalendar,
          disabled = _props2.disabled,
          format = _props2.format,
          locale = _props2.locale,
          maxDate = _props2.maxDate,
          maxDetail = _props2.maxDetail,
          minDate = _props2.minDate,
          monthAriaLabel = _props2.monthAriaLabel,
          monthPlaceholder = _props2.monthPlaceholder,
          name = _props2.name,
          nativeInputAriaLabel = _props2.nativeInputAriaLabel,
          required = _props2.required,
          returnValue = _props2.returnValue,
          showLeadingZeros = _props2.showLeadingZeros,
          value = _props2.value,
          yearAriaLabel = _props2.yearAriaLabel,
          yearPlaceholder = _props2.yearPlaceholder;
      var isOpen = this.state.isOpen;

      var _concat = [].concat(value),
          _concat2 = _slicedToArray(_concat, 1),
          valueFrom = _concat2[0];

      var ariaLabelProps = {
        dayAriaLabel: dayAriaLabel,
        monthAriaLabel: monthAriaLabel,
        nativeInputAriaLabel: nativeInputAriaLabel,
        yearAriaLabel: yearAriaLabel
      };

      var placeholderProps = {
        dayPlaceholder: dayPlaceholder,
        monthPlaceholder: monthPlaceholder,
        yearPlaceholder: yearPlaceholder
      };

      return React.createElement(
        'div',
        { className: baseClassName + '__wrapper' },
        React.createElement(DateInput, _extends({}, ariaLabelProps, placeholderProps, {
          autoFocus: autoFocus,
          className: baseClassName + '__inputGroup',
          disabled: disabled,
          format: format,
          isCalendarOpen: isOpen,
          locale: locale,
          maxDate: maxDate,
          maxDetail: maxDetail,
          minDate: minDate,
          name: name,
          onChange: this.onChange,
          required: required,
          returnValue: returnValue,
          showLeadingZeros: showLeadingZeros,
          value: valueFrom
        })),
        clearIcon !== null && React.createElement(
          'button',
          {
            'aria-label': clearAriaLabel,
            className: baseClassName + '__clear-button ' + baseClassName + '__button',
            disabled: disabled,
            onClick: this.clear,
            onFocus: this.stopPropagation,
            type: 'button'
          },
          clearIcon
        ),
        calendarIcon !== null && !disableCalendar && React.createElement(
          'button',
          {
            'aria-label': calendarAriaLabel,
            className: baseClassName + '__calendar-button ' + baseClassName + '__button',
            disabled: disabled,
            onBlur: this.resetValue,
            onClick: this.toggleCalendar,
            onFocus: this.stopPropagation,
            type: 'button'
          },
          calendarIcon
        )
      );
    }
  }, {
    key: 'renderCalendar',
    value: function renderCalendar() {
      var disableCalendar = this.props.disableCalendar;
      var isOpen = this.state.isOpen;


      if (isOpen === null || disableCalendar) {
        return null;
      }

      var _props3 = this.props,
          calendarClassName = _props3.calendarClassName,
          datePickerClassName = _props3.className,
          onChange = _props3.onChange,
          value = _props3.value,
          calendarProps = _objectWithoutProperties(_props3, ['calendarClassName', 'className', 'onChange', 'value']);

      var className = baseClassName + '__calendar';

      return React.createElement(
        Fit,
        null,
        React.createElement(
          'div',
          { className: mergeClassNames(className, className + '--' + (isOpen ? 'open' : 'closed')) },
          React.createElement(Calendar, _extends({
            className: calendarClassName,
            onChange: this.onChange,
            value: value || null
          }, calendarProps))
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props4 = this.props,
          className = _props4.className,
          disabled = _props4.disabled;
      var isOpen = this.state.isOpen;


      return React.createElement(
        'div',
        _extends({
          className: mergeClassNames(baseClassName, baseClassName + '--' + (isOpen ? 'open' : 'closed'), baseClassName + '--' + (disabled ? 'disabled' : 'enabled'), className)
        }, this.eventProps, {
          onFocus: this.onFocus,
          ref: function ref(_ref2) {
            if (!_ref2) {
              return;
            }

            _this3.wrapper = _ref2;
          }
        }),
        this.renderInputs(),
        this.renderCalendar()
      );
    }
  }, {
    key: 'eventProps',
    get: function get() {
      return makeEventProps(this.props);
    }

    // eslint-disable-next-line react/destructuring-assignment

  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.isOpen !== prevState.isOpenProps) {
        return {
          isOpen: nextProps.isOpen,
          isOpenProps: nextProps.isOpen
        };
      }

      return null;
    }
  }]);

  return DatePicker;
}(PureComponent);

export default DatePicker;


var iconProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 19,
  height: 19,
  viewBox: '0 0 19 19',
  stroke: 'black',
  strokeWidth: 2
};

var CalendarIcon = React.createElement(
  'svg',
  _extends({}, iconProps, {
    className: baseClassName + '__calendar-button__icon ' + baseClassName + '__button__icon'
  }),
  React.createElement('rect', { fill: 'none', height: '15', width: '15', x: '2', y: '2' }),
  React.createElement('line', { x1: '6', x2: '6', y1: '0', y2: '4' }),
  React.createElement('line', { x1: '13', x2: '13', y1: '0', y2: '4' })
);

var ClearIcon = React.createElement(
  'svg',
  _extends({}, iconProps, {
    className: baseClassName + '__clear-button__icon ' + baseClassName + '__button__icon'
  }),
  React.createElement('line', { x1: '4', x2: '15', y1: '4', y2: '15' }),
  React.createElement('line', { x1: '15', x2: '4', y1: '4', y2: '15' })
);

DatePicker.defaultProps = {
  calendarIcon: CalendarIcon,
  clearIcon: ClearIcon,
  closeCalendar: true,
  isOpen: null,
  returnValue: 'start'
};

var isValue = PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]);

DatePicker.propTypes = {
  autoFocus: PropTypes.bool,
  calendarAriaLabel: PropTypes.string,
  calendarClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  calendarIcon: PropTypes.node,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  clearAriaLabel: PropTypes.string,
  clearIcon: PropTypes.node,
  closeCalendar: PropTypes.bool,
  dayAriaLabel: PropTypes.string,
  dayPlaceholder: PropTypes.string,
  disableCalendar: PropTypes.bool,
  disabled: PropTypes.bool,
  format: PropTypes.string,
  isOpen: PropTypes.bool,
  locale: PropTypes.string,
  maxDate: isMaxDate,
  maxDetail: PropTypes.oneOf(allViews),
  minDate: isMinDate,
  monthAriaLabel: PropTypes.string,
  monthPlaceholder: PropTypes.string,
  name: PropTypes.string,
  nativeInputAriaLabel: PropTypes.string,
  onCalendarClose: PropTypes.func,
  onCalendarOpen: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  required: PropTypes.bool,
  returnValue: PropTypes.oneOf(['start', 'end', 'range']),
  showLeadingZeros: PropTypes.bool,
  value: PropTypes.oneOfType([isValue, PropTypes.arrayOf(isValue)]),
  yearAriaLabel: PropTypes.string,
  yearPlaceholder: PropTypes.string
};