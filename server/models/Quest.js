import mongoose from 'mongoose';

const questSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    acceptedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
        maxlength: 200,
    },
    pickupLocation: {
        type: String,
        required: true,
        trim: true
    },
    deliveryLocation: {
        type: String,
        required: true,
        trim: true
    },
    reward: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: ['open', 'accepted', 'in-progress', 'completed', 'cancelled'],
        default: 'open',
        required: true,
    }

}, { timestamps: true });

const Quest = mongoose.model("Quest", questSchema);

export default Quest;