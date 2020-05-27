import Message from '../components/Message';

const toShortFormat = dateParam => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  const day = dateParam.getDate();
  const monthIndex = dateParam.getMonth();
  const year = dateParam.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}`;
};

const returnTime = date => {
  const formattedDate = date.toDate();
  let hours = formattedDate.getHours().toString();
  // let finalHours = hours.length !== 2 ? '0' + hours : hours;
  let amPm = hours > 12 ? 'PM' : 'AM';
  let minutes = formattedDate.getMinutes().toString();
  let finalMinutes = minutes.length !== 2 ? '0' + minutes : minutes;

  return `${hours % 12}:${finalMinutes} ${amPm}`;
};

const returnDay = date => {
  const formattedDate = date.toDate();
  let today = new Date().getDay();

  if (today - formattedDate.getDay() === 0) return 'Today';
  else if (today - formattedDate.getDay() === 1) return 'Yesterday';
  else return toShortFormat(formattedDate);
};

const trimString = (text, len = 56) => {
  return text.length > len ? `${text.substr(0, len)}...` : text;
};

const getSecondsPassedSinceMidnight = date => {
  const currentDate = new Date();
  const dateArr = date.split(':');
  currentDate.setHours(dateArr[0], dateArr[1]);
  return Math.floor(
    (currentDate.getTime() - currentDate.setHours(0, 0, 0, 0)) / 1000
  );
};

/**
 * @param birthDate
 * @returns {number}
 */
const getAge = birthDate =>
  Math.floor((new Date() - new Date(birthDate * 1000).getTime()) / 3.15576e10);

/**
 * Get Time from seconds passed since midnight
 * @param storedTime
 * @returns {string}
 */
const getTimeFromSeconds = storedTime => {
  let hours = Math.floor(storedTime / 3600);
  const minutes = Math.floor((storedTime - hours * 3600) / 60);

  const amOrPm = hours >= 12 && hours < 24 ? 'pm' : 'am';
  hours = hours % 12 || 12;

  return (
    hours.toString().padStart(2, '0') +
    ':' +
    minutes.toString().padStart(2, '0') +
    ' ' +
    amOrPm
  );
};

/**
 * Get Time from seconds passed since midnight 24 hour format
 * @param storedTime
 * @returns {string}
 */
const getTimeFromSecondsIn24HourFormat = storedTime => {
  let hours = Math.floor(storedTime / 3600);
  const minutes = Math.floor((storedTime - hours * 3600) / 60);

  return (
    hours.toString().padStart(2, '0') +
    ':' +
    minutes.toString().padStart(2, '0')
  );
};


export {
  toShortFormat,
  returnTime,
  returnDay,
  trimString,
  getSecondsPassedSinceMidnight,
  getAge,
  getTimeFromSeconds,
  getTimeFromSecondsIn24HourFormat,
};
