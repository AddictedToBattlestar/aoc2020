import Service from '@ember/service';
import Day2PasswordLineParser from './day2-password-line-parser';

export default class Day2PasswordPhilosophy extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  public getCountOfValidPasswords(passwordData: Array<string>): number {
    let validPasswordCount: number = 0;
    passwordData.forEach(passwordLine => {
      const parsedPasswordLine = new Day2PasswordLineParser(passwordLine);
      if (parsedPasswordLine.isValid) {
        validPasswordCount++;
      }
    });
    return validPasswordCount;
  }

}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'day2-password-philosophy': Day2PasswordPhilosophy;
  }
}
