import Service from '@ember/service';

export default class Day4PassportProcessing extends Service.extend({
}) {
  public countValidPassports(passportData: Array<string>): number {
    console.log(`Day 4, passportData: "${passportData}"`);
    let currentPassport: any = {};
    let validPassportCount = 0;
    for (let passportDataLine of passportData) {
      console.log(`Day 4, processing line: "${passportDataLine}"`);
      if (passportDataLine.length === 0) {
        if (this.isPassportValid(currentPassport)) {
          validPassportCount++;
          console.log("passport valid");
        } else {
          console.log("passport NOT valid");
        }
        currentPassport = {};
      } else {
        for (let passportField of passportDataLine.split(" ")) {
          const parsedPassportField = passportField.split(":");
          currentPassport[parsedPassportField[0]] = parsedPassportField[1];
        }
      }
    }
    if (this.isPassportValid(currentPassport)) {
      validPassportCount++;
    }
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
    'day4/passport-processing': Day4PassportProcessing;
  }
}
