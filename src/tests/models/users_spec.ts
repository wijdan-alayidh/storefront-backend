import { User, UserInfo } from "../../models/users";

const user = new User();

describe(`Users Model:
        Check existance of each CRUD functions inside the model :
        ---------------------------------------------------------
        `, () => {
  it("1 - should have an index method", () => {
    expect(user.index).toBeDefined();
  });
  it("2 - should have an show method", () => {
    expect(user.show).toBeDefined();
  });
  it("3 - should have an create method", () => {
    expect(user.create).toBeDefined();
  });
  it("4 - should have an delete method", () => {
    expect(user.delete).toBeDefined();
  });
  it("5 - should have an update method", () => {
    expect(user.update).toBeDefined();
  });
});

describe(`Users Model:
        Check functionallity of each method inside the model :
        ---------------------------------------------------------
        `, () => {
  afterAll(async () => {
    const result = await user.delete("1");
    //@ts-ignore
    expect(result.username).toEqual("gallie");
  });

  it("1 - Test Create methode", async () => {
    const result = await user.create({
      firstName: "Allie",
      lastName: "Grater",
      username: "agrater",
      password: "123",
    });
    // @ts-ignore
    expect(result.username).toEqual("agrater");
  });

  it("2 - Test Show methode", async () => {
    const result = await user.show("1");
    expect(result.username).toEqual("agrater");
  });

  it("3 - Test index method", async () => {
    const result = await user.index();
    expect(result.length).toEqual(5);
  });

  it("4 - Test Update method", async () => {
    const result = await user.update("1", {
      firstName: "Grater",
      lastName: "Allie",
      username: "gallie",
      password: "12345",
    });
    // @ts-ignore
    expect(result.username).toEqual("gallie");
  });
});
