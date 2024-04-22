import mongoose from 'mongoose';

// Specifies an individual man
// Both copies of thids code must be updated at present! See note in form-schema
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

personSchema.set('toJSON', {
    versionKey: false,
    virtuals: true,
    transform: (doc, ret) => { delete ret._id; }
});

export default mongoose.model('person', personSchema);