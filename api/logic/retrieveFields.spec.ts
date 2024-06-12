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

describe('Retrieve Fields', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds when you create a new match properly', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => Promise.all([
                User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' }),
                User.create({ fullname: 'Pepo Lara', email: 'pepo@lara.com', password: '123qwe123', role: 'manager', status: '1' })

            ]))
            .then(([user1, user2]) => {

                const formattedPoint = {
                    type: 'Point',
                    coordinates: [41.27443363157467, 1.9994984529610935]
                }

                return Promise.all([
                    Field.create({ manager: user1.id, name: 'Futbol 5', address: 'santa marta N°15', location: formattedPoint }),
                    Field.create({ manager: user1.id, name: 'Futbol 6', address: 'santa marta N°16', location: formattedPoint }),
                    Field.create({ manager: user2.id, name: 'Futbol 7', address: 'santa marta N°17', location: formattedPoint })
                ])

                    .then(([field1, field2, field3]) => {


                        return logic.retrieveFields(user1.id)
                            .then(fields => {



                                expect(fields).to.have.lengthOf(2)
                                // expect(field1.name).to.equal('Futbol 5')
                                // expect(field1.address).to.equal('santa marta N°15')

                            })

                    })

            })

    )
    after(() => mongoose.disconnect())
})