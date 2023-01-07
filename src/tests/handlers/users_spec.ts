import supertest from "supertest";
import UserHandler from "../../handlers/users";
import app from "../../server/server";

const request = supertest(app);
const user = new UserHandler();

describe(`Users Handler:
        Check existance of each CRUD functions inside the model :
        ---------------------------------------------------------
        `, () => {
  it("1 - should have an index method", () => {
    expect(user.indexUser).toBeDefined();
  });
  it("2 - should have an show method", () => {
    expect(user.showUser).toBeDefined();
  });
  it("3 - should have an create method", () => {
    expect(user.createUser).toBeDefined();
  });
  it("4 - should have an update method", () => {
    expect(user.updateUser).toBeDefined();
  });
  it("5 - should have an delete method", () => {
    expect(user.deleteUser).toBeDefined();
  });
});

describe(`Users Handler:
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
    request
      .post("/users/create")
      .send({
        firstName: "Allie",
        lastName: "Grater",
        username: "agrater",
        password: "123",
      })
      .expect(200);
  });
  it("2 - Test Show method", async () => {
    await userToken.then((userToken) => {
      request
        .post("/users/1")
        .set("Authorization", `Bearer ${userToken}`)
        .expect({
          id: 2,
          firstname: "Grater",
          lastname: "Allie",
          username: "gallie",
        });
    });
  });
  it("3 - Test index method", async () => {
    await userToken.then((userToken) => {
      request
        .post("/users")
        .set("Authorization", `Bearer ${userToken}`)
        .expect(200);
    });
  });
  it("4 - Test Update method", async () => {
    await userToken.then((userToken) => {
      const userInfo = {
        firstName: "Allie",
        lastName: "Grater",
        username: "agrater",
        password: "00000",
      };
      request
        .put("/users/1")
        .set("Authorization", `Bearer ${userToken}`)
        .send(userInfo)
        .expect(`User information updated sucessfuly`);
    });
  });
  it("5 - Test Delete method", async () => {
    await userToken.then((userToken) => {
      request
        .delete("/users/1")
        .set("Authorization", `Bearer ${userToken}`)
        .expect(`The User agrater deleted`);
    });
  });
});
