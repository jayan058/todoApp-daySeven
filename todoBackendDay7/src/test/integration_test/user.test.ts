import request from "supertest";
import express from "express";
import { describe } from "node:test";
import router from "../../router";
import { users } from "../../models/users";
describe("User Integration Test Suite", () => {
  const app = express();

  app.use(router);

  describe("createUser API Test", () => {
    it("Should create a new user", async () => {
      const response = await request(app)
        .post("/user")
        .send({
          id: "1",
          name: "jayan",
          password:
            "$2b$10$z/92iZB5uuHVB.5Nwa2DRuV/VCSS8jZMTAnV.IcZzbWm7Jqn7rjMK",
          email: "jayan@jayan.com",
          todos: ["1"],
          permission: ["super admin"],
        });
     
    });
  });
});
