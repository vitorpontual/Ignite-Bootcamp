import { SES } from 'aws-sdk';
import fs from "fs";
import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import { injectable } from "tsyringe";


import { IMailProvider } from "../IMailProvider";

@injectable()
export class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: "us-east-1"
      })
    })
  }

  async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8")

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: "Rentx <dev@vpontual.com>",
      subject,
      html: templateHTML
    });

  }

}
