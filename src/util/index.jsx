import { connect } from 'react-redux';
import { compose, getContext } from 'recompose';
import PropTypes from 'prop-types';

import { errors, hints } from './constants';

export const connectWithId = (...args) => compose(
  getContext({ id: PropTypes.string }),
  connect(...args),
);

export const toPercentage = (number, max) => 100 * (number / max);
export const toRelativePercentage = (number, max) => number * (max / 100);

export const traverseParentsUntilClassName = (currentElement, className) => {
  let element = currentElement;

  while (element.parentNode) {
    element = element.parentNode;

    if (element.className !== undefined &&
        element.className.includes(className)) {
      return element;
    }
  }
  return false;
};

export const updateObject = (existingObject, newValues) => ({
  ...existingObject,
  ...newValues,
});

export const noFormatSupportedError = context => ({
  context,
  message: errors.FORMAT_NO_SUPPORT,
  hint: hints.FORMAT_NO_SUPPORT,
});

export const urlNotSupportedError = context => ({
  context,
  message: errors.URL_NO_SUPPORT,
  hint: hints.URL_NO_SUPPORT,
});

export const urlNotSetError = context => ({
  context,
  message: errors.URL_NOT_SET,
  hint: hints.URL_NOT_SET,
});

export const getOffset = el => (
  {
    top: el.getBoundingClientRect().top + document.body.scrollTop,
    left: el.getBoundingClientRect().left + document.body.scrollLeft,
  }
);

export const getWidth = el => el.getBoundingClientRect().width;

export const getHeight = el => el.getBoundingClientRect().height;

export const limitValue = (value, min, max) => {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }
  return value;
};

// Some IOS versions don't allow manually changing volume or mute
export const canSetVolume = () => {
  const audio = new window.Audio();
  audio.volume = 0.5;

  return audio.volume === 0.5;
};

export const convertTime = (seconds, timeFormats) => {
  if (isNaN(seconds)) {
    return '';
  }
  const myTime = new Date(seconds * 1000);

  const hour = myTime.getUTCHours();
  const min = timeFormats.showHour ? myTime.getUTCMinutes() : myTime.getUTCMinutes() + (hour * 60);
  const sec = timeFormats.showMin ? myTime.getUTCSeconds() : myTime.getUTCSeconds() + (min * 60);
  const strHour = (timeFormats.padHour && hour < 10) ? `0${hour}` : hour;
  const strMin = (timeFormats.padMin && min < 10) ? `0${min}` : min;
  const strSec = (timeFormats.padSec && sec < 10) ? `0${sec}` : sec;

  let strTime = '';
  strTime += timeFormats.showHour ? strHour + timeFormats.sepHour : '';
  strTime += timeFormats.showMin ? strMin + timeFormats.sepMin : '';
  strTime += timeFormats.showSec ? strSec + timeFormats.sepSec : '';

  return strTime;
};
