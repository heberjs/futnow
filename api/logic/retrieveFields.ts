
import { ObjectId, Schema } from 'mongoose'
const { Types: { ObjectId } } = Schema
import { Field, FieldType, PointType, User } from '../data/index.ts'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors


function retrieveFields(managerId: string): Promise<[{ _id: ObjectId, manager: ObjectId, name: string, address: string, location: [number, number] }] | [{ _id: ObjectId, manager: ObjectId, name: string, address: string, location: [number, number] }][]> {
    validate.text(managerId, 'managerId', true)

    return User.findById(managerId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Field.find({ manager: managerId }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(fields =>
                    fields.map<any>(({ _id, manager, name, address, location }) => ({
                        id: _id.toString(),
                        manager,
                        name,
                        address,
                        location: {
                            type: location.type,
                            latitude: location.coordinates[0],
                            longitude: location.coordinates[1]
                        }
                    }))
                )
        })
        .catch(error => { throw new SystemError(error.message) })
}

export default retrieveFields