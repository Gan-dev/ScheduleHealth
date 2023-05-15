const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    {
        eventName: {
            type: String,
            trim: true,
            required: false,
        },
        type: {
            type: [String],
            enum: ["Ocio", "Trabajo", "Salud"],
            required: true,

        },
        specs: {
            type: [String],
            enum: ["Publico", "Privado"],
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

        openToSuscribe: {
            type: true
        },
        owner: [{
            type: [Schema.Types.ObjectId],
            ref: "User",
            require: true
        }]
    },

    {
        timestamps: true
    }

);

const Event = model("Event", eventSchema);

module.exports = Event;