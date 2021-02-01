var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { getYear, getMonthHuman, getDate, getDaysInMonth } from '@wojtekmaj/date-utils';

import Input from './Input';

import { isMaxDate, isMinDate } from '../shared/propTypes';
import { safeMin, safeMax } from '../shared/utils';

export default function DayInput(_ref) {
  var maxDate = _ref.maxDate,
      minDate = _ref.minDate,
      month = _ref.month,
      year = _ref.year,
      otherProps = _objectWithoutProperties(_ref, ['maxDate', 'minDate', 'month', 'year']);

  var currentMonthMaxDays = function () {
    if (!month) {
      return 31;
    }

    return getDaysInMonth(new Date(year, month - 1, 1));
  }();

  function isSameMonth(date) {
    return date && year === getYear(date) && month === getMonthHuman(date);
  }

  var maxDay = safeMin(currentMonthMaxDays, isSameMonth(maxDate) && getDate(maxDate));
  var minDay = safeMax(1, isSameMonth(minDate) && getDate(minDate));

  return React.createElement(Input, _extends({
    max: maxDay,
    min: minDay,
    name: 'day'
  }, otherProps));
}

DayInput.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  itemRef: PropTypes.func,
  maxDate: isMaxDate,
  minDate: isMinDate,
  month: PropTypes.number,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  showLeadingZeros: PropTypes.bool,
  value: PropTypes.number,
  year: PropTypes.number
};