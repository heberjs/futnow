import dotenv from 'dotenv'
import mongoose from 'mongoose'
import logic from './index.ts'
import { expect, use } from 'chai'
import { User, Field, Match } from '../data/index.ts'



import chaiAsPromised from 'chai-as-promised'

dotenv.config()
use(chaiAsPromised)

const { Types: { ObjectId } } = mongoose

describe('Remove match', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds when you remove a match properly', () =>
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
                            Match.create({ manager: user.id, field: field.id, title: 'Futbol 5', description: '5 vs 5, outdoore', date: '2024-06-07T19:00:00' })


                                .then(() => Match.findOne({ title: 'Futbol 5' }))
                                .then(match => {

                                    return logic.removeMatch(user.id, match.id)
                                        .then(match1 => {

                                            expect(match1).to.be.deep.equal(match)
                                        })


                                })

                        )
                )

            )

    )

    after(() => mongoose.disconnect())
})

