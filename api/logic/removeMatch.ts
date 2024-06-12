import { validate, errors } from "com"
import { User, Match } from '../data/index.ts'




const { SystemError, NotFoundError, AuthError } = errors

function removeMatch(userId: string, matchId: string): Promise<void> {
    validate.text(userId, 'userId', true)
    validate.text(matchId, 'matchId', true)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not exist')
            if (user.role !== 'manager') throw new AuthError('user not allowed')

            return Match.findById(matchId)
                .catch(error => { throw new SystemError(error.message) })
                .then(match => {
                    if (!match) throw new NotFoundError('match not found')

                    if (match.manager.toString() !== user._id.toString())
                        throw new NotFoundError('match does not belong to user')

                    return Match.findByIdAndDelete(matchId)
                })
        })

}

export default removeMatch