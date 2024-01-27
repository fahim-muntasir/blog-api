const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
      validate: {
        validator: async function(value){
          const user = await User.findOne({email: value});

          return !user;
        },
        message: "Email is already in use."
      }
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: "Invalid role type",
      },
      default: "user",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
