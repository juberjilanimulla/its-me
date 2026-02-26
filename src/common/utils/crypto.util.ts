import * as CryptoJS from 'crypto-js';

export class CryptoUtil {

  private static secretKey = process.env.CRYPTO_SECRET || 'defaultSecretKey';

  /**
   * Encrypt Data (AES)
   */
  static encrypt(data: any): string {
    try {
      const jsonData = JSON.stringify(data);

      const encrypted = CryptoJS.AES.encrypt(
        jsonData,
        this.secretKey,
      ).toString();

      return encrypted;

    } catch (error) {
      throw new Error('Encryption failed');
    }
  }

  /**
   * Decrypt Data (AES)
   */
  static decrypt(data: string): any {
    if(process.env.ISENCRYPTED_PAYLOAD === 'true') {
    try {
      const bytes = CryptoJS.AES.decrypt(
        data,
        this.secretKey,
      );

      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

      if (!decryptedData) {
        throw new Error('Invalid encrypted payload');
      }

      return JSON.parse(decryptedData);

    } catch (error) {
      throw new Error('Decryption failed');
    }
  } else{
    return data;
  }
}
}