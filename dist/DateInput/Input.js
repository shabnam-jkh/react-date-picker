export { Input as default };
import React from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';
import updateInputWidth, { getFontShorthand } from 'update-input-width';

/* eslint-disable jsx-a11y/no-autofocus */

var isEdgeLegacy = typeof window !== 'undefined' && 'navigator' in window && navigator.userAgent.match(/ Edge\/1/);

function onFocus(event) {
  var target = event.target;


  if (isEdgeLegacy) {
    requestAnimationFrame(function () {
      return target.select();
    });
  } else {
    target.select();
  }
}

function updateInputWidthOnFontLoad(element) {
  if (!document.fonts) {
    return;
  }

  var font = getFontShorthand(element);

  if (!font) {
    return;
  }

  var isFontLoaded = document.fonts.check(font);

  if (isFontLoaded) {
    return;
  }

  function onLoadingDone() {
    updateInputWidth(element);
  }

  document.fonts.addEventListener('loadingdone', onLoadingDone);
}

function getSelectionString() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.getSelection().toString();
}

function makeOnKeyPress(maxLength) {
  return function onKeyPress(event) {
    var key = event.key,
        input = event.target;
    var value = input.value;


    var isNumberKey = !isNaN(parseInt(key, 10));
    var selection = getSelectionString();

    if (isNumberKey && (selection || value.length < maxLength)) {
      return;
    }

    event.preventDefault();
  };
}

function Input(_ref) {
  var ariaLabel = _ref.ariaLabel,
      autoFocus = _ref.autoFocus,
      className = _ref.className,
      disabled = _ref.disabled,
      itemRef = _ref.itemRef,
      max = _ref.max,
      min = _ref.min,
      name = _ref.name,
      nameForClass = _ref.nameForClass,
      onChange = _ref.onChange,
      onKeyDown = _ref.onKeyDown,
      _onKeyUp = _ref.onKeyUp,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === undefined ? '--' : _ref$placeholder,
      required = _ref.required,
      showLeadingZeros = _ref.showLeadingZeros,
      step = _ref.step,
      value = _ref.value;

  var hasLeadingZero = showLeadingZeros && value !== null && value < 10;
  var maxLength = max.toString().length;

  return [hasLeadingZero && React.createElement(
    'span',
    { key: 'leadingZero', className: className + '__leadingZero' },
    '0'
  ), React.createElement('input', {
    key: 'input',
    'aria-label': ariaLabel,
    autoComplete: 'off',
    autoFocus: autoFocus,
    className: mergeClassNames(className + '__input', className + '__' + (nameForClass || name), hasLeadingZero && className + '__input--hasLeadingZero'),
    'data-input': 'true',
    disabled: disabled,
    inputMode: 'numeric',
    max: max,
    min: min,
    name: name,
    onChange: onChange,
    onFocus: onFocus,
    onKeyDown: onKeyDown,
    onKeyPress: makeOnKeyPress(maxLength),
    onKeyUp: function onKeyUp(event) {
      updateInputWidth(event.target);

      if (_onKeyUp) {
        _onKeyUp(event);
      }
    },
    placeholder: placeholder,
    ref: function ref(_ref2) {
      if (_ref2) {
        updateInputWidth(_ref2);
        updateInputWidthOnFontLoad(_ref2);
      }

      if (itemRef) {
        itemRef(_ref2, name);
      }
    },
    required: required,
    step: step,
    type: 'number',
    value: value !== null ? value : ''
  })];
}

Input.propTypes = {
  ariaLabel: PropTypes.string,
  autoFocus: PropTypes.bool,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  itemRef: PropTypes.func,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string,
  nameForClass: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  showLeadingZeros: PropTypes.bool,
  step: PropTypes.number,
  value: PropTypes.number
};