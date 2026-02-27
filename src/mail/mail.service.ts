import {Injectable} from "@nestjs/common"
import * as nodemailer from 'nodemailer';


@Injectable()
export class MailService{
    private transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS,
        }
    })

    async sendWelcomeEmail(email:string,firstname:string,password:string){
        const mailOptions={
            from:`Chrona Dev <${process.env.MAIL_USER}>`,
            to:email,
            subject:'Welcome to Chrona Dev',
            text:`Hello ${firstname},\n\nWelcome to Chrona Dev! Your account has been created successfully.\n\nYour temporary password is: ${password}\n\nPlease log in and change your password as soon as possible.\n\nBest regards,\nThe Chrona Dev Team`
        }
        await this.transporter.sendMail(mailOptions);
    }
}   
