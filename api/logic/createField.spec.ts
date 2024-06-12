import dotenv from 'dotenv'
import { errors } from 'com'

import mongoose from 'mongoose'
import logic from './index.ts'
import { expect, use } from 'chai'
import { User, Field, Match, PointType } from '../data/index.ts'

import chaiAsPromised from 'chai-as-promised'

dotenv.config()
use(chaiAsPromised)

const { Types: { ObjectId } } = mongoose

const { DuplicityError, TypeError, NotFoundError } = errors




describe('Create a Field', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds a new field', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' }))


            .then(manager => {

                return logic.createField(manager.id, 'Futbol 5', 'santa marta N°15', [41.27331892330033, 2.000524489636535])
            })

            .then(() => Field.findOne({}))

            .then(field => {



                expect(!!field).to.be.true
                expect(field.manager).to.be.instanceOf(ObjectId)
                expect(field.name).to.equal('Futbol 5')
                expect(field.address).to.equal('santa marta N°15')
                expect(field.location.coordinates).to.deep.equal([41.27331892330033, 2.000524489636535])
            })
    )
    it('fails on non string managerId', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' }))
            .then(user => {
                let errorThrown

                try {
                    //@ts-ignore
                    logic.createField(user._id, 'Futbol 5', 'santa marta N°15', [41.27331892330033, 2.000524489636535])
                } catch (error) {
                    errorThrown = error

                    expect(errorThrown).to.be.instanceOf(TypeError)
                    expect(errorThrown.message).to.equal('managerId is not a string')

                }

            })
    )
    it('fails on empty managerId', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' }))
            .then(user => {
                let errorThrown

                try {
                    //@ts-ignore
                    logic.createField('', 'Futbol 5', 'santa marta N°15', [41.27331892330033, 2.000524489636535])
                } catch (error) {
                    errorThrown = error

                    expect(errorThrown).to.be.instanceOf(Error)
                    expect(errorThrown.message).to.equal('managerId >< is empty or blank')

                }

            })
    )
    it('fails on non string name', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' }))
            .then(user => {
                let errorThrown

                try {
                    //@ts-ignore
                    logic.createField(user.id, 123, 'santa marta N°15', [41.27331892330033, 2.000524489636535])
                } catch (error) {
                    errorThrown = error

                    expect(errorThrown).to.be.instanceOf(TypeError)
                    expect(errorThrown.message).to.equal('name is not a string')

                }

            })
    )
    it('fails on empty name', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' }))
            .then(user => {
                let errorThrown

                try {
                    //@ts-ignore
                    logic.createField(user.id, '', 'santa marta N°15', [41.27331892330033, 2.000524489636535])
                } catch (error) {
                    errorThrown = error

                    expect(errorThrown).to.be.instanceOf(Error)
                    expect(errorThrown.message).to.equal('name >< is empty or blank')

                }

            })
    )
    it('fails on non string address', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' }))
            .then(user => {
                let errorThrown

                try {
                    //@ts-ignore
                    logic.createField(user.id, 'Sport Gava', 123, [41.27331892330033, 2.000524489636535])
                } catch (error) {
                    errorThrown = error

                    expect(errorThrown).to.be.instanceOf(TypeError)
                    expect(errorThrown.message).to.equal('address is not a string')

                }

            })
    )
    it('fails on empty address', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' }))
            .then(user => {
                let errorThrown

                try {
                    //@ts-ignore
                    logic.createField(user.id, 'Sport Gava', '', [41.27331892330033, 2.000524489636535])
                } catch (error) {
                    errorThrown = error

                    expect(errorThrown).to.be.instanceOf(Error)
                    expect(errorThrown.message).to.equal('address >< is empty or blank')

                }

            })
    )
    it('fails on existing field', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' }))
            .then(user =>
                Field.create({
                    manager: user.id, name: 'Sport Gava', address: 'santa marta N°15', location: {
                        type: 'Point',
                        coordinates: [41.27331892330033, 2.000524489636535]
                    }
                })
                    .then(() =>
                        logic.createField(user.id, 'Sport Gava', 'santa marta N°15', [41.27331892330033, 2.000524489636535]))
                    .catch(error => {

                        expect(error).to.be.instanceOf(DuplicityError)
                        expect(error.message).to.equal('field already exists')

                    })


            )

    )

    after(() => mongoose.disconnect())
})