const mongoose = require('mongoose');

// User Schema (covers Super Admin, Shop Owner, and Attendant)
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['SuperAdmin', 'ShopOwner', 'Attendant'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Shop Schema
const ShopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['Retail', 'Restaurant', 'Grocery', 'Electronics', 'Other'],
        required: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    attendants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    status: {
        type: String,
        enum: ['Active', 'Pending', 'Inactive'],
        default: 'Pending'
    }
}, { timestamps: true });

// Sales Log Schema
const SalesLogSchema = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
        required: true
    },
    attendant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    totalSales: {
        type: Number,
        required: true,
        min: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    details: {
        type: Object,
        default: {}
    }
}, { timestamps: true });

// System Activity Log Schema
const ActivityLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    action: {
        type: String,
        required: true
    },
    details: {
        type: Object,
        default: {}
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create models
const User = mongoose.model('User', UserSchema);
const Shop = mongoose.model('Shop', ShopSchema);
const SalesLog = mongoose.model('SalesLog', SalesLogSchema);
const ActivityLog = mongoose.model('ActivityLog', ActivityLogSchema);

module.exports = {
    User,
    Shop,
    SalesLog,
    ActivityLog
};