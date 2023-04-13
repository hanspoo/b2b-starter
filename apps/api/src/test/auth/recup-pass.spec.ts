import nodemailer from "nodemailer";
import {
  dataSource,
  inicializarSistema,
  SolicitudAutenticarEmail,
} from "@starter-ws/db";
import request from "supertest";
import { app } from "../../app";
import { randomEmail, randomCseg } from "@starter-ws/shared";

const sendMailMock = jest.fn();
jest.mock("nodemailer");

// @ts-ignore
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });
beforeEach(() => {
  sendMailMock.mockClear();
  // @ts-ignore
  nodemailer.createTransport.mockClear();
});

beforeAll(async () => {
  await inicializarSistema();
});
const email = "admin@starter.com";
describe("solicitud recup pass", () => {
  it("con email valido da 200", async () => {
    const response = await request(app)
      .post("/api/auth/recover-pass")
      .send({ email });
    expect(response.status).toBe(200);
  });
  it("con email inexistente da 400", async () => {
    const response = await request(app)
      .post("/api/auth/recover-pass")
      .send({ email: randomEmail() });
    expect(response.status).toBe(400);
  });
});
describe("validar codigo seguridad", () => {
  it("con código válido da 200", async () => {
    const cseg = randomCseg();
    const repo = dataSource.getRepository(SolicitudAutenticarEmail);
    await repo.save(repo.create({ email, cseg }));

    const response = await request(app)
      .post("/api/auth/recover-pass")
      .send({ email, cseg });
    expect(response.status).toBe(200);
  });
  it("con email inválido da 400", async () => {
    const response = await request(app)
      .post("/api/auth/recover-pass")
      .send({ email: randomEmail() });
    expect(response.status).toBe(400);
  });
});
