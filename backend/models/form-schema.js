import mongoose from 'mongoose';

// Specifies an individual man
// This is duplicate code, also written in person-schema.js
// To-Do: remove this code and figure out how to import this from person-schema.js
// Both must be updated at present!
const personSchema = new mongoose.Schema({
    group: {
        type: String,
        required: true,
    },
    problematic: {
        type: Boolean,
        required: true
    },
    reason: {
        type: String,
        required: false
    },
    frequency: {
        type: String,
        required: false
    },
    intensity: {
        type: String,
        required: false
    }
})

const formSchema = new mongoose.Schema({
    age: Number,
    men: [personSchema]
});

formSchema.set('toJSON', {
    versionKey: false,
    virtuals: true,
    transform: (doc, ret) => { delete ret._id; }
});

export default mongoose.model('form', formSchema);