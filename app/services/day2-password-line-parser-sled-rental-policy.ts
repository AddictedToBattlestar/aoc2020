
export default class Day2PasswordLineParserSledRentalPolicy {
  minumumCount: number;
  maximumCount: number;
  characterToCount: string;
  characterTally: any;
  password: string;
  isValid: boolean;
  constructor(rawPasswordLine: string) {
    const lineChunks: Array<string> = rawPasswordLine.split(" ");

    const passwordCounts: Array<string> = lineChunks[0].split("-");
    this.minumumCount = Number(passwordCounts[0]);
    this.maximumCount = Number(passwordCounts[1]);

    this.characterToCount = lineChunks[1][0];

    this.password = lineChunks[2];

    this.characterTally = this.password.split("").reduce((acc: any, char: string) => {
      acc[char] = (acc[char] || 0) + 1;
      return acc;
    }, {});

    const minimumValid = this.minumumCount <= this.characterTally[this.characterToCount];
    const maximumValid = this.maximumCount >= this.characterTally[this.characterToCount];
    this.isValid = minimumValid && maximumValid;
  }
}
