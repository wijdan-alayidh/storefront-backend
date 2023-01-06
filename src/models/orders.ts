import express, { Request, Response } from "express";
import Client from "../server/database";
import { ProductInfo } from "./products";

// Orders type
export type OrderInfo = {
  status: string;
  user_id: number;
};

// Order Product type
export type Product = {
  quantity: number;
  orderId: string;
  productId: string;
};

export class Order {
  /* --- Show all Orders --- */
  async index(): Promise<OrderInfo[]> {
    try {
      // open database connection
      const dbConnect = await Client.connect();

      const sql = `SELECT * FROM orders`;
      const result = await dbConnect.query(sql);

      // Close the database connection
      dbConnect.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to get Orders : -> ${error}`);
    }
  }
  /* --- Show single order by id --- */
  async show(id: string): Promise<OrderInfo> {
    try {
      // open database connection
      const dbConnect = await Client.connect();
      const sql = `SELECT * FROM orders WHERE id=($1)`;
      const result = await dbConnect.query(sql, [id]);

      // Close the database connection
      dbConnect.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to get Order : -> ${error}`);
    }
  }
  /* --- Create new order --- */
  async create(order: OrderInfo): Promise<OrderInfo> {
    try {
      //   open database connection
      const dbConnect = await Client.connect();
      const sql = `INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *`;
      const result = await dbConnect.query(sql, [order.status, order.user_id]);

      const newOrder = await result.rows[0];
      //   close the database connection
      dbConnect.release();
      return newOrder;
    } catch (error) {
      throw new Error(`unable to create the order : ${error}`);
    }
  }
  /* --- Update  order --- */
  async update(id: string, order: OrderInfo): Promise<OrderInfo> {
    try {
      //   open database connection
      const dbConnect = await Client.connect();
      const sql = `UPDATE orders SET status = $1, user_id = $2 WHERE  id = $3  RETURNING *`;
      const result = await dbConnect.query(sql, [
        order.status,
        order.user_id,
        id,
      ]);

      const newOrder = result.rows[0];
      //   close the database connection
      dbConnect.release();
      return newOrder;
    } catch (error) {
      throw new Error(`unable to Update the order : ${error}`);
    }
  }
  /* --- Delete order --- */
  async delete(id: string): Promise<OrderInfo> {
    try {
      const sql = "DELETE FROM orders WHERE id=($1) RETURNING *";
      //   open database connection
      const dbConnect = await Client.connect();

      const result = await dbConnect.query(sql, [id]);
      dbConnect.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to get order : ${id}. Error: ${error}`);
    }
  }

  /* --- Add Products to order --- */
  async addProduct(product: Product): Promise<OrderInfo> {
    try {
      //   open database connection
      const dbConnect = await Client.connect();
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      //@ts-ignore

      const result = await dbConnect.query(sql, [
        product.quantity,
        product.orderId,
        product.productId,
      ]);

      const order = result.rows[0];

      //   close the database connection
      dbConnect.release();

      return order;
    } catch (error) {
      throw new Error(
        `Could not add product ${product.productId} to order ${product.orderId}: ${error}`
      );
    }
  }
}
