
export default class Day2PasswordLineParserTobboganRentalPolicy {
  firstLocation: number;
  secondLocation: number;
  characterToCheck: string;
  characterTally: any;
  password: string;
  isValid: boolean;
  constructor(rawPasswordLine: string) {
    const lineChunks: Array<string> = rawPasswordLine.split(" ");

    const passwordCounts: Array<string> = lineChunks[0].split("-");
    this.firstLocation = Number(passwordCounts[0]);
    this.secondLocation = Number(passwordCounts[1]);

    this.characterToCheck = lineChunks[1][0];

    this.password = lineChunks[2];

    const isFirstLocationMatching = this.password[this.firstLocation - 1] === this.characterToCheck;
    const isSecondLocationMatching = this.password[this.secondLocation - 1] === this.characterToCheck;
    this.isValid = (isFirstLocationMatching && !isSecondLocationMatching) || (!isFirstLocationMatching && isSecondLocationMatching);
  }
}
