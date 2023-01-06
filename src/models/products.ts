import express, { Request, Response } from "express";
import Client from "../server/database";

// Products type
export type ProductInfo = {
  name: string;
  price: number;
  category: string;
};

export class Product {
  /* --- Show all products --- */
  async index(): Promise<ProductInfo[]> {
    try {
      // open database connection
      const dbConnect = await Client.connect();
      const sql = `SELECT * FROM products`;

      const result = await dbConnect.query(sql);
      // Close the database connection
      dbConnect.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to get products : -> ${error}`);
    }
  }

  /* --- Show single product by id --- */
  async show(id: string): Promise<ProductInfo> {
    try {
      //   open database connection
      const dbConnect = await Client.connect();

      const sql = `SELECT * FROM products WHERE id=($1)`;

      const result = await dbConnect.query(sql, [id]);
      // Close the database connection
      dbConnect.release();

      const newProduct = result.rows[0];

      return newProduct;
    } catch (error) {
      throw new Error(`unable to get product : ${id} -> ${error}`);
    }
  }

  /* --- Delete product --- */
  async delete(id: string): Promise<ProductInfo> {
    try {
      const sql = "DELETE FROM products WHERE id=($1)  RETURNING *";
      //   open database connection
      const dbConnect = await Client.connect();

      const result = await dbConnect.query(sql, [id]);
      dbConnect.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to get product : ${id}. Error: ${error}`);
    }
  }

  /* --- Create new product --- */
  async create(product: ProductInfo): Promise<ProductInfo> {
    try {
      // @ts-ignore

      //   open database connection
      const dbConnect = await Client.connect();

      const sql = `INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *`;

      //   Applying the query to the database
      const result = await dbConnect.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);

      const newProduct = result.rows[0];

      //   close the database connection
      dbConnect.release();

      return newProduct;
    } catch (error) {
      throw new Error(
        `unable to create the product : (${product.name}) -> ${error}`
      );
    }
  }

  /* --- Update  product --- */
  async update(id: string, product: ProductInfo): Promise<ProductInfo> {
    try {
      //   open database connection
      const dbConnect = await Client.connect();
      const sql = `UPDATE products SET name = $1, price = $2, category = $3 WHERE  id = $4  RETURNING *`;
      const result = await dbConnect.query(sql, [
        product.name,
        product.price,
        product.category,
        id,
      ]);

      const newOrder = result.rows[0];
      //   close the database connection
      dbConnect.release();
      return newOrder;
    } catch (error) {
      throw new Error(`unable to Update the product : ${error}`);
    }
  }
}
