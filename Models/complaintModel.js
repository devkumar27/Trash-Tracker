import mongoose from "mongoose";

// Schema design for complaints filed by hostellers
const complaintSchema = new mongoose.Schema({
    wasteType: { 
        type: String,
        required: true,
    },
    filedBy: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    pickupDate: {
        type: Date,
        required: false,
    },
    pickupTime: { // morning/afternoon/evening
        type: String,
        required: true
    },
    isResolved: {
        type: Boolean,
        required: true,
        default: false
    },
    regDate: {
        type: Date,
        required: true
    },
    resolutionDate: {
        type: Date,
        default: null
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    adminRemarks: {
        type: String,
        trim: true
    }
},
{
    timestamps: true
}
);

// Making complaint model
const Complaints = mongoose.model('Complaints', complaintSchema);

// Exporting Complaints model as default for this file
export default Complaints;