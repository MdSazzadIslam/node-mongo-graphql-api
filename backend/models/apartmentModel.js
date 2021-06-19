const mongoose = require("mongoose");
const geocoder = require("../middlewares/geocoder");

const ApartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter apartment name"],
      trim: true,
      maxlength: [500, "Name must be less than 500 characters"],
    },

    description: {
      type: String,
      required: [true, "Please enter apartment description "],
      trim: true,
      maxlength: [2000, "Description must be less than 2000 characters"],
    },

    room: {
      type: Number,
      required: [true, "Please enter no of bedroom"],
      default: 1,
    },

    address: {
      type: String,
      required: [true, "Please enter an address"],
    },

    favorite: {
      type: Boolean,
      required: [true, "By default all the appartment will be favorite"],
      default: true,
    },

    zipCode: {
      type: String,
    },

    location: {
      type: {
        type: String,
        enum: ["Polygon"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },

      country: {
        type: String,
      },

      city: {
        type: String,
        trim: true,
      },
      streetName: {
        type: String,
      },
      streetNumber: {
        type: String,
      },

      formattedAddress: {
        type: String,
      },
      countryCode: {
        type: String,
      },
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

//Geocode & create location

ApartmentSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].latitude, loc[0].longitude],
    formattedAddress: loc[0].formattedAddress,
    country: loc[0].country,
    city: loc[0].city,
    zipCode: loc[0].zipcode,
    streetName: loc[0].streetName,
    countryCode: loc[0].countryCode,
  };

  next(); // basically moves to the next middleware function. It's a express middleware function
});

const Apartment = new mongoose.model("Apartment", ApartmentSchema);
module.exports = Apartment;
