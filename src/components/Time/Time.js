import React from 'react';
import PropTypes from 'prop-types';

const styles = require('./Time.scss');

const length2two = (num) => {
  if (num === 0) { return '00'; }
  if (num >= 10) { return `${num}`; }
  return `0${num}`;
};

const makeTimeString = (h, m, s) => {
  const ss = length2two(s);
  if (h === 0) { return `${m}:${ss}`; }
  const ms = length2two(m);
  return `${h}:${ms}:${ss}`;
};

const Time = ({ time }) => {
  let remaining = time;
  const hour = Math.floor(remaining / 3600);
  remaining -= hour * 3600;
  const minute = Math.floor(remaining / 60);
  remaining -= minute * 60;
  const second = Math.floor(remaining);
  const timeString = makeTimeString(hour, minute, second);
  return (
    <span className={styles.time}>{timeString}</span>
  );
};

Time.propTypes = {
  time: PropTypes.number.isRequired
};

export default Time;
