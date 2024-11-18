export class Template {
  codeTemplate(digitCode: string | number, minute: string | number = 10) {
    return `<p>your digit code is <b>${digitCode}</b>. this is available just for ${minute} minute.</p>`;
  }
}
