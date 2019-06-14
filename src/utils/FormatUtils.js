import dateFormat from 'dateformat';

const ISO_UTC_FORMAT = "isoUtcDateTime";
const STYLE_CURRENCY = "currency";

export const toCurrency = (value, currency, lang = navigator.language) => {
    return new Intl.NumberFormat(lang, {style: STYLE_CURRENCY, currency: currency}).format(value);
};

export const dateToIsoUTC = (date) => {
    return dateFormat(date, ISO_UTC_FORMAT);
};