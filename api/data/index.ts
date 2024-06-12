import mongoose, { ObjectId } from 'mongoose'

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

enum UserRole {
    Player = "player",
    Manager = "manager",
    Root = "root"
}

enum UserStatus {
    Default = 0,
    Approved = 1
}

type UserType = {
    fullname: string,
    email: string,
    password: string,
    avatar?: string,
    role: UserRole,
    status: UserStatus
}

const user = new Schema<UserType>({
    fullname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: [UserRole.Player, UserRole.Manager, UserRole.Root]
    },
    status: {
        type: Number,
        required: true,
        enum: [UserStatus.Default, UserStatus.Approved]
    }
})


type PointType = {
    type: string,
    coordinates: [number, number]
}

const point = new Schema<PointType>({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

type FieldType = {
    manager: ObjectId,
    name: string,
    address: string,
    location: PointType
}

const field = new Schema<FieldType>({
    manager: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    name: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },
    location: {
        type: point,
        required: true
    }
})


type MatchType = {
    title: string,
    description?: string,
    date: Date,
    field: ObjectId,
    players?: ObjectId[],
    manager: ObjectId

}

const match = new Schema<MatchType>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        required: true,
        unique: true
    },
    field: {
        type: ObjectId,
        ref: 'Field',
        required: true
    },
    players: [{
        type: ObjectId,
        ref: 'User'
    }],
    manager: {
        type: ObjectId,
        ref: 'User'
    }


})

const User = model<UserType>('User', user)
const Field = model<FieldType>('Field', field)
const Point = model<PointType>('Point', point)
const Match = model<MatchType>('Match', match)


export {
    UserType,
    User,
    MatchType,
    Match,
    PointType,
    Point,
    FieldType,
    Field,
    UserRole,
    UserStatus,
}

