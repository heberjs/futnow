import express from 'express'

import {
    registerManagerHandler,
    registerPlayerHandler,
    authenticateUserHandler,
    retrievePlayerHandler,
    retrieveManagerHandler,
    retrieveOwnPlayerHandler,
    retrieveMatchesHandler,
    retrieveManagerMatchesHandler,
    retrieveJoinedMatchesHandler,
    retrieveFieldsHandler,
    createMatchHandler,
    createFieldHandler,
    editMatchHandler,
    editFieldHandler,
    joinMatchHandler,
    unJoinMatchHandler,
    removeMatchHandler,
    removeFieldHandler,

} from './handlers/index.ts'

const { Router, json } = express


const players = Router()
const users = Router()
const managers = Router()
const matches = Router()
const fields = Router()

const jsonBodyParser = json()


users.post('/auth', jsonBodyParser, authenticateUserHandler)

players.post('/', jsonBodyParser, registerPlayerHandler)
players.get('/:targetUserId', retrievePlayerHandler)
players.get('/', retrieveOwnPlayerHandler)

managers.post('/', jsonBodyParser, registerManagerHandler)
managers.get('/', retrieveManagerHandler)
managers.get('/matches', retrieveManagerMatchesHandler)

matches.post('/', jsonBodyParser, createMatchHandler)
matches.get('/', retrieveMatchesHandler)
matches.get('/joined', retrieveJoinedMatchesHandler)
matches.put('/edit/:matchId', jsonBodyParser, editMatchHandler)
matches.put('/join/:matchId', joinMatchHandler)
matches.put('/unJoin/:matchId', unJoinMatchHandler)
matches.delete('/:id', removeMatchHandler)

fields.post('/', jsonBodyParser, createFieldHandler)
fields.get('/', retrieveFieldsHandler)
fields.put('/edit/:fieldId', jsonBodyParser, editFieldHandler)
fields.delete('/:id', removeFieldHandler)


export {
    players,
    users,
    managers,
    matches,
    fields
}