const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    username: {
      type: String,
      required: [true, "Please provide your username"],
      unique: [true, "This username is already registered!"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email address"],
      unique: [true, "This email address is already registered!"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email address!"],
    },
    picture: {
      type: String,
      default:
        "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png",
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minLength: [6, "Password must be at least 6 characters long"],
      maxLength: [128, "Password must be at most 128 characters long"],
    },
    role: {
      type: String,
      enum: ["User", "Admin", "SuperAdmin"],
      default: "User",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Perfume",
      },
    ],
    address: {
      type: new mongoose.Schema(
        {
          type: {
            type: String,
            required: [true, "Please specify address type"],
          },
          name: {
            type: String,
            required: [true, "Please provide recipient name"],
          },
          address: {
            type: String,
            required: [true, "Please provide the address"],
          },
          city: {
            type: String,
            required: [true, "Please provide city information"],
          },
          isDefault: {
            type: Boolean,
            default: false,
            required: [true, "Please specify if the address is default"],
          },
        },
        { timestamps: true }
      ),
      required: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  } catch (error) {
    next(error);
  }
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = UserModel;