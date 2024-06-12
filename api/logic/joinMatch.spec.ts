import dotenv from 'dotenv'
import { errors } from 'com'
import mongoose from 'mongoose'
import logic from './index.ts'
import { expect, use } from 'chai'
import { User, Field, Match } from '../data/index.ts'
const { LimitError, NotFoundError } = errors


import chaiAsPromised from 'chai-as-promised'



dotenv.config()
use(chaiAsPromised)



describe('Join a Match', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds when you join a match', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' })
                .then(manager =>
                    Field.create({
                        manager: manager.id, name: 'Futbol 5', address: 'santa marta N°15', location: {
                            type: 'Point',
                            coordinates: [41.391105494415115, 2.0779961811441034]
                        }
                    })
                        .then(field =>
                            Promise.all([
                                User.create({ fullname: 'Lobo Feroz', email: 'lobo@feroz.com', password: '123qwe123', role: 'player', status: 0 }),
                                User.create({ fullname: 'Andres Perez', email: 'andres@perez.com', password: '123qwe123', role: 'player', status: 0 }),

                            ])
                                .then(([user1, user2]) =>

                                    Match.create({ manager: manager.id, field: field.id, title: 'Futbol 5', description: '5 vs 5, outdoor', date: '2024-06-07T19:00:00', players: [user1._id] })
                                        .then(match =>

                                            logic.joinMatch(match.id, user2.id)

                                                .then(() => Match.findOne({ title: 'Futbol 5' }))
                                                .then(updatedMatch => {



                                                    expect(!!updatedMatch).to.be.true
                                                })
                                        )
                                )
                        )
                )
            )
    )
    it('Fails when you attempt to join a match with 10 or more players', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' })
                .then(manager =>
                    Field.create({
                        manager: manager.id, name: 'Futbol 5', address: 'santa marta N°15', location: {
                            type: 'Point',
                            coordinates: [41.391105494415115, 2.0779961811441034]
                        }
                    })
                        .then(field =>
                            Promise.all([
                                User.create({ fullname: 'Lobo Feroz', email: 'lobo@feroz.com', password: '123qwe123', role: 'player', status: 0 }),
                                User.create({ fullname: 'Andres Perez', email: 'andres@perez.com', password: '123qwe123', role: 'player', status: 0 }),
                                User.create({ fullname: 'Pere Hernandez', email: 'pere@hernandez.com', password: '123qwe123', role: 'player', status: 0 }),
                                User.create({ fullname: 'Juan Trota', email: 'juan@trota.com', password: '123qwe123', role: 'player', status: 0 }),
                                User.create({ fullname: 'Xavi Gonzalez', email: 'xavi@gonzalez.com', password: '123qwe123', role: 'player', status: 0 }),
                                User.create({ fullname: 'David House', email: 'david@house.com', password: '123qwe123', role: 'player', status: 0 }),
                                User.create({ fullname: 'Miquel Guevara', email: 'miquel@guevara.com', password: '123qwe123', role: 'player', status: 0 }),
                                User.create({ fullname: 'Pau Julian', email: 'pau@julian.com', password: '123qwe123', role: 'player', status: 0 }),
                                User.create({ fullname: 'Adrian Sosa', email: 'adrian@sosa.com', password: '123qwe123', role: 'player', status: 0 }),
                                User.create({ fullname: 'Melo Coton', email: 'melo@coton.com', password: '123qwe123', role: 'player', status: 0 }),
                                User.create({ fullname: 'Bari Fusa', email: 'bari@fusa.com', password: '123qwe123', role: 'player', status: 0 }),

                            ])
                                .then(([user1, user2, user3, user4, user5, user6, user7, user8, user9, user10, user11]) =>

                                    Match.create({ manager: manager.id, field: field.id, title: 'Futbol 5', description: '5 vs 5, outdoor', date: '2024-06-07T19:00:00', players: [user1._id, user2._id, user3._id, user4._id, user5._id, user6._id, user7._id, user8._id, user10._id, user11._id] })
                                        .then(match =>

                                            logic.joinMatch(user9.id, match.id)
                                                .catch(error => {
                                                    expect(error).to.be.instanceOf(Error)
                                                    // expect(error).to.equal('match is already full')
                                                })

                                        )
                                )
                        )
                )
            )

    )

    after(() => mongoose.disconnect())
})