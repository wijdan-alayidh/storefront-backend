import { request } from "express";
import Client from "../server/database";
import bcrypt from "bcrypt";

const papper: string = process.env.BCRYPT_PASSWORD || "";

export type UserInfo = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

export class User {
  /* --- Show all users --- */

  async index(): Promise<UserInfo[]> {
    try {
      // open database connection
      const dbConnect = await Client.connect();
      const sql = `SELECT * FROM users`;

      const result = await dbConnect.query(sql);
      // Close the database connection
      dbConnect.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to get users : -> ${error}`);
    }
  }

  /* --- Show single user --- */

  async show(id: string): Promise<UserInfo> {
    try {
      //   open database connection
      const dbConnect = await Client.connect();

      const sql = `SELECT * FROM users WHERE id=($1)`;

      const result = await dbConnect.query(sql, [id]);
      // Close the database connection
      dbConnect.release();

      const userData = {
        id: result.rows[0].id,
        firstname: result.rows[0].firstname,
        lastname: result.rows[0].lastname,
        username: result.rows[0].username,
      };

      // @ts-ignore
      return userData;
    } catch (error) {
      throw new Error(`unable to get user : ${id} -> ${error}`);
    }
  }

  /* --- Delete user --- */
  async delete(id: string): Promise<UserInfo> {
    try {
      const sql = "DELETE FROM users WHERE id=($1) RETURNING *";
      //   open database connection
      const dbConnect = await Client.connect();

      const result = await dbConnect.query(sql, [id]);
      dbConnect.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to get user : ${id}. Error: ${error}`);
    }
  }

  /* --- Create new user --- */

  async create(user: UserInfo): Promise<UserInfo> {
    try {
      // @ts-ignore

      //   open database connection
      const dbConnect = await Client.connect();

      const sql = `INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3, $4) RETURNING *`;

      //   Applying the query to the database
      const result = await dbConnect.query(sql, [
        user.firstName,
        user.lastName,
        user.username,
        user.password,
      ]);

      const newUser = result.rows[0];

      //   close the database connection
      dbConnect.release();
      return newUser;
    } catch (error) {
      throw new Error(
        `unable to create the user : (${user.username}) -> ${error}`
      );
    }
  }

  /* --- Update  User --- */
  async update(id: string, user: UserInfo): Promise<UserInfo> {
    try {
      //   open database connection
      const dbConnect = await Client.connect();
      const sql = `UPDATE users SET firstname = $1, lastname = $2, username = $3, password = $4 WHERE  id = $5 RETURNING *`;
      const result = await dbConnect.query(sql, [
        user.firstName,
        user.lastName,
        user.username,
        user.password,
        id,
      ]);

      const updatedUser = await result.rows[0];
      //   close the database connection
      dbConnect.release();

      return await updatedUser;
    } catch (error) {
      throw new Error(`unable to Update user information : ${error}`);
    }
  }

  /* --- Authenticate the user --- */
  // async authenticate(
  //   username: string,
  //   password: string
  // ): Promise<UserInfo | null> {
  //   try {
  //     // @ts-ignore

  //     //   open database connection
  //     const dbConnect = await Client.connect();
  //     const sql = `SELECT password FROM users WHERE username=($1) RETURNING *`;

  //     //   Applying the query to the database
  //     const result = await dbConnect.query(sql, [username]);

  //     console.log(password + papper);

  //     if (result.rows.length) {
  //       const user = result.rows[0];

  //       console.log(user);

  //       // This method will compare the ( password send it from the request + papper value ) with (password saved in database)
  //       if (bcrypt.compareSync(password + papper, password)) {
  //         return user;
  //       }
  //     }

  //     // close the database connection
  //     dbConnect.release();

  //     return null;
  //   } catch (error) {
  //     throw new Error(`unable to create the user : (${username}) -> ${error}`);
  //   }
  // }
}
