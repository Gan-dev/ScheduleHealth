const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        eventName: {
            type: String,
            trim: true,
            required: false,
        },
        type: {
            type: String,
            required: true,

        },
        specs: {
            type: String,
            required: true,

        },
        password: {
            type: String,
            required: true
        }
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`    
        timestamps: true
    }
);

const User = model("User", userSchema);

module.exports = User;