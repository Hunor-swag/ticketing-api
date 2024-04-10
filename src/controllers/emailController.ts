import { Request, Response } from 'express';
import { Email } from '../types/typings';
import mailgun from 'mailgun-js';

const sendEmail = async (req: Request, res: Response) => {
  try {
    const { from_email, to_email, content, subject } = req.body;
    const email: Email = {
      from_email,
      to_email,
      content,
      subject,
      timestamp: new Date(),
    };

    const api_key = process.env.MAILGUN_API_KEY as string;
    const domain = process.env.MAILGUN_DOMAIN as string;
    const host = process.env.MAILGUN_HOST as string;
    // console.log(api_key, domain);
    const mg = mailgun({ apiKey: api_key, domain: domain, host: host });

    const data = {
      from: from_email,
      to: to_email,
      subject: subject,
      html: content,
    };

    mg.messages().send(data, function (error: any, body: any) {
      if (!error) {
        console.log(body);
      } else {
        console.log(error);
        throw new Error(error);
      }
    });

    res.status(200).send({
      success: true,
      message: 'Email sent successfully',
      data: email,
    });
  } catch (error: any) {
    res
      .status(500)
      .send({ success: false, data: null, message: error.message });
  }
};

export default { sendEmail };
