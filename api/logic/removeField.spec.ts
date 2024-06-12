import dotenv from 'dotenv'
import mongoose from 'mongoose'
import logic from './index.ts'
import { expect, use } from 'chai'
import { User, Field, Match } from '../data/index.ts'



import chaiAsPromised from 'chai-as-promised'

dotenv.config()
use(chaiAsPromised)

const { Types: { ObjectId } } = mongoose

describe('Remove field', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds when you remove a field properly', () =>
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

                        .then(() => Field.findOne({ name: 'Futbol 5' }))
                        .then(field => {

                            return logic.removeField(user.id, field.id)
                                .then(field => {

                                })

                        })
                )
            )

    )
    it('fails when you remove a field', () => {


    }
    )


    after(() => mongoose.disconnect())
})

