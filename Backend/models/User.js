import mongoose from "mongoose";
import Validator from "validator";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "UserName is required"],
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      validate: [Validator.isEmail, "Invalid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "password must be at least 6 characters long"],
      validate: {
        validator: function (value) {
          // Regex: at least 1 uppercase, 1 number, 1 special char
          return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
            value
          );
        },
        message:
          "Password must contain at least 1 uppercase letter, 1 number, and 1 special character",
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
    if(this.email){
        this.email = this.email.toLowerCase();
    }

    next();
})


userSchema.pre("save", async function(next){
    if(this.password){
        this .password = await bcrypt.hash(this.password, 10);
    }
    next();
})

const User = mongoose.model("User", userSchema);

export default User;
