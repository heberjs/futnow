import { ObjectId, Schema } from 'mongoose'

import { Match, User } from '../data/index.ts'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors


type MatchResponse = {
    title: string,
    description: string,
    date: Date,
    field: { id: ObjectId, name: string, address: string, location: { latitude: number, longitude: number } },
    players: {
        id: string;
        fullname: string;
    }[],
    manager: ObjectId
}


function retrieveMatches(userId: string): Promise<any> {
    validate.text(userId, 'userId', true)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Match.find().sort({ date: 1 })
                .populate<{ field: { _id: ObjectId, name: string, address: string, location: { latitude: number, longitude: number } } }>('field', '_id name address location')
                .populate<{ players: [{ id: ObjectId, fullname: string }] }>('players', '_id fullname')
                .lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(matches =>
                    matches.map<MatchResponse>(({ _id, title, description, date, field, players, manager }) => ({
                        id: _id.toString(),
                        title,
                        description,
                        date,
                        field: {
                            id: field._id,
                            name: field.name,
                            address: field.address,
                            location: {
                                latitude: field.location.coordinates[0],
                                longitude: field.location.coordinates[1]
                            }
                        },
                        players: players.map(player => ({
                            id: player._id.toString(),
                            fullname: player.fullname
                        })),
                        manager
                    }))
                )
        })
}

export default retrieveMatches
