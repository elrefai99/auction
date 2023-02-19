// Imports
import { Schema, model, Model, Document } from 'mongoose'


// Interfaces
export interface UserInterface {
    fName: string
    lName: string
    username: string
    email: string
    password: string
    profilePicture: string
    phoneNumber: string
    token?: string
}

export interface Client extends UserInterface {
    gender: 'Male' | 'Female'
    location: string
}

export interface Organization extends UserInterface {
    nationalNumber: number
    location: string
}

export interface UserDocument extends Organization, Client, Document {
    toJSON: () => any // any for now
}

export interface AccountModel extends Model<UserDocument> {
    findByCredentials(email: string, password: string): Promise<UserDocument>
}


// Schema
export const UserSchema: Schema<UserInterface> = new Schema({
    fName:{
        type: String,
        required: true,
        uppercase: true,
    },
    lName: {
        type: String,
        required: true,
        uppercase: true,
    },
    username: {
        type: String,
        required: true,
        uppercase: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    profilePicture: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/start-d51cf.appspot.com/o/blank-profile-picture-973460_1280.webp?alt=media&token=22700836-8469-41fe-9e25-25cbb6f1b80e',
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

export const UserModel = model('user', UserSchema)


// Functions
export function toJSON(this: any) {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.__v
    return userObject
}

UserSchema.methods.toJSON = toJSON
