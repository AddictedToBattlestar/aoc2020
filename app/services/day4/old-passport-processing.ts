import Service from '@ember/service';

export default class Day4PassportProcessing extends Service.extend({
}) {
  public countValidPassports(passportData: Array<string>): number {
    debugger;
    console.log(`Day 4, passportData: "${passportData}"`);
    let currentPassport: any = {};
    let validPassportCount = 0;
    // for (let passportDataLine in passportData) {
    //   console.log(`Day 4, processing line: "${passportDataLine}"`);
    //   debugger;
    //     if (this.isPassportValid(currentPassport)) {
    //   if (passportDataLine.length === 0) {
    //       validPassportCount++;
    //     }
    //     currentPassport = {};
    //   } else {
    //     for (let passportField in passportDataLine.split(" ")) {
    //       const parsedPassportField = passportField.split(":");
    //       currentPassport[parsedPassportField[0]] = parsedPassportField[1];
    //     }
    //   }
    // }
    // if (this.isPassportValid(currentPassport)) {
    //   validPassportCount++;
    // }
    return validPassportCount;
  }

  private isPassportValid(passport: any) {
    return passport["byr"]
      && passport["iyr"]
      && passport["eyr"]
      && passport["hgt"]
      && passport["hcl"]
      && passport["ecl"]
      && passport["pid"];
      // && passport["cid"];
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'day4/old-passport-processing': Day4PassportProcessing;
  }
}
