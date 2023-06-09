const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
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
    birth: {
      type: String,
      required: true
    },
    zipCode: {
      type: Number,
      required: true
    },
    newsPreferences: [{
      type: String,
      enum: ["arts", "technology", "sports", "world", "science", "opinion", "movies"],
    }],
    avatar: {
      type: String,
      default: "https://i.stack.imgur.com/l60Hf.png",
      set: value => value === '' ? 'https://i.stack.imgur.com/l60Hf.png' : value
    },
    subscribedEvents: [{
      type: Schema.Types.ObjectId,
      ref: "Event",
      require: true
    }],
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User"
    },

  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
