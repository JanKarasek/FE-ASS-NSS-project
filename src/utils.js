import moment from 'moment';

export const formatDateLong = (datetime) => {
    return moment(datetime).format('DD.MM.YYYY HH:mm:ss')
};

export const formatDateMinutes = (datetime) => {
    return moment(datetime).format('DD.MM.YYYY HH:mm')
};

export const formatDateShort = (datetime) => {
    return moment(datetime).format('DD.MM.YYYY')
};