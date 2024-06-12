import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { User, Field, Match } from '../data/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

dotenv.config()

const { CredentialsError, NotFoundError } = errors

describe('authenticateUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds on existing user and correct credentials', () =>
        User.deleteMany({})
            .then(() => User.create({ fullname: 'Pepe tio', email: 'pepe@tio.com', password: '123qwe123', role: 'player', status: 0 }))
            .then(user =>
                logic.authenticateUser('pepe@tio.com', '123qwe123')
                    .then(user => {
                        expect(user.userId).to.be.a('string')
                        expect(user.role).to.be.a('string')
                    })
            )
    )
    it('fails on existing user and incorrect password', () =>
        User.deleteMany({})
            .then(() => User.create({ fullname: 'Pepe tio', email: 'pepe@tio.com', password: '123qwe123', role: 'player', status: 0 }))

            .then(() => logic.authenticateUser('pepe@tio.com', '123qwe123qwe'))
            .catch(error => {
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal('wrong password')
            })
    )
    it('fails on existing user and incorrect email', () =>
        User.deleteMany({})
            .then(() => User.create({ fullname: 'Pepe tio', email: 'pepe@tio.com', password: '123qwe123', role: 'player', status: 0 }))

            .then(() => logic.authenticateUser('pep@tio.com', '123qwe123qwe'))
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    )
    it('fails on existing user and incorrect email', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Pepe tio', email: 'pepe@tio.com', password: '123qwe123', role: 'player', status: 0 }))

            .then(() => logic.authenticateUser('pep@tio.com', '123qwe123qwe'))
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    )
    it('fails on non-existing user an correct inputs', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Pepe tio', email: 'pepe@tio.com', password: '123qwe123', role: 'player', status: 0 }))

            .then(() => logic.authenticateUser('juan@delasota.com', '123qwe123'))
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    )


    after(() => mongoose.disconnect())
})