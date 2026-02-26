import { Controller, Post, Body, UseInterceptors } from "@nestjs/common";
import { CryptoUtil } from "./crypto.util";

@Controller('encrypt')
export class EncryptController {

  @Post()
  encryptData(@Body() body: any) {
    const dataToEncrypt = body.data ?? body;
    const encrypted = CryptoUtil.encrypt(dataToEncrypt);
    return { result: encrypted };  
  }
   @Post('decrypt')
  decryptData(@Body() body: any) {
    const decrypted = CryptoUtil.decrypt(body.result);
    return decrypted;
  }
}