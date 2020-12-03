import Service from '@ember/service';
import Day2PasswordLineParserSledRentalPolicy from './day2-password-line-parser-sled-rental-policy';
import Day2PasswordLineParserTobboganRentalPolicy from './day2-password-line-parser-toboggan-rental-policy';

export default class Day2PasswordPhilosophy extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  public getCountOfValidPasswordsForSledRentals(passwordData: Array<string>): number {
    let validPasswordCount: number = 0;
    passwordData.forEach(passwordLine => {
      const parsedPasswordLine = new Day2PasswordLineParserSledRentalPolicy(passwordLine);
      if (parsedPasswordLine.isValid) {
        validPasswordCount++;
      }
    });
    return validPasswordCount;
  }

  public getCountOfValidPasswordsForTobogganRentals(passwordData: Array<string>): number {
    let validPasswordCount: number = 0;
    passwordData.forEach(passwordLine => {
      const parsedPasswordLine = new Day2PasswordLineParserTobboganRentalPolicy(passwordLine);
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
