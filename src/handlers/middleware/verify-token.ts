import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const token_secret: string = process.env.TOKEN_SECRET || "";

/*
 * This solution is inspired by this source:
 *      https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
 */

// @ts-ignore
async function verifyAuthToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<express.Response<any, Record<string, any>> | undefined> {
  const authHeader = req.headers.authorization;
  try {
    // @ts-ignore
    const token = authHeader.split(" ")[1];

    if (token == null) {
      return res.sendStatus(401);
    } else {
      jwt.verify(token, token_secret as string, (error: any, user: any) => {
        console.log(error);
        if (error) {
          return res.send(error);
        } else {
          // @ts-ignore
          req.user = user;
        }
      });
    }

    next();
  } catch (error) {
    res.status(401);
  }
}

export default verifyAuthToken;
