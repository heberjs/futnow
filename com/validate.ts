import { ContentError, UnauthorizedError } from './errors'
import util from './util'


const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/
const URL_REGEX = /^(http|https):\/\//

const validate = {
    text(text: string, explain: string = 'text', checkEmptySpaceInside?) {
        if (typeof text !== 'string') throw new TypeError(`${explain} is not a string`)
        if (!text.trim().length) {
            throw new ContentError(`${explain} >${text}< is empty or blank`)

        }
        if (checkEmptySpaceInside)
            if (text.includes(' ')) throw new ContentError(`${explain} has empty spaces`)

    },

    date(date: string, explain: string = 'date') {
        if (typeof date !== 'string') throw new ContentError(`${explain} ${date} is not a string`)

        if (!DATE_REGEX.test(date)) throw new ContentError(`${explain} ${date} does not have a valid format`)
    },

    email(email: string, explain: string = "email") {
        if (!EMAIL_REGEX.test(email)) throw new ContentError(`${explain} ${email} is not an email`)
    },

    password(password: string, explain: string = 'password') {
        if (!PASSWORD_REGEX.test(password)) throw new ContentError(`${explain} is not valid`)
    },

    url(url: string, explain: string = 'url') {
        if (!URL_REGEX.test(url)) throw new ContentError(`${explain} is not an url`)
    },
    callback(callback: Function, explain: string = 'callback') {
        if (typeof callback !== 'function') throw new TypeError(`${explain} is not a function`)
    },
    token(token: string, explain: string = 'token') {
        if (typeof token !== 'string') throw new UnauthorizedError('session expired')

        const { exp } = util.extractJwtPayload(token)

        if (exp * 1000 < Date.now()) throw new UnauthorizedError('session expired')
    },
    coords(coords, explain = 'coords') {
        if (!Array.isArray(coords) || coords.length !== 2 || !coords.every(coord => typeof coord === 'number')) {
            throw new ContentError(`${explain} must be an array of two numbers`);
        }
    }




}

export default validate