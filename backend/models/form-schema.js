import mongoose from 'mongoose';

// Specifies an individual man
const manSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 15,
        match: /^[A-Za-z]+$/
    },
    problematic: {
        type: Boolean,
        required: true
    },
    reason: {
        type: String,
        required: false
    }
})

// Specifies a group of men - ex. family
const groupSchema = new mongoose.Schema({
    men: {
        type: [manSchema]
    }
})

const formSchema = new mongoose.Schema({
    family: {
        type: groupSchema,
        required: false
    },
    extendedfamily: {
        type: groupSchema,
        required: false
    },
    closefriends: {
        type: groupSchema,
        required: false
    },
    friends: {
        type: groupSchema,
        required: false
    },
    acquaintances: {
        type: groupSchema,
        required: false
    } 
});

formSchema.set('toJSON', {
    versionKey: false,
    virtuals: true,
    transform: (doc, ret) => { delete ret._id; }
});

export default mongoose.model('form', formSchema);