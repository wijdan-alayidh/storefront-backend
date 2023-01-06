import express, { Request, Response } from "express";
import { Order, OrderInfo, Product } from "../models/orders";

const order = new Order();

/**
 *  Orders class handler : handle the requests and expected responses
 */
export default class OrderHandler {
  /**
   *  Show all orders
   */

  async indexOrder(req: express.Request, res: express.Response) {
    try {
      const orders = await order.index();
      // Test the return value from index method on model
      if (orders[0] == null) res.send(`No orders found`);
      else res.send(orders);
    } catch (error) {
      res.status(400);
      // @ts-ignore
      res.json(error);
    }
  }

  /**
   *  Show single order
   */

  async showOrder(req: express.Request, res: express.Response) {
    const orderId = await req.params.id;
    try {
      const orders = await order.show(String(orderId));
      // Test the return value from show method on model
      if (orders == null) res.send(`No order found`);
      else res.send(orders);
    } catch (error) {
      res.status(400);
      // @ts-ignore
      res.json(error);
    }
  }

  /**
   *  Create new order handler
   */
  async createOrder(req: express.Request, res: express.Response) {
    // await until receving the request body
    const requestBody = await req.body;

    const orderInfo: OrderInfo = {
      status: requestBody.status as string,
      user_id: requestBody.user_id as number,
    };

    try {
      const newOrder = await order.create(orderInfo);
      res.status(200);
      res.send(`Your order created sucessfuly`);
    } catch (error) {
      res.status(400);
      // @ts-ignore
      res.json(error + product);
    }
  }

  /**
   *  Update  order handler
   */
  async updateOrder(req: express.Request, res: express.Response) {
    // await until receving the request body
    const requestBody = await req.body;

    const id = await req.params.id;

    const orderInfo: OrderInfo = {
      status: requestBody.status as string,
      user_id: requestBody.user_id as number,
    };

    try {
      const newOrder = await order.update(id, orderInfo);
      res.status(200);
      res.send(`Your order updated sucessfuly`);
    } catch (error) {
      res.status(400);
      // @ts-ignore
      res.json(error + newOrder);
    }
  }

  /**
   *  Delete  order handler
   */

  async deleteOrder(req: express.Request, res: express.Response) {
    const orderId = req.params.id;
    try {
      const orders = await order.delete(String(orderId));
      // Test the return value from delete method on model
      if (orders == null)
        res.send(`The Order you tried to delete is not found`);
      else res.send(`The Order deleted`);
    } catch (error) {
      res.status(400);
      // @ts-ignore
      res.json(error);
    }
  }

  /**
   *  Add Product to order handler
   */

  async addProduct(req: express.Request, res: express.Response) {
    // await until receving the request body
    const requestBody = await req.body;

    const product: Product = {
      orderId: req.params.id as string,
      productId: requestBody.product_id as string,
      quantity: parseInt(requestBody.quantity) as number,
    };

    try {
      const addedProduct = await order.addProduct(product);
      res.json(addedProduct);
    } catch (error) {
      res.status(400);
      res.json(error);
    }
  }
}
