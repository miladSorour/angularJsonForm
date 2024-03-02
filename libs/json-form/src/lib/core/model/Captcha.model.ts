export class Captcha {
  constructor(public accessKey: string,
              public encodedImage: string,
              public captcha: string) {
  }
}
