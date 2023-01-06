import express, { Request, Response } from "express";
import { ProductInfo, Product } from "../models/products";

const product = new Product();

/**
 *  Product class handler : handle the requests and expected responses
 */
export default class ProductHandler {
  /**
   *  Show all prdocuts
   */

  async indexProduct(req: express.Request, res: express.Response) {
    try {
      const products = await product.index();
      // Test the return value from index method on model
      if (products[0] == null) res.send(`No products found`);
      else res.send(products);
    } catch (error) {
      res.status(400);
      // @ts-ignore
      res.json(error);
    }
  }

  /**
   *  Show single product
   */

  async showProduct(req: express.Request, res: express.Response) {
    // with ids I need to use (req.params) instesd of using (req.body) to get the id value
    const productId = await req.params.id;

    try {
      const products = await product.show(String(productId));

      // Test the return value from show method on model
      if (products == null) res.send(`No product found`);
      else res.send(products);
    } catch (error) {
      res.status(400);
      // @ts-ignore
      res.json(error);
    }
  }

  /**
   *  Delete  product handler
   */

  async deleteProduct(req: express.Request, res: express.Response) {
    const productId = req.params.id;
    try {
      const products = await product.delete(String(productId));
      // Test the return value from delete method on model
      if (products == null)
        res.send(`The product you tried to delete is not found`);
      else res.send(`The product ${products.name} deleted`);
    } catch (error) {
      res.status(400);
      // @ts-ignore
      res.json(error);
    }
  }

  /**
   *  Create new Product handler
   */
  async createProduct(req: express.Request, res: express.Response) {
    // await until receving the request body
    const requestBody = await req.body;

    // get the Product object

    // @ts-ignore
    const productInfo: ProductInfo = {
      name: requestBody.name as string,
      price: requestBody.price as number,
      category: requestBody.category as string,
    };

    try {
      // create new Product by using create method in model
      const newProduct = await product.create(productInfo);

      res.status(200);
      res.send(`The product: ${newProduct.name} created correctly`);
      // res.send(newProduct);
    } catch (error) {
      res.status(400);
      // @ts-ignore
      res.json(error + product);
    }
  }

  /**
   *  Update  Product handler
   */
  async updateProduct(req: express.Request, res: express.Response) {
    // await until receving the request body
    const requestBody = await req.body;

    const id = await req.params.id;

    const productInfo: ProductInfo = {
      name: requestBody.name as string,
      price: requestBody.price as number,
      category: requestBody.category as string,
    };

    try {
      const newOrder = await product.update(id, productInfo);
      res.status(200);
      res.send(`Your Product updated sucessfuly`);
    } catch (error) {
      res.status(400);
      // @ts-ignore
      res.json(error + newOrder);
    }
  }
}
