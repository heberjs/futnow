import dotenv from 'dotenv'
import mongoose from 'mongoose'


import logic from './index.ts'
import { User, Field, Match } from '../data/index.ts'
import { expect } from 'chai'
import { errors } from 'com'
dotenv.config()

const { Types: { ObjectId } } = mongoose
const { NotFoundError, SystemError, TypeError, AuthError } = errors

describe('retrieveManager', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('retrieves existing manager', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Pepe tio', email: 'pepe@tio.com', password: '123qwe123', role: 'manager', status: 1 }))
            .then(user => logic.retrieveManager(user.id))
            .then(user => {
                expect(user.fullname).to.equal('Pepe tio')
            })
    )
    it('does no retrieve by non-existing manager', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Pepe tio', email: 'pepe@tio.com', password: '123qwe123', role: 'player', status: 0 })
                .then(user => logic.retrieveManager(user.id))
                .catch(error => {
                    expect(error).to.be.instanceOf(AuthError)
                    expect(error.message).to.equal('Permission denied')
                })
            )
    )

    after(() => mongoose.disconnect())
})