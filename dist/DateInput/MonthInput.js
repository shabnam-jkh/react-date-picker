var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { getYear, getMonthHuman } from '@wojtekmaj/date-utils';

import Input from './Input';

import { isMaxDate, isMinDate } from '../shared/propTypes';
import { safeMin, safeMax } from '../shared/utils';

export default function MonthInput(_ref) {
  var maxDate = _ref.maxDate,
      minDate = _ref.minDate,
      year = _ref.year,
      otherProps = _objectWithoutProperties(_ref, ['maxDate', 'minDate', 'year']);

  function isSameYear(date) {
    return date && year === getYear(date);
  }

  var maxMonth = safeMin(12, isSameYear(maxDate) && getMonthHuman(maxDate));
  var minMonth = safeMax(1, isSameYear(minDate) && getMonthHuman(minDate));

  return React.createElement(Input, _extends({
    max: maxMonth,
    min: minMonth,
    name: 'month'
  }, otherProps));
}

MonthInput.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  itemRef: PropTypes.func,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  showLeadingZeros: PropTypes.bool,
  value: PropTypes.number,
  year: PropTypes.number
};