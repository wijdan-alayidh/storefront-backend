import supertest from "supertest";
import ProductHandler from "../../handlers/products";
import app from "../../server/server";

const request = supertest(app);
const product = new ProductHandler();

describe(`Products Handler:
        Check existance of each CRUD functions inside the model :
        ---------------------------------------------------------
        `, () => {
  it("1 - should have an index method", () => {
    expect(product.indexProduct).toBeDefined();
  });
  it("2 - should have an show method", () => {
    expect(product.showProduct).toBeDefined();
  });
  it("3 - should have an create method", () => {
    expect(product.createProduct).toBeDefined();
  });
  it("4 - should have an update method", () => {
    expect(product.updateProduct).toBeDefined();
  });
  it("4 - should have an delete method", () => {
    expect(product.deleteProduct).toBeDefined();
  });
});

describe(`Products Handler:
        Check functionallity of each method inside the handler :
        ---------------------------------------------------------
        `, () => {
  const userToken = request.post("/users/create").send({
    firstName: "Allie",
    lastName: "Grater",
    username: "agrater",
    password: "123",
  });

  it("1 - Test Create method", async () => {
    await userToken.then((userToken) => {
      const productInfo = {
        name: "Product 1",
        price: 100,
        category: "Product category",
      };
      request
        .post("/products/create")
        .set("Authorization", `Bearer ${userToken}`)
        .send(productInfo)
        .expect(`The product: ${productInfo.name} created correctly`);
    });
  });
  it("2 - Test Show method", async () => {
    await userToken.then((userToken) => {
      request
        .post("/products/1")
        .set("Authorization", `Bearer ${userToken}`)
        .expect({
          id: 1,
          name: "Product 1",
          price: 100,
          category: "Product category",
        });
    });
  });
  it("3 - Test index method", async () => {
    await userToken.then((userToken) => {
      request
        .post("/products")
        .set("Authorization", `Bearer ${userToken}`)
        .expect([
          {
            id: 1,
            name: "Product 1",
            price: 100,
            category: "Product category",
          },
        ]);
    });
  });
  it("4 - Test Update method", async () => {
    await userToken.then((userToken) => {
      const productInfo = {
        name: "Product 2",
        price: 100,
        category: "New Product category",
      };
      request
        .put("/products/1")
        .set("Authorization", `Bearer ${userToken}`)
        .send(productInfo)
        .expect(`Your Product updated sucessfuly`);
    });
  });
  it("5 - Test Delete method", async () => {
    await userToken.then((userToken) => {
      request
        .delete("/products/1")
        .set("Authorization", `Bearer ${userToken}`)
        .expect(`The product Product 2 deleted`);
    });
  });
});
