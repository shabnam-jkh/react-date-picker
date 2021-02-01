import getUserLocale from 'get-user-locale';

export function getFormatter(options) {
  return function (locale, date) {
    return date.toLocaleString(locale || getUserLocale(), options);
  };
}

/**
 * Changes the hour in a Date to ensure right date formatting even if DST is messed up.
 * Workaround for bug in WebKit and Firefox with historical dates.
 * For more details, see:
 * https://bugs.chromium.org/p/chromium/issues/detail?id=750465
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1385643
 *
 * @param {Date} date Date.
 */
function toSafeHour(date) {
  var safeDate = new Date(date);
  return new Date(safeDate.setHours(12));
}

function getSafeFormatter(options) {
  return function (locale, date) {
    return getFormatter(options)(locale, toSafeHour(date));
  };
}

var formatMonthOptions = { month: 'long' };
var formatShortMonthOptions = { month: 'short' };

export var formatMonth = getSafeFormatter(formatMonthOptions);
export var formatShortMonth = getSafeFormatter(formatShortMonthOptions);