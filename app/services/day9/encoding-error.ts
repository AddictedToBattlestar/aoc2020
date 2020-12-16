import Service from '@ember/service';

export default class Day9EncodingError extends Service.extend({
}) {
  public findEncodingError(encodedData: Array<string>, preambleLength: number): number | undefined {
    for(let i = preambleLength; i < encodedData.length; i++) {
      let preambleData: Array<number> = this.buildPreamble(encodedData, i, preambleLength);
      const encodedNumber = Number(encodedData[i]);
      if(!this.isValidBasedOnPreamble(encodedNumber, preambleData)) {
        return Number(encodedData[i]);
      }
    }
    return undefined;
  }

  public findEncryptionWeakness(encodedStringData: Array<string>, encodingErrorValue: number): number | undefined {
    const encodedData: Array<number> = encodedStringData.map(e => Number(e));
    for(let i = 0; i < encodedData.length; i++) {
      let runningTotal = encodedData[i];
      let j = i + 1;
      while (runningTotal < encodingErrorValue && j < encodedData.length) {
        runningTotal += encodedData[j];
        if (runningTotal === encodingErrorValue) {
          const {lowestNumber, highestNumber} = this.findLowestAndHighestNumbersInRange(encodedData, i, j);
          return lowestNumber + highestNumber;
        }
        j++;
      }
    }
    return undefined;
  }

  private findLowestAndHighestNumbersInRange(encodedData: Array<number>, startingIndex: number, endingIndex: number): any {
    let lowestNumber: number = encodedData[startingIndex];
    let highestNumber: number = encodedData[startingIndex];
    for(let i = startingIndex; i <= endingIndex; i++) {
      if (lowestNumber > encodedData[i]) {
        lowestNumber = encodedData[i];
      }
      if (highestNumber < encodedData[i]) {
        highestNumber = encodedData[i];
      }
    }
    return {lowestNumber, highestNumber}
  }

  private buildPreamble(encodedData: Array<string>, startingIndex: number, preambleLength: number): Array<number> {
    let preambleData: Array<number> = [];
    for(let i = (startingIndex - preambleLength); i < startingIndex; i++) {
      preambleData.push(Number(encodedData[i]));
    }
    return preambleData;
  }

  private isValidBasedOnPreamble(encodedNumber: number, preambleData: Array<number>): boolean {
    for(let i = 0; i < preambleData.length; i++) {
      for(let j = 0; j < preambleData.length; j++) {
        if (i !== j && preambleData[i] + preambleData[j] === encodedNumber) {
          console.debug(`${preambleData[i]} + ${preambleData[j]} = ${encodedNumber}`);
          return true;
        }
      }
    }
    return false;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'day9/encoding-error': Day9EncodingError;
  }
}
