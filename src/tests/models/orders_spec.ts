import { Order, OrderInfo } from "../../models/orders";
import { User, UserInfo } from "../../models/users";
import { ProductInfo, Product } from "../../models/products";

const order = new Order();
const user = new User();
const product = new Product();

describe(`Order Model:
        Check existance of each CRUD functions inside the model :
        ---------------------------------------------------------
        `, () => {
  it("1 - should have an index method", () => {
    expect(order.index).toBeDefined();
  });
  it("2 - should have an show method", () => {
    expect(order.show).toBeDefined();
  });
  it("3 - should have an create method", () => {
    expect(order.create).toBeDefined();
  });
  it("4 - should have an delete method", () => {
    expect(order.delete).toBeDefined();
  });
});

describe(`Order Model:
        Check functionallity of each method inside the model :
        ---------------------------------------------------------
        `, () => {
  beforeAll(async () => {
    const newUser = await user.create({
      firstName: "Allie",
      lastName: "Grater",
      username: "agrater",
      password: "123",
    });
  });

  it("1 - Test Create methode", async () => {
    const result = await order.create({
      status: "active",
      user_id: 1,
    });
    expect(result.status).toEqual("active");
  });

  it("2 - Test Show methode", async () => {
    const result = await order.show("1");
    expect(result).toEqual({
      id: 1,
      status: "active",
      // @ts-ignore
      user_id: "1",
    });
  });

  it("3 - Test index method", async () => {
    const result = await order.index();
    expect(result).toEqual([
      {
        id: 1,
        status: "active",
        // @ts-ignore
        user_id: "1",
      },
    ]);
  });
  it("4 - Test Update methode", async () => {
    const result = await order.update("1", {
      status: "completed",
      user_id: 1,
    });
    expect(result.status).toEqual("completed");
  });

  it("5 - Test Add Products to Order methode", async () => {
    const newProduct = await product
      .create({
        name: "Product 1",
        price: 100,
        category: "Product category",
      })
      .then(async (newProduct) => {
        const result = await order.addProduct({
          quantity: 300,
          // @ts-ignore
          orderId: "1",
          // @ts-ignore
          productId: newProduct.id,
        });
        expect(result).toEqual({
          // @ts-ignore
          id: 1,
          quantity: 300,
          order_id: "1",
          product_id: "1",
        });
      });
  });

  it("6 - Test delete method", async () => {
    const result = await order.delete("1");
    //@ts-ignore
    expect(result).toEqual({
      id: 1,
      status: "completed",
      // @ts-ignore
      user_id: "1",
    });
  });
});
