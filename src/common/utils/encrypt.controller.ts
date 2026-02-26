import { Controller, Post, Body, UseInterceptors } from "@nestjs/common";
import { CryptoUtil } from "./crypto.util";
import { NullInterceptor } from "../interceptors/null.interceptor"; 

@Controller('encrypt')
@UseInterceptors(NullInterceptor) 
export class EncryptController {

  @Post()
  encryptData(@Body() body: any) {
    const dataToEncrypt = body.data ?? body;
    const encrypted = CryptoUtil.encrypt(dataToEncrypt);
    return { payload: encrypted };  
  }
   @Post('decrypt')
  decryptData(@Body() body: any) {
    const decrypted = CryptoUtil.decrypt(body.payload);
    return decrypted;
  }
}