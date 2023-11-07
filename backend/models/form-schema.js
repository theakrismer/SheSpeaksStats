import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 15,
        match: /^[A-Za-z]+$/
    },
    msgText: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 30
    }
});

formSchema.set('toJSON', {
    versionKey: false,
    virtuals: true,
    transform: (doc, ret) => { delete ret._id; }
});

export default mongoose.model('form', formSchema);