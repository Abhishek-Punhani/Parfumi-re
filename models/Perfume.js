const mongoose = require("mongoose");
const { Schema } = mongoose;

const perfumeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide perfume name"],
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
    },
    price: {
      type: Number,
      required: [true, "Please provide price"],
    },
    image: {
      type: String,
      required: [true, "Please provide a main image"],
    },
    images: {
      type: [String],
      required: [true, "Please provide additional images"],
    },
    brand: {
      type: String,
      required: [true, "Please provide brand"],
    },
    category: {
      type: String,
      required: [true, "Please provide category"],
    },
    sizes: {
      type: [String],
      required: [true, "Please provide sizes"],
    },
    inStock: {
      type: Boolean,
      required: [true, "Please specify if the product is in stock"],
    },
    rating: {
      type: Number,
      required: [true, "Please provide rating"],
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    collection: "perfumes",
    timestamps: true,
  }
);

const PerfumeModel = mongoose.models.Perfume || mongoose.model("Perfume", perfumeSchema);

module.exports = PerfumeModel;