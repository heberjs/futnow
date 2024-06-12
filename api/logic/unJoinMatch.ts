

import { validate, errors } from "com"
import { Match, User } from "../data/index.ts"
const { SystemError, NotFoundError } = errors

function unJoinMatch(userId: string, matchId: string): Promise<any> {
    validate.text(userId, 'userId', true)
    validate.text(matchId, 'matchId', true)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not exist')

            return Match.findOneAndUpdate(
                { _id: matchId },
                { $pull: { players: userId } },
                { new: true }
            )
                .catch(error => { throw new SystemError(error.message) })

        })
        .then(() => { })

}

export default unJoinMatch