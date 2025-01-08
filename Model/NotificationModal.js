import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    message: {
        type: String,
        required: true,
    },
    bikeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bike',
    },
    userName: {
        type: String,
    },
    userEmail: {
        type: String,
    },
    status: {
        type: String,
        enum: ['unread', 'read'],
        default: 'unread',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const notificationSchema = mongoose.model('Notification', NotificationSchema);
