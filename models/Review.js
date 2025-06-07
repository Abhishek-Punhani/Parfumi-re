const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "Please provide user id"],
    },
    userName: {
      type: String,
      required: [true, "Please provide user name"],
    },
    rating: {
      type: Number,
      required: [true, "Please provide rating"],
    },
    comment: {
      type: String,
      required: [true, "Please provide comment"],
    },
  },
  {
    timestamps: true,
  }
);

const ReviewModel = mongoose.models.Review || mongoose.model("Review", reviewSchema);

module.exports = ReviewModel;