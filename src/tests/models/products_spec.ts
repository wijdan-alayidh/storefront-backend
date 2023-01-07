import { ProductInfo, Product } from "../../models/products";

const product = new Product();

describe(`Products Model:
        Check existance of each CRUD functions inside the model :
        ---------------------------------------------------------
        `, () => {
  it("1 - should have an index method", () => {
    expect(product.index).toBeDefined();
  });
  it("2 - should have an show method", () => {
    expect(product.show).toBeDefined();
  });
  it("3 - should have an create method", () => {
    expect(product.create).toBeDefined();
  });
  it("4 - should have an update method", () => {
    expect(product.update).toBeDefined();
  });
  it("5 - should have an delete method", () => {
    expect(product.delete).toBeDefined();
  });
});

describe(`Products Model:
        Check functionallity of each method inside the model :
        ---------------------------------------------------------
        `, () => {
  it("1 - Test Create method", async () => {
    const result = await product.create({
      name: "Product 1",
      price: 100,
      category: "Product category",
    });
    expect(result).toEqual({
      // @ts-ignore
      id: 2,
      name: "Product 1",
      price: 100,
      category: "Product category",
    });
  });

  it("2 - Test Show method", async () => {
    const result = await product.show("2");
    expect(result).toEqual({
      // @ts-ignore
      id: 2,
      name: "Product 1",
      price: 100,
      category: "Product category",
    });
  });

  it("3 - Test index method", async () => {
    const result = await product.index();
    expect(result.length).toEqual(2);
  });

  it("4 - Test Update method", async () => {
    const result = await product.update("1", {
      name: "Product 2",
      price: 200,
      category: "Product category",
    });
    // @ts-ignore
    expect(result.price).toEqual(200);
  });

  it("5 - Test delete method", async () => {
    const result = await product.delete("1");
    //@ts-ignore
    expect(result).toEqual({
      // @ts-ignore
      id: 1,
      name: "Product 2",
      price: 200,
      category: "Product category",
    });
  });
});
