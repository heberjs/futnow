import dotenv from 'dotenv'
import { errors } from 'com'

import mongoose from 'mongoose'
import logic from './index.ts'
import { expect, use } from 'chai'
import { User, Field, Match } from '../data/index.ts'



import chaiAsPromised from 'chai-as-promised'
import { match } from 'assert'

dotenv.config()
use(chaiAsPromised)

const { Types: { ObjectId } } = mongoose

const { DuplicityError } = errors

describe('Create Match', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds when you create a new match properly', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' })
                .then(user =>
                    Field.create({
                        manager: user.id, name: 'Futbol 5', address: 'santa marta N°15', location: {
                            type: 'Point',
                            coordinates: [41.391105494415115, 2.0779961811441034]
                        }
                    })
                        .then(field =>
                            logic.createMatch(user.id, field.id, 'Futbol 5', '5 vs 5, outdoor', '2024-06-07T19:00:00')
                        )
                )
                .then(() => Match.findOne({ title: 'Futbol 5' }))
                .then(match => {


                    expect(match.title).to.equal('Futbol 5')
                    expect(match.description).to.equal('5 vs 5, outdoor')
                })
            )

    )
    it('fails on non string managerId', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' })
                .then(user =>
                    Field.create({
                        manager: user.id, name: 'Futbol 5', address: 'santa marta N°15', location: {
                            type: 'Point',
                            coordinates: [41.391105494415115, 2.0779961811441034]
                        }
                    })
                        .then(field => {
                            let errorThrown
                            try {
                                //@ts-ignore
                                logic.createMatch(123, field.id, 'Futbol 5', '5 vs 5, outdoor', '2024-06-07T19:00:00')
                            } catch (error) {
                                errorThrown = error
                                expect(errorThrown).to.be.instanceOf(TypeError)
                                expect(errorThrown.message).to.equal('managerId is not a string')
                            }

                        })

                )
            )

    )
    it('fails on empty managerId', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' })
                .then(user =>
                    Field.create({
                        manager: user.id, name: 'Futbol 5', address: 'santa marta N°15', location: {
                            type: 'Point',
                            coordinates: [41.391105494415115, 2.0779961811441034]
                        }
                    })
                        .then(field => {
                            let errorThrown
                            try {
                                //@ts-ignore
                                logic.createMatch('', field.id, 'Futbol 5', '5 vs 5, outdoor', '2024-06-07T19:00:00')
                            } catch (error) {
                                errorThrown = error
                                expect(errorThrown).to.be.instanceOf(Error)
                                expect(errorThrown.message).to.equal('managerId >< is empty or blank')
                            }

                        })

                )
            )

    )
    it('fails on non string fieldId', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' })
                .then(user =>
                    Field.create({
                        manager: user.id, name: 'Futbol 5', address: 'santa marta N°15', location: {
                            type: 'Point',
                            coordinates: [41.391105494415115, 2.0779961811441034]
                        }
                    })
                        .then(field => {
                            let errorThrown
                            try {
                                //@ts-ignore
                                logic.createMatch(user.id, 123, 'Futbol 5', '5 vs 5, outdoor', '2024-06-07T19:00:00')
                            } catch (error) {
                                errorThrown = error
                                expect(errorThrown).to.be.instanceOf(TypeError)
                                expect(errorThrown.message).to.equal('fieldId is not a string')
                            }

                        })

                )
            )

    )
    it('fails on empty fieldId', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' })
                .then(user =>
                    Field.create({
                        manager: user.id, name: 'Futbol 5', address: 'santa marta N°15', location: {
                            type: 'Point',
                            coordinates: [41.391105494415115, 2.0779961811441034]
                        }
                    })
                        .then(field => {
                            let errorThrown
                            try {
                                //@ts-ignore
                                logic.createMatch(user.id, '', 'Futbol 5', '5 vs 5, outdoor', '2024-06-07T19:00:00')
                            } catch (error) {
                                errorThrown = error
                                expect(errorThrown).to.be.instanceOf(Error)
                                expect(errorThrown.message).to.equal('fieldId >< is empty or blank')
                            }

                        })

                )
            )

    )
    it('fails on non-string title', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' })
                .then(user =>
                    Field.create({
                        manager: user.id, name: 'Futbol 5', address: 'santa marta N°15', location: {
                            type: 'Point',
                            coordinates: [41.391105494415115, 2.0779961811441034]
                        }
                    })
                        .then(field => {
                            let errorThrown
                            try {
                                //@ts-ignore
                                logic.createMatch(user.id, field.id, 123, '5 vs 5, outdoor', '2024-06-07T19:00:00')
                            } catch (error) {
                                errorThrown = error
                                expect(errorThrown).to.be.instanceOf(TypeError)
                                expect(errorThrown.message).to.equal('title is not a string')
                            }

                        })

                )
            )

    )

    it('fails on empty title', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' })
                .then(user =>
                    Field.create({
                        manager: user.id, name: 'Futbol 5', address: 'santa marta N°15', location: {
                            type: 'Point',
                            coordinates: [41.391105494415115, 2.0779961811441034]
                        }
                    })
                        .then(field => {
                            let errorThrown
                            try {
                                //@ts-ignore
                                logic.createMatch(user.id, field.id, '', '5 vs 5, outdoor', '2024-06-07T19:00:00')
                            } catch (error) {
                                errorThrown = error
                                expect(errorThrown).to.be.instanceOf(Error)
                                expect(errorThrown.message).to.equal('title >< is empty or blank')
                            }

                        })

                )
            )

    )
    it('fails on non-string description', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' })
                .then(user =>
                    Field.create({
                        manager: user.id, name: 'Sport Gava', address: 'santa marta N°15', location: {
                            type: 'Point',
                            coordinates: [41.391105494415115, 2.0779961811441034]
                        }
                    })
                        .then(field => {
                            let errorThrown
                            try {
                                //@ts-ignore
                                logic.createMatch(user.id, field.id, 'Futbol 7', 123, '2024-06-07T19:00:00')
                            } catch (error) {
                                errorThrown = error
                                expect(errorThrown).to.be.instanceOf(TypeError)
                                expect(errorThrown.message).to.equal('description is not a string')
                            }

                        })

                )
            )

    )
    it('fails on empty description', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' })
                .then(user =>
                    Field.create({
                        manager: user.id, name: 'Futbol 5', address: 'santa marta N°15', location: {
                            type: 'Point',
                            coordinates: [41.391105494415115, 2.0779961811441034]
                        }
                    })
                        .then(field => {
                            let errorThrown
                            try {
                                //@ts-ignore
                                logic.createMatch(user.id, field.id, 'Futbol 7', '', '2024-06-07T19:00:00')
                            } catch (error) {
                                errorThrown = error
                                expect(errorThrown).to.be.instanceOf(Error)
                                expect(errorThrown.message).to.equal('description >< is empty or blank')
                            }

                        })

                )
            )

    )
    it('fails on non-string date', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' })
                .then(user =>
                    Field.create({
                        manager: user.id, name: 'Sport Gava', address: 'santa marta N°15', location: {
                            type: 'Point',
                            coordinates: [41.391105494415115, 2.0779961811441034]
                        }
                    })
                        .then(field => {
                            let errorThrown
                            try {
                                //@ts-ignore
                                logic.createMatch(user.id, field.id, 'Futbol 7', 'outdoor', 2024)
                            } catch (error) {
                                errorThrown = error
                                expect(errorThrown).to.be.instanceOf(TypeError)
                                expect(errorThrown.message).to.equal('date is not a string')
                            }

                        })

                )
            )

    )
    it('fails on empty date', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' })
                .then(user =>
                    Field.create({
                        manager: user.id, name: 'Sport Gava', address: 'santa marta N°15', location: {
                            type: 'Point',
                            coordinates: [41.391105494415115, 2.0779961811441034]
                        }
                    })
                        .then(field => {
                            let errorThrown
                            try {
                                //@ts-ignore
                                logic.createMatch(user.id, field.id, 'Futbol 7', 'outdoor', '')
                            } catch (error) {
                                errorThrown = error
                                expect(errorThrown).to.be.instanceOf(Error)
                                expect(errorThrown.message).to.equal('date is >< empty or blank')
                            }

                        })

                )
            )

    )

    it('fails on existing match', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' })
                .then(user =>
                    Field.create({
                        manager: user.id, name: 'Futbol 5', address: 'santa marta N°15', location: {
                            type: 'Point',
                            coordinates: [41.391105494415115, 2.0779961811441034]
                        }
                    })
                        .then(field => {
                            Match.create({ managerId: user.id, fieldId: field.id, title: 'Futbol 5', description: '5 vs 5, outdoor', date: '2024-06-07T19:00:00' })
                                .then(match => {
                                    return logic.createMatch(user.id, field.id, 'Futbol 5', '5 vs 5, outdoor', '2024-06-07T19:00:00')
                                        .catch(error => {
                                            expect(error).to.be.instanceOf(DuplicityError)
                                            expect(error.message).to.equal('match already exists')
                                        })

                                })




                        })
                )
            )

    )


    after(() => mongoose.disconnect())
})