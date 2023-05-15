const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
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

    avatarUrl: {
      type: String,
      default: " "
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
