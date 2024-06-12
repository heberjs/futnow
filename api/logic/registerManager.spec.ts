import dotenv from 'dotenv'

import mongoose from 'mongoose'

import { User, Field, Match } from '../data/index.ts'

import logic from './index.ts'

import { expect } from 'chai'

import { errors } from 'com'

const { DuplicityError, TypeError, ContentError } = errors


dotenv.config()



describe('register Manager', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds a new manager', () =>
        User.deleteMany({})
            .then(() => logic.registerManager('Lobo Feroz', 'lobo@feroz.com', '123qwe123'))
            .then(() => User.findOne({ email: 'lobo@feroz.com' }))
            .then(user => {
                expect(!!user).to.be.true
                expect(user.fullname).to.equal('Lobo Feroz')
                expect(user.email).to.equal('lobo@feroz.com')
                expect(user.password).to.equal('123qwe123')
                expect(user.role).to.equal('manager')
                expect(user.status).to.equal(1)
            })
    )

    it('fails on existing managers', () =>
        Promise.all([
            User.deleteMany({}),
            Field.deleteMany({}),
            Match.deleteMany({})
        ])
            .then(() => User.create({ fullname: 'Lola Drones', email: 'lola@drones.com', password: '123qwe123', role: 'player', status: '0' }))
            .then(() => logic.registerPlayer('Lola Drones', 'lola@drones.com', '123qwe123'))
            .catch(error => {
                expect(error).to.be.instanceOf(DuplicityError)
                expect(error.message).to.equal('user already exists')
            })
    )

    it('fails on non string fullname', () => {
        let errorThrown

        try {
            //@ts-ignore
            logic.registerManager(123, 'heber@sanchez.com', '123qwe123')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(TypeError)
        expect(errorThrown.message).to.equal('fullname is not a string')
    })

    it('fails on empty fullname', () => {
        let errorThrown

        try {
            //@ts-ignore
            logic.registerManager('', 'heber@sanchez.com', '123qwe123')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(Error)
        expect(errorThrown.message).to.equal('fullname >< is empty or blank')
    })

    it('fails on non-valid email', () => {
        let errorThrown

        try {
            //@ts-ignore
            logic.registerManager('Heber Sanchez', 'heber@sanchez', '123qwe123')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('email heber@sanchez is not an email')
    })
    it('fails on non-valid format password', () => {
        let errorThrown

        try {
            //@ts-ignore
            logic.registerManager('Heber Sanchez', 'heber@sanchez.com', '123')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('password is not valid')
    })



    after(() => mongoose.disconnect())
})