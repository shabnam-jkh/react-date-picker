var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getYear, getMonthHuman, getDate } from '@wojtekmaj/date-utils';

import Divider from './Divider';
import DayInput from './DateInput/DayInput';
import MonthInput from './DateInput/MonthInput';
import MonthSelect from './DateInput/MonthSelect';
import YearInput from './DateInput/YearInput';
import NativeInput from './DateInput/NativeInput';

import { getFormatter } from './shared/dateFormatter';
import { getBegin, getEnd } from './shared/dates';
import { isMaxDate, isMinDate } from './shared/propTypes';
import { between } from './shared/utils';

var defaultMinDate = new Date();
defaultMinDate.setFullYear(1, 0, 1);
defaultMinDate.setHours(0, 0, 0, 0);
var defaultMaxDate = new Date(8.64e15);
var allViews = ['century', 'decade', 'year', 'month'];
var allValueTypes = [].concat(_toConsumableArray(allViews.slice(1)), ['day']);

function toDate(value) {
  if (value instanceof Date) {
    return value;
  }

  return new Date(value);
}

function datesAreDifferent(date1, date2) {
  return date1 && !date2 || !date1 && date2 || date1 && date2 && date1.getTime() !== date2.getTime();
}

/**
 * Returns value type that can be returned with currently applied settings.
 */
function getValueType(maxDetail) {
  return allValueTypes[allViews.indexOf(maxDetail)];
}

function getValue(value, index) {
  if (!value) {
    return null;
  }

  var rawValue = Array.isArray(value) && value.length === 2 ? value[index] : value;

  if (!rawValue) {
    return null;
  }

  var valueDate = toDate(rawValue);

  if (isNaN(valueDate.getTime())) {
    throw new Error('Invalid date: ' + value);
  }

  return valueDate;
}

function getDetailValue(_ref, index) {
  var value = _ref.value,
      minDate = _ref.minDate,
      maxDate = _ref.maxDate,
      maxDetail = _ref.maxDetail;

  var valuePiece = getValue(value, index);

  if (!valuePiece) {
    return null;
  }

  var valueType = getValueType(maxDetail);
  var detailValueFrom = [getBegin, getEnd][index](valueType, valuePiece);

  return between(detailValueFrom, minDate, maxDate);
}

var getDetailValueFrom = function getDetailValueFrom(args) {
  return getDetailValue(args, 0);
};

var getDetailValueTo = function getDetailValueTo(args) {
  return getDetailValue(args, 1);
};

var getDetailValueArray = function getDetailValueArray(args) {
  var value = args.value;


  if (Array.isArray(value)) {
    return value;
  }

  return [getDetailValueFrom, getDetailValueTo].map(function (fn) {
    return fn(args);
  });
};

function isInternalInput(element) {
  return element.getAttribute('data-input') === 'true';
}

function findInput(element, property) {
  var nextElement = element;
  do {
    nextElement = nextElement[property];
  } while (nextElement && !isInternalInput(nextElement));
  return nextElement;
}

function focus(element) {
  if (element) {
    element.focus();
  }
}

function _renderCustomInputs(placeholder, elementFunctions, allowMultipleInstances) {
  var usedFunctions = [];
  var pattern = new RegExp(Object.keys(elementFunctions).map(function (el) {
    return el + '+';
  }).join('|'), 'g');
  var matches = placeholder.match(pattern);

  return placeholder.split(pattern).reduce(function (arr, element, index) {
    var divider = element &&
    // eslint-disable-next-line react/no-array-index-key
    React.createElement(
      Divider,
      { key: 'separator_' + index },
      element
    );
    var res = [].concat(_toConsumableArray(arr), [divider]);
    var currentMatch = matches && matches[index];

    if (currentMatch) {
      var renderFunction = elementFunctions[currentMatch] || elementFunctions[Object.keys(elementFunctions).find(function (elementFunction) {
        return currentMatch.match(elementFunction);
      })];

      if (!allowMultipleInstances && usedFunctions.includes(renderFunction)) {
        res.push(currentMatch);
      } else {
        res.push(renderFunction(currentMatch, index));
        usedFunctions.push(renderFunction);
      }
    }
    return res;
  }, []);
}

