
import { validate, errors } from 'com'
import { Field, FieldType, PointType, User, UserType } from '../data/index.ts'
import mongoose from 'mongoose'
const { Types: { ObjectId } } = mongoose
const { SystemError, DuplicityError, NotFoundError } = errors


function createField(managerId: string, name: string, address: string, location: [number, number]): Promise<void> {
    validate.text(managerId, 'managerId', true)
    validate.text(name, 'name')
    validate.text(address, 'address')
    validate.coords(location)

    return Field.findOne({ $or: [{ name }] })
        .catch(error => { throw new SystemError(error.message) })
        .then((field: FieldType) => {
            if (field) throw new DuplicityError('field already exists')

            return User.findById(managerId)
                .catch(error => { throw new SystemError(error.message) })
                .then(manager => {
                    if (!manager) throw new NotFoundError('manager not found')

                    const formattedPoint: PointType = {
                        type: 'Point',
                        coordinates: location
                    }


                    const newfield = {
                        manager: new ObjectId(managerId),
                        name: name,
                        address: address,
                        location: formattedPoint
                    }

                    return Field.create(newfield)
                        .catch(error => { throw new SystemError(error.message) })

                })
                .then(field => { })
        })

}

export default createField