import dotenv from 'dotenv'
import mongoose from 'mongoose'


import logic from './index.ts'
import { User } from '../data/index.ts'
import { expect } from 'chai'
import { errors } from 'com'
dotenv.config()

const { Types: { ObjectId } } = mongoose
const { NotFoundError, SystemError } = errors

describe('retrievePlayer', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('retrieves existing player', () =>
        User.deleteMany({})
            .then(() => User.create({ fullname: 'Pepe tio', email: 'pepe@tio.com', password: '123qwe123', role: 'player', status: 0 }))
            .then(user =>
                User.create({ fullname: 'Papa nicolao', email: 'papa@nicolao.com', password: '123qwe123', role: 'player', status: 0 })
                    .then(user2 => logic.retrievePlayer(user.id, user2.id))
                    .then(user => {
                        expect(user.fullname).to.equal('Papa nicolao')
                    })
            )

    )
    it('does no retrieve by non-existing user', () =>
        User.deleteMany()
            .then(() => User.create({ fullname: 'Pepe tio', email: 'pepe@tio.com', password: '123qwe123', role: 'player', status: 0 }))
            .then(user =>
                User.create({ fullname: 'Papa nicolao', email: 'papa@nicolao.com', password: '123qwe123', role: 'player', status: 0 })
                    .then(user2 => logic.retrievePlayer(new ObjectId().toString(), user2.id))
                    .catch(error => {
                        expect(error).to.be.instanceOf(TypeError)
                    })
            )
    )

    after(() => mongoose.disconnect())
})