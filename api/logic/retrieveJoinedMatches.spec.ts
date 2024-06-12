//@ts-nocheck
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { User, Field, Match } from '../data/index.ts'
import logic from './index.ts'
import { expect, use } from 'chai'
import { errors } from 'com'


import chaiAsPromised from 'chai-as-promised'

dotenv.config()

use(chaiAsPromised)

const { Types: { ObjectId } } = mongoose
const { NotFoundError, SystemError } = errors

describe('Retrieves owned Matches', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds when you retrieve owned matches', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() =>
                Promise.all([
                    User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' }),
                    User.create({ fullname: 'Pepe Roni', email: 'pepe@roni.com', password: '123qwe123', role: 'manager', status: '1' }),
                    User.create({ fullname: 'Else Rojo', email: 'else@rojo.com', password: '123qwe123', role: 'manager', status: '1' }),
                    User.create({ fullname: 'mono loco', email: 'mono@loco.com', password: '123qwe123', role: 'player', status: '0' }),
                    User.create({ fullname: 'pepe argento', email: 'pepe@argento.com', password: '123qwe123', role: 'player', status: '0' }),
                    User.create({ fullname: 'juan marto', email: 'juan@marto.com', password: '123qwe123', role: 'player', status: '0' }),
                    User.create({ fullname: 'pepa pig', email: 'pepa@pig.com', password: '123qwe123', role: 'player', status: '0' })

                ])

                    .then(([user1, user2, user3, userp1, userp2, userp3, userp4]) =>
                        Promise.all([
                            Field.create({
                                manager: user1.id, name: 'Futbol 5', address: 'santa marta N°15', location: {
                                    type: 'Point',
                                    coordinates: [41.391105494415115, 2.0779961811441034]
                                }
                            }),
                            Field.create({
                                manager: user2.id, name: 'Futbol 6', address: 'santa marta N°16', location: {
                                    type: 'Point',
                                    coordinates: [41.391105494415115, 2.0779961811441034]
                                }
                            }),
                            Field.create({
                                manager: user3.id, name: 'Futbol 7', address: 'santa marta N°17', location: {
                                    type: 'Point',
                                    coordinates: [41.391105494415115, 2.0779961811441034]
                                }
                            })
                        ])
                            .then(([field1, field2, field3]) => {
                                return Promise.all([
                                    Match.create({ field: field1._id, title: 'Sport gava', description: '5 vs 5, arquero rotativo', date: '2024-06-07T19:00:00', manager: user1.id, players: [userp1, userp2, userp3] }),
                                    Match.create({ field: field2._id, title: 'Sport castelldefels', description: '6 vs 6, arquero rotativo', date: '2024-06-08T20:00:00', manager: user2.id, players: [userp1._id, userp2._id, userp3._id, userp4._id] }),
                                    Match.create({ field: field3._id, title: 'Sport Viladecans', description: '7 vs 7, arquero rotativo', date: '2024-06-09T21:00:00', players: [userp2._id, userp3._id], manager: user1._id })
                                ])
                            })
                            .then(([match1, match2, match3]) =>

                                logic.retrieveJoinedMatches(userp4.id)
                                    .then(matches => {

                                        expect(!!match2).to.be.true
                                    })

                            )

                    )

            )
    )
    after(() => mongoose.disconnect())
})