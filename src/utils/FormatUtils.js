export const toCurrency = (value, currency, lang = navigator.language) => {
    return new Intl.NumberFormat(lang, { style: "currency", currency: currency }).format(value);
};