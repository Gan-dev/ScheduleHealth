const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: false,
        },
        type: {
            type: String,
            enum: ["Leisure", "Work", "Health"],
            required: true,
        },
        specs: {
            type: String,
            enum: ["Public", "Private"],
            required: true,
        },
        description: {
            type: String,
            required: true,
        },

        date: {
            type: Date,
            required: true,
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        userSubscribed: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }]
    },

    {
        timestamps: true
    }
);

const Event = model("Event", eventSchema);

module.exports = Event;
