import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const userShema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is Required",
    },

    email: {
      type: String,
      trim: true,
      required: "Email is Required",
      unique: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
      min: 6,
      max: 64,
    },
    stripe_account_id: {},
    stripe_seller: {},
    stripesession: {},
  },
  {
    timestamps: true,
  }
);

userShema.pre("save", function (next) {
  let user = this;

  if (user.isModified("password")) {
    return bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        console.log("BCRYPT HASH FAILED", err);
        return next(err);
      }
      user.password = hash;
      return next();
    });
  } else {
    return next();
  }
});

userShema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, function (err, match) {
    if (err) {
      console.log("COMPARE PASSWORD FAILED", err);
      return next(err, false);
    }
    // if no err, we get null
    console.log("MATCH PASSWORD", match);
    return next(null, match);
  });
};

export default mongoose.model("User", userShema);
