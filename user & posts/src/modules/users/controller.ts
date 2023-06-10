import Jwt from "../../utils/jwt.js";
import { UserDto } from "../../interface/user.js";
import UsersSchama from "./schema.js";
import { generateCode } from "../../utils/generateConfirmCode.js";
import { Request, Response } from "express";
import sha256 from "sha256";
import { sendConfirmationEmail } from "../../nodemailer/index.js";

export default class {
  constructor() {}

  static async Register(req: Request, res: Response) {
    try {
      const { username, email, gender, password } = req.body;

      if (!username || !email || !gender || !password) {
        throw new Error(`Data is uncomplated! ❌`);
      }
      if (await UsersSchama.findOne({ email })) {
        throw new Error(`This email already exist`);
      }

      const newUser = await UsersSchama.create({
        username,
        email,
        gender,
        password: sha256(password),
      });

      if (!newUser) {
        throw new Error(`Registration failed! ❌`);
      }
      const confirmCode = sendConfirmationEmail(email, newUser._id);
      res.send({
        status: 201,
        message: "Ok, A confirmation code has been sent to your email!",
        success: true,
      });
    } catch (error) {
      res.send({
        status: 400,
        success: false,
        message: error.message,
      });
    }
  }

  static async ConfirmCode(req: Request, res: Response) {
    try {
      let { confirm } = req.params;
      const findById = await UsersSchama.findById(confirm);
      if (findById != null) {
        res.send({
          status: 200,
          token: Jwt.Sign(confirm),
          message: "You have successfuly registered! ✅",
          success: true,
        });
      } else {
        throw new Error(`Invalid Password! ❌`);
      }
    } catch (error) {
      res.send({
        status: 400,
        success: false,
        message: error.message,
      });
    }
  }

  static async Login(req: Request, res: Response) {
    try {
      let { email, password } = req.body;
      if (!email || !password) {
        throw new Error(`Data  is uncomplated! ❌`);
      }

      let findUser = await UsersSchama.findOne({
        email,
        password: sha256(password),
      });

      if (findUser != null) {
        res.send({
          status: 200,
          token: Jwt.Sign(findUser._id),
          message: "Successfuly Authorized",
          success: true,
        });
      } else {
        throw new Error(`Not Found User!`);
      }
    } catch (error) {
      res.send({
        status: 401,
        message: `Error : ${error.message}`,
        success: false,
      });
    }
  }
  static async GetProfile(req: Request, res: Response) {
    try {
      let { token } = req.headers;
      let { user_id } = Jwt.Verify(token);
      let findById = await UsersSchama.findById(user_id);
      if (findById != null) {
        res.send({
          status: 200,
          message: "Your Profile",
          success: true,
          data: findById,
        });
      } else {
        throw new Error(`Not Found User! ❌`);
      }
    } catch (error) {
      res.send({
        status: 401,
        message: `Error : ${error.message}`,
        success: false,
      });
    }
  }

  static async EditProfile(req: Request, res: Response) {
    try {
      let { token } = req.headers;
      let { user_id } = Jwt.Verify(token);
      let { username, email, gender, password } = req.body;
      if(!username && !email && !gender && !password){
        throw new Error(`Not Found Target!`)
      }
      let findById = await UsersSchama.findById(user_id);
      if (findById == null) {
        throw new Error(`Not Found User! ❌`);
      }
      let updatedProfile = await UsersSchama.findByIdAndUpdate(user_id, {
        username,
        email,
        gender,
        password : sha256(password),
      }, {new : true});
      if (updatedProfile != null) {
        res.send({
          status: 200,
          message: "Profile Updated ✅",
          data: updatedProfile,
          success: true,
        });
      } else {
        throw new Error(`Not Updated Data!`);
      }
    } catch (error) {
      res.send({
        status: 400,
        message: `Error : ${error.message}`,
        success: false,
      });
    }
  }

  static async DeleteProfile(req:Request, res:Response){
    try {
        let { token } = req.headers;
        let { user_id } = Jwt.Verify(token);
        let findById = await UsersSchama.findById(user_id);
        if(findById == null){
            throw new Error(`Not Found User`)
        }
        let deletedProfile = await UsersSchama.findByIdAndDelete(user_id);
        res.send({
            status : 200,
            data : deletedProfile,
            message : 'OK, Profile Deleted successfuly! ✅ ',
            success : true
        })
    } catch (error) {
        res.send({
            status: 400,
            message: `Error : ${error.message}`,
            success: false,
          });
    }
  }
}
