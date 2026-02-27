import {Injectable} from "@nestjs/common"
import * as nodemailer from 'nodemailer';
import {welcomeUser} from './templates/mail.templates'

@Injectable()
export class MailService{
    private transporter=nodemailer.createTransport({
        host:process.env.MAIL_HOST as string,
        port:Number(process.env.MAIL_PORT),
        secure:Number(process.env.MAIL_PORT) === 465, // true for 465, false for other ports
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS,
        },
        tls:{
            rejectUnauthorized: false
        }
    })
// Common send function - same as your sendMail() is mailUtils.ts

private async sendMail(to:string,subject:string,html:string){
    try{
        const info = await this.transporter.sendMail({
            from:process.env.MAIL_FORM,
            to,
            subject,
            html,
             replyTo: process.env.MAIL_REPLY
        });
        console.log(`Email sent: ${info.messageId}`);
        return true;
    }
    catch(error){
        console.error('Error sending email:',error);
        return false;
    }
}  


    async sendWelcomeEmail(email:string,firstName:string,password:string){
        const html = welcomeUser({ firstName, email, randomPassword: password });
    return this.sendMail(email, 'Welcome! Your Account Has Been Created', html);
    }
}   
