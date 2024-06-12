import mongoose from 'mongoose'
import { Field, Match, User, PointType } from './index.ts'

import { ObjectId, Schema } from 'mongoose'
const { Types: { ObjectId } } = Schema



mongoose.connect('mongodb://localhost:27017/project')
    .then(() => User.deleteMany())
    .then(() => Field.deleteMany())
    .then(() => Match.deleteMany())

    .then(() => {
        return Promise.all([
            User.create({ fullname: 'Pepe Roni', email: 'pepe@roni.com', password: '123qwe123', role: 'manager', status: 1 }),
            User.create({ fullname: 'Peter Pan', email: 'peter@pan.com', password: '123qwe123', role: 'manager', status: 1 }),
            User.create({ fullname: 'Heber Sanchez', email: 'heber@sanchez.com', password: '123qwe123', role: 'manager', status: 1 }),
            User.create({ fullname: 'Manuel Barzi', email: 'manu@barzi.com', password: '123qwe123', role: 'manager', status: 1 })
        ])
    })

    .then(([manager1, manager2, manager3, manager4]) => {

        return Promise.all([
            Field.create({
                manager: manager3.id, name: 'Sport La Pava', address: 'Camí de la Pava, 14, 08850 Gavà, Barcelona', location: {
                    type: 'Point',
                    coordinates: [41.27456695694105, 2.0005169359950865]
                }
            }),
            Field.create({
                manager: manager2.id, name: 'Futbol Sant Just', address: 'Passeig de la Muntanya, 27, 08960 Sant Just Desvern, Barcelona', location: {
                    type: 'Point',
                    coordinates: [41.391105494415115, 2.0779961811441034]
                }
            }),
            Field.create({
                manager: manager1.id, name: 'Futbol Trinitat', address: 'Via de Bàrcino, 104, Sant Andreu, 08033 Barcelona', location: {
                    type: 'Point',
                    coordinates: [41.44802314503028, 2.191891392368836]
                }
            }),
            Field.create({
                manager: manager4.id, name: 'Futbol La Barceloneta', address: 'C/ del Dr. Aiguader, 58, Ciutat Vella, 08003 Barcelona', location: {
                    type: 'Point',
                    coordinates: [41.38397657505872, 2.1905431842053216]
                }
            }),
        ])

            .then(([field1, field2, field3, field4]) => {
                return Promise.all([
                    User.create({ fullname: 'Lobo Feroz', email: 'lobo@feroz.com', password: '123qwe123', role: 'player', status: 0 }),
                    User.create({ fullname: 'Andres Perez', email: 'andres@perez.com', password: '123qwe123', role: 'player', status: 0 }),
                    User.create({ fullname: 'Pere Hernandez', email: 'pere@hernandez.com', password: '123qwe123', role: 'player', status: 0 }),
                    User.create({ fullname: 'Juan Chota', email: 'juan@chota.com', password: '123qwe123', role: 'player', status: 0 }),
                    User.create({ fullname: 'Xavi Gonzalez', email: 'xavi@gonzalez.com', password: '123qwe123', role: 'player', status: 0 }),
                    User.create({ fullname: 'David House', email: 'david@house.com', password: '123qwe123', role: 'player', status: 0 }),
                    User.create({ fullname: 'Miquel Guevara', email: 'miquel@guevara.com', password: '123qwe123', role: 'player', status: 0 }),
                    User.create({ fullname: 'Pau Julian', email: 'pau@julian.com', password: '123qwe123', role: 'player', status: 0 }),
                    User.create({ fullname: 'Adrian Sosa', email: 'adrian@sosa.com', password: '123qwe123', role: 'player', status: 0 }),
                    User.create({ fullname: 'Lola Mento', email: 'lola@mento.com', password: '123qwe123', role: 'player', status: 0 }),
                    User.create({ fullname: 'Mila Mento', email: 'mila@mento.com', password: '123qwe123', role: 'player', status: 0 }),
                    User.create({ fullname: 'Tula Mento', email: 'tula@mento.com', password: '123qwe123', role: 'player', status: 0 }),
                ])
                    .then(([user5, user6, user7, user8, user9, user10, user11, user12, user13, user14, user15, user16]) => {

                        return Promise.all([
                            Match.create({ manager: manager3.id, field: field1.id, title: 'Futbol 5', description: '5 vs 5, outdoors', date: '2024-05-16T16:00:00', players: [user5.id, user6.id, user7.id, user8.id, user9.id, user10.id, user11.id, user12.id, user13.id, user14.id] }),
                            Match.create({ manager: manager1.id, field: field3.id, title: 'Futbol 5', description: '5 vs 5, outdoors', date: '2024-05-16T17:00:00', players: [user5.id, user6.id, user7.id, user8.id, user9.id, user10.id] }),
                            Match.create({ manager: manager2.id, field: field2.id, title: 'Futbol 5', description: '5 vs 5, indoors', date: '2024-05-16T18:00:00' }),
                            Match.create({ manager: manager4.id, field: field4.id, title: 'Futbol 5', description: '5 vs 5, indoors, goalkeeper rotative', date: '2024-05-16T20:00:00' })
                        ])
                    })
            })
    })

    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(console.error)