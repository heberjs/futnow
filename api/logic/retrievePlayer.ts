import { Schema } from 'mongoose'

const { Types: { ObjectId } } = Schema

import { UserType, User } from '../data/index.ts'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors


function retrievePlayer(userId: string, targetUserId: string): Promise<{ fullname: string }> {
    validate.text(userId, 'userId', true)
    validate.text(targetUserId, 'targetUserId', true)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user.role !== 'player') throw new NotFoundError('player not found')

            return User.findById(targetUserId).select(' _id fullname role').lean().exec()
        })
        .then(targetUser => {
            if (targetUser.role !== 'player') throw new NotFoundError('target user not found')

            return { id: targetUser._id, fullname: targetUser.fullname }
        })
}

export default retrievePlayer