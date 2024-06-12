import mongoose from "mongoose"

import { validate, errors } from "com"
import { User, Match } from "../data/index.ts"

const { NotFoundError, DuplicityError, SystemError, LimitError } = errors

function joinMatch(matchId, userId) {
    validate.text(userId, 'userId', true)
    validate.text(matchId, 'matchId', true)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Match.findById(matchId)
                .catch(error => { throw new SystemError(error.message) })
                .then(match => {
                    if (!match) throw new NotFoundError('match not found')
                    if (match.players.includes(userId)) throw new DuplicityError('user already exists')
                    if (match.players.length >= 10) throw new LimitError('match is already full')

                    return Match.updateOne({ _id: matchId }, { $push: { players: userId } })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })

        })
}

export default joinMatch