import express from "express";
import { UserInfo, User } from "../models/users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import bcrypt
import bcrypt from "bcrypt";

dotenv.config();

const salt_rounds: string = process.env.SALT_ROUNDS || "";
const papper: string = process.env.BCRYPT_PASSWORD || "";
const token_secret: string = process.env.TOKEN_SECRET || "";

const user = new User();

/**
 *  User class handler : handle the requests and expected responses
 */
export default class UserHandler {
  /**
   *  Show all users
   */

  async indexUser(req: express.Request, res: express.Response) {
    try {
      const users = await user.index();
      // Test the return value from index method on model
      if (users[0] == null) res.send(`No users found`);
      else res.send(users);
    } catch (error) {
      res.status(400);
      // @ts-ignore
      res.json(error);
    }
  }

  /**
   *  Show single user
   */

  async showUser(req: express.Request, res: express.Response) {
    // with ids I need to use (req.params) instesd of using (req.body) to get the id value
    const userId = await req.params.id;

    try {
      const users = await user.show(String(userId));
      // Test the return value from show method on model
      if (users == null) res.send(`No user found`);
      else res.send(users);
    } catch (error) {
      res.status(400);
      // @ts-ignore
      res.json(error);
    }
  }

  /**
   *  Delete  User handler
   */

  async deleteUser(req: express.Request, res: express.Response) {
    const userId = req.params.id;
    try {
      const users = await user.delete(String(userId));
      // Test the return value from delete method on model
      if (users == null) res.send(`The User you tried to delete is not found`);
      else res.send(`The User ${users.username} deleted`);
    } catch (error) {
      res.status(400);
      // @ts-ignore
      res.json(error);
    }
  }

  /**
   *  Create new users handler
   */
  async createUser(req: express.Request, res: express.Response) {
    // await until receving the request body
    const requestBody = await req.body;

    // Hashing the password
    const hash = bcrypt.hashSync(
      requestBody.password + papper,
      parseInt(salt_rounds)
    );

    // get the user object

    // @ts-ignore
    const userInfo: UserInfo = {
      firstName: requestBody.firstName as string,
      lastName: requestBody.lastName as string,
      username: requestBody.username as string,
      password: hash,
    };

    try {
      // create new user by using create method in model
      const newUser = await user.create(userInfo);

      // authanticate the permission of creating new user by jwt
      const token = jwt.sign({ user: newUser }, token_secret);
      res.json(token);
    } catch (error) {
      res.status(400);
      // @ts-ignore
      res.json(error + user);
    }
  }
  /**
   *  Update User handler
   */
  async updateUser(req: express.Request, res: express.Response) {
    // await until receving the request body
    const requestBody = await req.body;

    const id = await req.params.id;

    // Hashing the password
    const hash = bcrypt.hashSync(
      requestBody.password + papper,
      parseInt(salt_rounds)
    );

    const userInfo: UserInfo = {
      firstName: requestBody.firstName as string,
      lastName: requestBody.lastName as string,
      username: requestBody.username as string,
      password: hash,
    };

    try {
      const updatedUser = await user.update(id, userInfo);
      res.status(200);
      res.send(`User information updated sucessfuly`);
    } catch (error) {
      res.status(400);
      // @ts-ignore
      res.json(error + updatedUser);
    }
  }

  /**
   * Authinticate user password handler
   */

  // async AuthUser(req: express.Request, res: express.Response) {
  //   // await until receving the request body
  //   const requestBody = await req.body;

  //   // @ts-ignore
  //   const userInfo: UserInfo = {
  //     username: requestBody.username as string,
  //     password: requestBody.password as string,
  //   };

  //   try {
  //     const authUser = await user.authenticate(
  //       userInfo.username,
  //       userInfo.password
  //     );
  //     let token = jwt.sign(
  //       { user: authUser },
  //       token_secret,
  //       {
  //         expiresIn: "180000s",
  //       },
  //       function (error, token) {
  //         if (error) {
  //           console.log(error);
  //         } else {
  //           console.log(token);
  //         }
  //       }
  //     );

  //     res.json(token);
  //   } catch (error) {
  //     res.status(401);
  //     res.json(error);
  //   }
  // }
}
