import { Schema } from 'mongoose'

const { Types: { ObjectId } } = Schema

import { UserType, User } from '../data/index.ts'

import { validate, errors } from 'com'

const { AuthError, SystemError } = errors


function retrieveOwnPlayer(userId: string): Promise<{ fullname: string }> {
    validate.text(userId, 'userId', true)

    return User.findById(userId).lean().exec()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {

            if (user.role !== 'player') throw new AuthError('Permission denied')

            return { fullname: user.fullname }
        })
}

export default retrieveOwnPlayer