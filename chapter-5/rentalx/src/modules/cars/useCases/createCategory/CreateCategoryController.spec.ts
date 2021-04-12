import request from "supertest";
import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid"

import { Connection } from "typeorm";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm"

let connection: Connection;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();

    const password = await hash("admin", 8);
  
    await connection.query(`
    INSERT INTO users(
      id,
      name,
      password,
      email,
      "isAdmin",
      driver_license,
      created_at
      ) VALUES ('${id}', 'admin', '${password}', 'admin@admin.com', true, 'XXX-3333', 'now()')
      `);
  })

  
  afterAll(async () => { 
    await connection.dropDatabase();
    await connection.close();

  })

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@admin.com",
      password: "admin"

    })

    const { refresh_token } = responseToken.body

    const response = await request(app).post("/categories")
    .send({
      name: "Category Supertest",
      description: "Supertest Description"
    }).set({
      Authorization: `Bearer ${ refresh_token }`
    })

   

    expect(response.status).toBe(201)
  })

  it("should not be able to create a new category with name exists", async () => {

    const responseToken = await request(app).post("/sessions").send({
      email: "admin@admin.com",
      password: "admin"
    })

    const {refresh_token} = responseToken.body

    const response = await request(app).post("/categories")
    .send({
      name: "Category Supertest",
      description: "Supertest Description"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    })

    expect(response.status).toBe(400)
  })

})