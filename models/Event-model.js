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
        image: {
            type: String,
            default: "https://64.media.tumblr.com/b075a5bffc6021eb75169bb3d850a670/0010e166b3ed3a12-20/s1280x1920/29c5e6fab2d6a5bd80285487384b5f586832d5f6.jpg"
        },

        date: {
            start: {
                type: String
            },
            end: {
                type: String
            },
            hourStart: {
                type: String
            },
            hourEnd: {
                type: String
            }
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
