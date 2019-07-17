import dateFormat from 'dateformat';

const ISO_UTC_FORMAT = "isoUtcDateTime";
const HOUR_MIN_FORMAT = "HH:MM";
const DAY_MON_YEAR_FORMAT = "dd/mm/yyyy";

const STYLE_CURRENCY = "currency";

export const toCurrency = (value, currency, lang = navigator.language) => {
    return new Intl.NumberFormat(lang, {style: STYLE_CURRENCY, currency: currency}).format(value);
};

export const dateToIsoUTC = (date) => {
    return dateFormat(date, ISO_UTC_FORMAT);
};

export const datetimeToDayMonYearHourMin = (date) => {
    return dateFormat(date, `${DAY_MON_YEAR_FORMAT} ${HOUR_MIN_FORMAT}`);
};

export const datetimeToDayMonYear = (date) => {
    return dateFormat(date, DAY_MON_YEAR_FORMAT);
};

export const datetimeToHourMin = (date) => {
    return dateFormat(date, HOUR_MIN_FORMAT);
};