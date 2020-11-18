import { Request, Response } from 'express';
import * as nodemailer from 'nodemailer';
import { createMailToken, verifyToken } from '../../../../lib/token';
import { SERVER } from '../../../../lib/store';
import { info } from 'console';

export default async (req: Request, res: Response) => {
  type RequestBody = {
    email: string;
  };

  const { email }: RequestBody = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mailverify1234@gmail.com',
        pass: 'wndqls4337'
      }
    });

    const token = createMailToken(email);

    const mailOption = {
      from: 'mailverify1234@gmail.com',
      to: email,
      subject: 'Growing Discrops메일 인증을 해주세요!',
            html: ' <center> <p>아래의 링크를 클릭하여 email인증을 해주세요!</p> <br/>' + `<a href='${SERVER}/auth/email/mailCheck/?tokenM=` + token + "'>인증하기</a> <br/>" + "<p>만약 자신이 요청한 것이 아니면</p> <a href='https://www.facebook.com/profile.php?id=100010144092898'>FaceBook</a>" + "<p>로 문의주세요</p>",
    };

    await transporter.sendMail(mailOption, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log('Email send: ' + info.response);
      }
    });

    return res.status(200).json({
      message: "메일 발송 성공!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "서버 오류",
    });
  }
}