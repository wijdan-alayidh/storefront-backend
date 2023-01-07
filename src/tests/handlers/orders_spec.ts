import supertest from "supertest";
import OrderHandler from "../../handlers/orders";

import app from "../../server/server";

const request = supertest(app);
const order = new OrderHandler();

describe(`Order Handler:
        Check existance of each CRUD functions inside the model :
        ---------------------------------------------------------
        `, () => {
  it("1 - should have an index method", () => {
    expect(order.indexOrder).toBeDefined();
  });
  it("2 - should have an show method", () => {
    expect(order.showOrder).toBeDefined();
  });
  it("3 - should have an create method", () => {
    expect(order.createOrder).toBeDefined();
  });
  it("4 - should have an update method", () => {
    expect(order.updateOrder).toBeDefined();
  });
  it("5 - should have an delete method", () => {
    expect(order.deleteOrder).toBeDefined();
  });
});

describe(`Order Handler:
        Check functionallity of each method inside the handler :
        ---------------------------------------------------------
        `, () => {
  // create user
  const userToken = request.post("/users/create").send({
    firstName: "Allie",
    lastName: "Grater",
    username: "agrater",
    password: "123",
  });

  it("1 - Test Create method", async () => {
    await userToken.then((userToken) => {
      const OrderInfo = {
        status: "active",
        user_id: 1,
      };
      request
        .post("/orders/create")
        .set("Authorization", `Bearer ${userToken}`)
        .send(OrderInfo)
        .expect(`Your order created sucessfuly`);
    });
  });
  it("2 - Test Show method", async () => {
    await userToken.then((userToken) => {
      request
        .post("/orders/1")
        .set("Authorization", `Bearer ${userToken}`)
        .expect({
          id: 1,
          status: "active",
          user_id: 1,
        });
    });
  });
  it("3 - Test index method", async () => {
    await userToken.then((userToken) => {
      request
        .post("/orders")
        .set("Authorization", `Bearer ${userToken}`)
        .expect([
          {
            id: 1,
            status: "active",
            user_id: 1,
          },
        ]);
    });
  });
  it("4 - Test Update method", async () => {
    await userToken.then((userToken) => {
      const orderInfo = {
        status: "completed",
        user_id: 1,
      };
      request
        .put("/orders/1")
        .set("Authorization", `Bearer ${userToken}`)
        .send(orderInfo)
        .expect(`Your order updated sucessfuly`);
    });
  });
  it("5 - Test Add Products to Order method", async () => {
    // await request
    //   create product

    const productInfo = {
      name: "Product 1",
      price: 100,
      category: "Product category",
    };

    await userToken
      .then((userToken) => {
        request
          .post("/products/create")
          .set("Authorization", `Bearer ${userToken}`)
          .send(productInfo);
      })
      .then(async () => {
        await userToken.then(() => {
          request
            .post("/orders/1/products")
            .set("Authorization", `Bearer ${userToken}`)
            .expect({
              id: 1,
              quantity: 300,
              order_id: "1",
              product_id: "1",
            });
        });
      });
  });
  it("6 - Test Delete method", async () => {
    await userToken.then((userToken) => {
      request
        .delete("/orders/1")
        .set("Authorization", `Bearer ${userToken}`)
        .expect(`The Order deleted`);
    });
  });
});
