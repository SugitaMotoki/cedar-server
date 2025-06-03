import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    console.log({
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    });
    return "Hello World!";
  }
}
