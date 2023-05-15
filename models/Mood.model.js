const { Schema, model } = require("mongoose");

const moodSchema = new Schema({
    type: {
        type: String,
        enum: ["Happy", "Neutral", "Sad"]
    },
    date: {
        type: Date,
        default: Date.now()
    }
}
);

const Mood = model("Mood", moodSchema);

module.exports = Mood;