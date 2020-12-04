import Service from '@ember/service';

export default class Day4PassportProcessing extends Service.extend({
}) {
  public countValidPassports(passportData: Array<string>, isUsingRevisedValidation: boolean): number {
    console.log(`Day 4, passportData: "${passportData}"`);
    let currentPassport: any = {};
    let validPassportCount = 0;
    for (let passportDataLine of passportData) {
      console.log(`Day 4, processing line: "${passportDataLine}"`);
      if (passportDataLine.length === 0) {
        if (this.isPassportValid(currentPassport, isUsingRevisedValidation)) {
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
    if (this.isPassportValid(currentPassport, isUsingRevisedValidation)) {
      validPassportCount++;
    }
    return validPassportCount;
  }

  private isPassportValid(passport: any, isUsingRevisedValidation: boolean) {
    debugger;
    if (isUsingRevisedValidation) {
      const isByrValid = passport["byr"] && this.isYearValid(passport["byr"], 1920, 2002);
      const isIyrValid = passport["iyr"] && this.isYearValid(passport["iyr"], 2010, 2020);
      const isEyrValid = passport["eyr"] && this.isYearValid(passport["eyr"], 2020, 2030);
      const isHgtValid = passport["hgt"] && this.isHeightValid(passport["hgt"]);
      const isHclValid = passport["hcl"] && this.isHairColorValid(passport["hcl"]);
      const isEclValid = passport["ecl"] && this.isEyeColorValid(passport["ecl"]);
      const isPidValid = passport["pid"] && this.isPassportIdValid(passport["pid"]);

      return isByrValid && isIyrValid && isEyrValid && isHgtValid && isHclValid && isEclValid && isPidValid;
      // && passport["cid"];
    }
    return passport["byr"]
      && passport["iyr"]
      && passport["eyr"]
      && passport["hgt"]
      && passport["hcl"]
      && passport["ecl"]
      && passport["pid"];
    // && passport["cid"];
  }

  private isYearValid(stringValue: string, startingYear: number, endingYear: number): boolean {
    if (stringValue.length !== 4) {
      return false;
    }
    const value = Number(stringValue);
    return endingYear >= value && value >= startingYear;
  }

  private isHeightValid(hgt: string): boolean {
    if (hgt.length > 2 && hgt.substring(hgt.length - 2) === 'in') {
      const height = Number(hgt.substring(0, hgt.length - 2));
      return !isNaN(height) && 76 >= height && height >= 59;
    }
    if (hgt.length > 2 && hgt.substring(hgt.length - 2) === 'cm') {
      const height = Number(hgt.substring(0, hgt.length - 2));
      return !isNaN(height) && 193 >= height && height >= 150;
    }
    return false;
  }

  private isHairColorValid(hcl: string): boolean {
    if (hcl.substring(0,1) !== "#" || hcl.length !== 7) {
      return false;
    }
    var regExp = new RegExp(/^[a-f0-9]+$/);
    return (regExp.test(hcl.substring(1)));
  }

  private isEyeColorValid(ecl: string): boolean {
    return ecl === "amb" || ecl === "blu" || ecl === "brn" || ecl === "gry" || ecl === "grn" || ecl === "hzl" || ecl === "oth";
  }

  private isPassportIdValid(pid: string) {
    return pid.length === 9 && !isNaN(Number(pid));
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'day4/passport-processing': Day4PassportProcessing;
  }
}
