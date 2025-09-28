const mongoose = require('mongoose');

const RecipientSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'sent', 'failed'],
        default: 'pending'
    },
    error: String,
});

const CampaignSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    scheduledTime: {
        type: Date,
        required: true
    },
    recipients: [
        RecipientSchema,
    ],
    status: {
        type: String,
        enum: ['pending', 'running', 'completed'],
        default: 'pending'
    }
}, { timestamps: true });

const campaign = mongoose.model('Campaign', CampaignSchema);
module.exports = campaign;