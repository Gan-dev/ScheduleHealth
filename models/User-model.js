const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    newsPreference: {
      type: [String],
      enum: [Science,
        Sports, Politics],
    },
    feelings: {
      type: [String],
      enum: [SuperSad, Sad, Neutral, Happy, SuperHappy],
    },
    avatarUrl: {
      type: String,
      default: " "
    },
    suscribedEvents: [{
      type: [Schema.Types.ObjectId],
      ref: "Event",
      require: true
    }],
    favEvent: [{
      type: [Schema.Types.ObjectId],
      ref: "Event",
      require: true
    }],
    myEvent: [{
      type: [Schema.Types.ObjectId],
      ref: "Event",
      require: true
    }],

  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
