import dotenv from 'dotenv'
import mongoose from 'mongoose'
import logic from './index.ts'
import { expect, use } from 'chai'
import { User, Field, Match } from '../data/index.ts'


import chaiAsPromised from 'chai-as-promised'



dotenv.config()
use(chaiAsPromised)



describe('Edit Field', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds when you edit a field', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'manager', status: '1' })
                .then(manager => {
                    const formattedPoint = {
                        type: 'Point',
                        coordinates: [41.32774348370048, 2.0290361981234]
                    }

                    return Field.create({ manager: manager.id, name: 'Futbol 5', address: 'santa marta N°15', location: formattedPoint })
                        .then(field => {

                            return logic.editField(manager.id, field.id, 'Campo Gava', 'riviera maya 5', [41.26456890709164, 1.9383607738622104])

                                .then(() => Field.findById({ _id: field.id }))

                                .then(updatedField => {


                                    expect(updatedField.name).to.equal('Campo Gava')
                                    expect(updatedField.address).to.equal('riviera maya 5')
                                    // expect(location).to.deep.equal([41.26456890709164, 1.9383607738622104])
                                })
                        })
                })
            )

    )
    it('fails when you edit a field', () => {


    }
    )


    after(() => mongoose.disconnect())
})