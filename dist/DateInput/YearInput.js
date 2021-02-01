var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { getYear } from '@wojtekmaj/date-utils';

import Input from './Input';

import { isMaxDate, isMinDate, isValueType } from '../shared/propTypes';
import { safeMax, safeMin } from '../shared/utils';

export default function YearInput(_ref) {
  var maxDate = _ref.maxDate,
      minDate = _ref.minDate,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === undefined ? '----' : _ref$placeholder,
      valueType = _ref.valueType,
      otherProps = _objectWithoutProperties(_ref, ['maxDate', 'minDate', 'placeholder', 'valueType']);

  var maxYear = safeMin(275760, maxDate && getYear(maxDate));
  var minYear = safeMax(1, minDate && getYear(minDate));

  var yearStep = function () {
    if (valueType === 'century') {
      return 10;
    }

    return 1;
  }();

  return React.createElement(Input, _extends({
    max: maxYear,
    min: minYear,
    name: 'year',
    placeholder: placeholder,
    step: yearStep
  }, otherProps));
}

YearInput.propTypes = {
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
  value: PropTypes.number,
  valueType: isValueType
};