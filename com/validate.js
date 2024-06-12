import { ContentError, UnauthorizedError } from './errors.js';
import util from './util.js';
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/;
const URL_REGEX = /^(http|https):\/\//;
const validate = {
    text(text, explain = 'text', checkEmptySpaceInside) {
        if (typeof text !== 'string')
            throw new TypeError(`${explain} is not a string`);
        if (!text.trim().length) {
            throw new ContentError(`${explain} >${text}< is empty or blank`);
        }
        if (checkEmptySpaceInside)
            if (text.includes(' '))
                throw new ContentError(`${explain} has empty spaces`);
    },
    date(date, explain = 'date') {
        if (typeof date !== 'string')
            throw new ContentError(`${explain} ${date} is not a string`);
        if (!DATE_REGEX.test(date))
            throw new ContentError(`${explain} ${date} does not have a valid format`);
    },
    email(email, explain = "email") {
        if (!EMAIL_REGEX.test(email))
            throw new ContentError(`${explain} ${email} is not an email`);
    },
    password(password, explain = 'password') {
        if (!PASSWORD_REGEX.test(password))
            throw new ContentError(`${explain} is not valid`);
    },
    url(url, explain = 'url') {
        if (!URL_REGEX.test(url))
            throw new ContentError(`${explain} is not an url`);
    },
    callback(callback, explain = 'callback') {
        if (typeof callback !== 'function')
            throw new TypeError(`${explain} is not a function`);
    },
    token(token, explain = 'token') {
        if (typeof token !== 'string')
            throw new UnauthorizedError('session expired');
        const { exp } = util.extractJwtPayload(token);
        if (exp * 1000 < Date.now())
            throw new UnauthorizedError('session expired');
    },
    coords(coords, explain = 'coords') {
        if (!Array.isArray(coords) || coords.length !== 2 || !coords.every(coord => typeof coord === 'number')) {
            throw new ContentError(`${explain} must be two numbers`);
        }

        const [latitude, longitude] = coords;

        if (latitude < -90 || latitude > 90) {
            throw new ContentError(`${explain} latitude must be between -90 and 90`);
        }

        if (longitude < -180 || longitude > 180) {
            throw new ContentError(`${explain} longitude must be between -180 and 180`);
        }
    }
};
export default validate;

