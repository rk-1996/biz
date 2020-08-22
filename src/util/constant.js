import moment from 'moment';

export const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thrusday',
  'Friday',
  'Saturday',
  'Sunday'
]

export const w4Doc = require('assets/documents/2020 W4.pdf');

export const dateFormat = (date) => {
  return moment(date).format('DD/MM/YYYY');
}

export const dateTimeFormat = (date) => {
  return moment(date).format('DD/MM/YYYY @ HH:MM:SS');
}

export const mobileFormat = (text) => {
  return text.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
}
