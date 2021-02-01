var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';
import { getYear, getMonthHuman } from '@wojtekmaj/date-utils';

import { formatMonth, formatShortMonth } from '../shared/dateFormatter';
import { isMaxDate, isMinDate } from '../shared/propTypes';
import { safeMin, safeMax } from '../shared/utils';

export default function MonthSelect(_ref) {
  var ariaLabel = _ref.ariaLabel,
      className = _ref.className,
      itemRef = _ref.itemRef,
      locale = _ref.locale,
      maxDate = _ref.maxDate,
      minDate = _ref.minDate,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === undefined ? '--' : _ref$placeholder,
      short = _ref.short,
      value = _ref.value,
      year = _ref.year,
      otherProps = _objectWithoutProperties(_ref, ['ariaLabel', 'className', 'itemRef', 'locale', 'maxDate', 'minDate', 'placeholder', 'short', 'value', 'year']);

  function isSameYear(date) {
    return date && year === getYear(date);
  }

  var maxMonth = safeMin(12, isSameYear(maxDate) && getMonthHuman(maxDate));
  var minMonth = safeMax(1, isSameYear(minDate) && getMonthHuman(minDate));
  var dates = [].concat(_toConsumableArray(Array(12))).map(function (el, index) {
    return new Date(2019, index, 1);
  });
  var name = 'month';
  var formatter = short ? formatShortMonth : formatMonth;

  return React.createElement(
    'select',
    _extends({
      'aria-label': ariaLabel,
      className: mergeClassNames(className + '__input', className + '__' + name),
      'data-input': 'true',
      name: name,
      ref: function ref(_ref2) {
        if (itemRef) {
          itemRef(_ref2, name);
        }
      },
      value: value !== null ? value : ''
    }, otherProps),
    !value && React.createElement(
      'option',
      { value: '' },
      placeholder
    ),
    dates.map(function (date) {
      var month = getMonthHuman(date);
      var disabled = month < minMonth || month > maxMonth;

      return React.createElement(
        'option',
        {
          key: month,
          disabled: disabled,
          value: month
        },
        formatter(locale, date)
      );
    })
  );
}

MonthSelect.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  itemRef: PropTypes.func,
  locale: PropTypes.string,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  short: PropTypes.bool,
  value: PropTypes.number,
  year: PropTypes.number
};