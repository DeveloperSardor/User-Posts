import { Schema, model, Types, InferSchemaType } from "mongoose";

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required!"],
    },
    email: {
      type: String,
      require: [true, "Email is required!"],
      unique: [true, "This is email already exist! "],
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    password: {
      type: String 
    },
  },
  {
    timestamps: true,
  }
);

type Users = InferSchemaType<typeof UserSchema>;
export default model<Users>("User", UserSchema);
