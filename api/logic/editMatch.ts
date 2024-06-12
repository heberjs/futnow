import { validate, errors } from "com"
import { User, Match } from '../data/index.ts'
const { AuthError, NotFoundError, SystemError } = errors

function editMatch(userId: string, matchId: string, title: string, description: string, date: string) {
    validate.text(userId, 'userId', true)
    validate.text(matchId, 'matchId', true)
    validate.text(title, 'title')
    validate.text(description, 'description')
    validate.text(date, 'date')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(manager => {

            if (!manager) throw new NotFoundError('manager not found')
            if (manager.role !== 'manager') throw new AuthError('manager not allowed')

            return Match.updateOne({ _id: matchId, manager: userId }, {
                $set: {
                    title,
                    description,
                    date: new Date(date)
                }
            })
                .catch(error => { throw new SystemError(error.message) })

        })
        .then(() => { })

}

export default editMatch