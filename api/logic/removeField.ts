import { validate, errors } from "com"
import { text } from "stream/consumers"
import { User, Field, Match } from '../data/index.ts'
const { NotFoundError, SystemError, AuthError } = errors

function removeField(userId, fieldId) {
    validate.text(userId, 'userId', text)
    validate.text(fieldId, 'fieldId', text)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            if (user.role !== 'manager') throw new AuthError('user not allowed')
            return Match.findOne({ field: fieldId })
                .catch(error => { throw new SystemError(error.message) })
                .then(match => {
                    if (match) throw new AuthError('Cannot delete a reserved field')

                    return Field.findById(fieldId)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(field => {
                            if (!field) throw new NotFoundError('field not found')

                            if (field.manager.toString() !== userId) throw new AuthError('user not allowed')


                            return Field.findByIdAndDelete(fieldId)
                        })
                })
        })
}

export default removeField