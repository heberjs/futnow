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

describe('Retrieves manager matches', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds when you retrieve manager matches', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() =>
                Promise.all([
                    User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' }),
                    User.create({ fullname: 'Pepe Roni', email: 'pepe@roni.com', password: '123qwe123', role: 'player', status: '0' }),
                    User.create({ fullname: 'Else Rojo', email: 'else@rojo.com', password: '123qwe123', role: 'player', status: '0' }),

                ])

                    .then(([user1, user2, user3]) => {

                        const formattedPoint = {
                            type: 'Point',
                            coordinates: [41.27443363157467, 1.9994984529610935]
                        }

                        return Field.create({ manager: user1.id, name: 'Futbol 5', address: 'santa marta N°15', location: formattedPoint })
                            .then(field =>
                                Match.create({ field: field.id, title: 'Sport gava', description: '5 vs 5, arquero rotativo', date: '2024-06-07T19:00:00', manager: user1.id, players: [user2.id, user3.id] })
                                    .then(match => {
                                        debugger
                                        return logic.retrieveManagerMatches(user1.id)
                                            .then(match => {

                                                expect(!!match).to.be.true
                                            })


                                    })
                            )

                    })

            )
    )
    after(() => mongoose.disconnect())
})