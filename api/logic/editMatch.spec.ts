import dotenv from 'dotenv'
import mongoose from 'mongoose'
import logic from './index.ts'
import { expect, use } from 'chai'
import { User, Field, Match } from '../data/index.ts'


import chaiAsPromised from 'chai-as-promised'



dotenv.config()
use(chaiAsPromised)



describe('Edit Match', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds when you edit a match', () =>
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

                            Match.create({ manager: manager.id, field: field.id, title: 'Futbol 5', description: '5 vs 5, outdoor', date: '2024-06-07T19:00:00' })
                                .then(match => {

                                    return logic.editMatch(manager.id, match.id, 'Futbol 5', '11 vs 11, outdoor', '2024-06-27T18:00:00')

                                        .then(() => Match.findById({ _id: match.id }))
                                        .then(updatedMatch => {

                                            expect(updatedMatch.title).to.equal('Futbol 5')
                                        })
                                })
                        )
                )
            )
    )
    it('fails when you edit a match', () => {


    }
    )


    after(() => mongoose.disconnect())
})