var DateInput = function (_PureComponent) {
  _inherits(DateInput, _PureComponent);

  function DateInput() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, DateInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
      year: null,
      month: null,
      day: null
    }, _this.onClick = function (event) {
      if (event.target === event.currentTarget) {
        // Wrapper was directly clicked
        var firstInput = event.target.children[1];
        focus(firstInput);
      }
    }, _this.onKeyDown = function (event) {
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
        case _this.divider:
          {
            event.preventDefault();

            var input = event.target;

            var property = event.key === 'ArrowLeft' ? 'previousElementSibling' : 'nextElementSibling';
            var nextInput = findInput(input, property);
            focus(nextInput);
            break;
          }
        default:
      }
    }, _this.onKeyUp = function (event) {
      var key = event.key,
          input = event.target;


      var isNumberKey = !isNaN(parseInt(key, 10));

      if (!isNumberKey) {
        return;
      }

      var value = input.value;

      var max = input.getAttribute('max');

      /**
       * Given 1, the smallest possible number the user could type by adding another digit is 10.
       * 10 would be a valid value given max = 12, so we won't jump to the next input.
       * However, given 2, smallers possible number would be 20, and thus keeping the focus in
       * this field doesn't make sense.
       */
      if (value * 10 > max || value.length >= max.length) {
        var property = 'nextElementSibling';
        var nextInput = findInput(input, property);
        focus(nextInput);
      }
    }, _this.onChange = function (event) {
      var _event$target = event.target,
          name = _event$target.name,
          value = _event$target.value;


      _this.setState(_defineProperty({}, name, value ? parseInt(value, 10) : null), _this.onChangeExternal);
    }, _this.onChangeNative = function (event) {
      var onChange = _this.props.onChange;
      var value = event.target.value;


      if (!onChange) {
        return;
      }

      var processedValue = function () {
        if (!value) {
          return null;
        }

        var _value$split = value.split('-'),
            _value$split2 = _slicedToArray(_value$split, 3),
            yearString = _value$split2[0],
            monthString = _value$split2[1],
            dayString = _value$split2[2];

        var year = parseInt(yearString, 10);
        var monthIndex = parseInt(monthString, 10) - 1 || 0;
        var day = parseInt(dayString, 10) || 1;

        var proposedValue = new Date();
        proposedValue.setFullYear(year, monthIndex, day);
        proposedValue.setHours(0, 0, 0, 0);

        return proposedValue;
      }();

      onChange(processedValue, false);
    }, _this.onChangeExternal = function () {
      var onChange = _this.props.onChange;


      if (!onChange) {
        return;
      }

      var formElements = [_this.dayInput, _this.monthInput, _this.yearInput].filter(Boolean);

      var values = {};
      formElements.forEach(function (formElement) {
        values[formElement.name] = formElement.value;
      });

      if (formElements.every(function (formElement) {
        return !formElement.value;
      })) {
        onChange(null, false);
      } else if (formElements.every(function (formElement) {
        return formElement.value && formElement.validity.valid;
      })) {
        var year = parseInt(values.year, 10);
        var monthIndex = parseInt(values.month, 10) - 1 || 0;
        var day = parseInt(values.day || 1, 10);

        var proposedValue = new Date();
        proposedValue.setFullYear(year, monthIndex, day);
        proposedValue.setHours(0, 0, 0, 0);
        var processedValue = _this.getProcessedValue(proposedValue);
        onChange(processedValue, false);
      }
    }, _this.renderDay = function (currentMatch, index) {
      var _this$props = _this.props,
          autoFocus = _this$props.autoFocus,
          dayAriaLabel = _this$props.dayAriaLabel,
          dayPlaceholder = _this$props.dayPlaceholder,
          showLeadingZeros = _this$props.showLeadingZeros;
      var _this$state = _this.state,
          day = _this$state.day,
          month = _this$state.month,
          year = _this$state.year;


      if (currentMatch && currentMatch.length > 2) {
        throw new Error('Unsupported token: ' + currentMatch);
      }

      var showLeadingZerosFromFormat = currentMatch && currentMatch.length === 2;

      return React.createElement(DayInput, _extends({
        key: 'day'
      }, _this.commonInputProps, {
        ariaLabel: dayAriaLabel,
        autoFocus: index === 0 && autoFocus,
        month: month,
        placeholder: dayPlaceholder,
        showLeadingZeros: showLeadingZerosFromFormat || showLeadingZeros,
        value: day,
        year: year
      }));
    }, _this.renderMonth = function (currentMatch, index) {
      var _this$props2 = _this.props,
          autoFocus = _this$props2.autoFocus,
          locale = _this$props2.locale,
          monthAriaLabel = _this$props2.monthAriaLabel,
          monthPlaceholder = _this$props2.monthPlaceholder,
          showLeadingZeros = _this$props2.showLeadingZeros;
      var _this$state2 = _this.state,
          month = _this$state2.month,
          year = _this$state2.year;


      if (currentMatch && currentMatch.length > 4) {
        throw new Error('Unsupported token: ' + currentMatch);
      }

      if (currentMatch.length > 2) {
        return React.createElement(MonthSelect, _extends({
          key: 'month'
        }, _this.commonInputProps, {
          ariaLabel: monthAriaLabel,
          autoFocus: index === 0 && autoFocus,
          locale: locale,
          placeholder: monthPlaceholder,
          short: currentMatch.length === 3,
          value: month,
          year: year
        }));
      }

      var showLeadingZerosFromFormat = currentMatch && currentMatch.length === 2;

      return React.createElement(MonthInput, _extends({
        key: 'month'
      }, _this.commonInputProps, {
        ariaLabel: monthAriaLabel,
        autoFocus: index === 0 && autoFocus,
        placeholder: monthPlaceholder,
        showLeadingZeros: showLeadingZerosFromFormat || showLeadingZeros,
        value: month,
        year: year
      }));
    }, _this.renderYear = function (currentMatch, index) {
      var _this$props3 = _this.props,
          autoFocus = _this$props3.autoFocus,
          yearAriaLabel = _this$props3.yearAriaLabel,
          yearPlaceholder = _this$props3.yearPlaceholder;
      var year = _this.state.year;


      return React.createElement(YearInput, _extends({
        key: 'year'
      }, _this.commonInputProps, {
        ariaLabel: yearAriaLabel,
        autoFocus: index === 0 && autoFocus,
        placeholder: yearPlaceholder,
        value: year,
        valueType: _this.valueType
      }));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateInput, [{
    key: 'getProcessedValue',


    /**
     * Gets current value in a desired format.
     */
    value: function getProcessedValue(value) {
      var _props = this.props,
          minDate = _props.minDate,
          maxDate = _props.maxDate,
          maxDetail = _props.maxDetail,
          returnValue = _props.returnValue;


      var processFunction = function () {
        switch (returnValue) {
          case 'start':
            return getDetailValueFrom;
          case 'end':
            return getDetailValueTo;
          case 'range':
            return getDetailValueArray;
          default:
            throw new Error('Invalid returnValue.');
        }
      }();

      return processFunction({
        value: value, minDate: minDate, maxDate: maxDate, maxDetail: maxDetail
      });
    }
  }, {
    key: 'renderCustomInputs',
    value: function renderCustomInputs() {
      var placeholder = this.placeholder;
      var format = this.props.format;


      var elementFunctions = {
        d: this.renderDay,
        M: this.renderMonth,
        y: this.renderYear
      };

      var allowMultipleInstances = typeof format !== 'undefined';
      return _renderCustomInputs(placeholder, elementFunctions, allowMultipleInstances);
    }
  }, {
    key: 'renderNativeInput',
    value: function renderNativeInput() {
      var _props2 = this.props,
          disabled = _props2.disabled,
          maxDate = _props2.maxDate,
          minDate = _props2.minDate,
          name = _props2.name,
          nativeInputAriaLabel = _props2.nativeInputAriaLabel,
          required = _props2.required;
      var value = this.state.value;


      return React.createElement(NativeInput, {
        key: 'date',
        ariaLabel: nativeInputAriaLabel,
        disabled: disabled,
        maxDate: maxDate || defaultMaxDate,
        minDate: minDate || defaultMinDate,
        name: name,
        onChange: this.onChangeNative,
        required: required,
        value: value,
        valueType: this.valueType
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var className = this.props.className;

      /* eslint-disable jsx-a11y/click-events-have-key-events */
      /* eslint-disable jsx-a11y/no-static-element-interactions */

      return React.createElement(
        'div',
        {
          className: className,
          onClick: this.onClick
        },
        this.renderNativeInput(),
        this.renderCustomInputs()
      );
    }
  }, {
    key: 'formatDate',
    get: function get() {
      var maxDetail = this.props.maxDetail;


      var options = { year: 'numeric' };
      var level = allViews.indexOf(maxDetail);
      if (level >= 2) {
        options.month = 'numeric';
      }
      if (level >= 3) {
        options.day = 'numeric';
      }

      return getFormatter(options);
    }
  }, {
    key: 'divider',
    get: function get() {
      var dividers = this.placeholder.match(/[^0-9a-z]/i);
      return dividers ? dividers[0] : null;
    }
  }, {
    key: 'placeholder',
    get: function get() {
      var _props3 = this.props,
          format = _props3.format,
          locale = _props3.locale;


      if (format) {
        return format;
      }

      var year = 2017;
      var monthIndex = 11;
      var day = 11;

      var date = new Date(year, monthIndex, day);
      var formattedDate = this.formatDate(locale, date);

      var datePieces = ['year', 'month', 'day'];
      var datePieceReplacements = ['y', 'M', 'd'];

      function formatDatePiece(name, dateToFormat) {
        return getFormatter(_defineProperty({ useGrouping: false }, name, 'numeric'))(locale, dateToFormat).match(/\d{1,}/);
      }

      var placeholder = formattedDate;
      datePieces.forEach(function (datePiece, index) {
        var formattedDatePiece = formatDatePiece(datePiece, date);
        var datePieceReplacement = datePieceReplacements[index];
        placeholder = placeholder.replace(formattedDatePiece, datePieceReplacement);
      });

      return placeholder;
    }
  }, {
    key: 'commonInputProps',
    get: function get() {
      var _this2 = this;

      var _props4 = this.props,
          className = _props4.className,
          disabled = _props4.disabled,
          isCalendarOpen = _props4.isCalendarOpen,
          maxDate = _props4.maxDate,
          minDate = _props4.minDate,
          required = _props4.required;


      return {
        className: className,
        disabled: disabled,
        maxDate: maxDate || defaultMaxDate,
        minDate: minDate || defaultMinDate,
        onChange: this.onChange,
        onKeyDown: this.onKeyDown,
        onKeyUp: this.onKeyUp,
        // This is only for showing validity when editing
        required: required || isCalendarOpen,
        itemRef: function itemRef(ref, name) {
          // Save a reference to each input field
          _this2[name + 'Input'] = ref;
        }
      };
    }
  }, {
    key: 'valueType',
    get: function get() {
      var maxDetail = this.props.maxDetail;


      return getValueType(maxDetail);
    }

    /**
     * Called when non-native date input is changed.
     */


    /**
     * Called when native date input is changed.
     */


    /**
     * Called after internal onChange. Checks input validity. If all fields are valid,
     * calls props.onChange.
     */

  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var minDate = nextProps.minDate,
          maxDate = nextProps.maxDate,
          maxDetail = nextProps.maxDetail;


      var nextState = {};

      /**
       * If isCalendarOpen flag has changed, we have to update it.
       * It's saved in state purely for use in getDerivedStateFromProps.
       */
      if (nextProps.isCalendarOpen !== prevState.isCalendarOpen) {
        nextState.isCalendarOpen = nextProps.isCalendarOpen;
      }

      /**
       * If the next value is different from the current one  (with an exception of situation in
       * which values provided are limited by minDate and maxDate so that the dates are the same),
       * get a new one.
       */
      var nextValue = getDetailValueFrom({
        value: nextProps.value, minDate: minDate, maxDate: maxDate, maxDetail: maxDetail
      });
      var values = [nextValue, prevState.value];
      if (
      // Toggling calendar visibility resets values
      nextState.isCalendarOpen // Flag was toggled
      || datesAreDifferent.apply(undefined, _toConsumableArray(values.map(function (value) {
        return getDetailValueFrom({
          value: value, minDate: minDate, maxDate: maxDate, maxDetail: maxDetail
        });
      }))) || datesAreDifferent.apply(undefined, _toConsumableArray(values.map(function (value) {
        return getDetailValueTo({
          value: value, minDate: minDate, maxDate: maxDate, maxDetail: maxDetail
        });
      })))) {
        if (nextValue) {
          nextState.year = getYear(nextValue);
          nextState.month = getMonthHuman(nextValue);
          nextState.day = getDate(nextValue);
        } else {
          nextState.year = null;
          nextState.month = null;
          nextState.day = null;
        }
        nextState.value = nextValue;
      }

      return nextState;
    }
  }]);

  return DateInput;
}(PureComponent);

export default DateInput;


DateInput.defaultProps = {
  maxDetail: 'month',
  name: 'date',
  returnValue: 'start'
};

var isValue = PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]);

DateInput.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string.isRequired,
  dayAriaLabel: PropTypes.string,
  dayPlaceholder: PropTypes.string,
  disabled: PropTypes.bool,
  format: PropTypes.string,
  isCalendarOpen: PropTypes.bool,
  locale: PropTypes.string,
  maxDate: isMaxDate,
  maxDetail: PropTypes.oneOf(allViews),
  minDate: isMinDate,
  monthAriaLabel: PropTypes.string,
  monthPlaceholder: PropTypes.string,
  name: PropTypes.string,
  nativeInputAriaLabel: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  returnValue: PropTypes.oneOf(['start', 'end', 'range']),
  showLeadingZeros: PropTypes.bool,
  value: PropTypes.oneOfType([isValue, PropTypes.arrayOf(isValue)]),
  yearAriaLabel: PropTypes.string,
  yearPlaceholder: PropTypes.string
};