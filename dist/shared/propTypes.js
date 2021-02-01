var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import PropTypes from 'prop-types';

var allViews = ['century', 'decade', 'year', 'month'];
var allValueTypes = [].concat(_toConsumableArray(allViews.slice(1)), ['day']);

export var isValueType = PropTypes.oneOf(allValueTypes);

export var isMinDate = function isMinDate(props, propName, componentName) {
  var minDate = props[propName];


  if (!minDate) {
    return null;
  }

  if (!(minDate instanceof Date)) {
    return new Error('Invalid prop `' + propName + '` of type `' + (typeof minDate === 'undefined' ? 'undefined' : _typeof(minDate)) + '` supplied to `' + componentName + '`, expected instance of `Date`.');
  }

  var maxDate = props.maxDate;


  if (maxDate && minDate > maxDate) {
    return new Error('Invalid prop `' + propName + '` of type `' + (typeof minDate === 'undefined' ? 'undefined' : _typeof(minDate)) + '` supplied to `' + componentName + '`, minDate cannot be larger than maxDate.');
  }

  return null;
};

export var isMaxDate = function isMaxDate(props, propName, componentName) {
  var maxDate = props[propName];


  if (!maxDate) {
    return null;
  }

  if (!(maxDate instanceof Date)) {
    return new Error('Invalid prop `' + propName + '` of type `' + (typeof maxDate === 'undefined' ? 'undefined' : _typeof(maxDate)) + '` supplied to `' + componentName + '`, expected instance of `Date`.');
  }

  var minDate = props.minDate;


  if (minDate && maxDate < minDate) {
    return new Error('Invalid prop `' + propName + '` of type `' + (typeof maxDate === 'undefined' ? 'undefined' : _typeof(maxDate)) + '` supplied to `' + componentName + '`, maxDate cannot be smaller than minDate.');
  }

  return null;
};