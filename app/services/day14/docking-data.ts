import Service from '@ember/service';

export default class Day14DockingData extends Service.extend({
}) {
  public getSumOfAllValues(initializationData: Array<string>): number {
    let dataStorage: Array<number> = [];
    let mask: string = "";
    initializationData.forEach((lineData: string) => {
      if(lineData.substring(0, 4) === "mask") {
        mask = lineData.split("=")[1].trim();
      }
      else {
        const parsedLineData: Array<string> = lineData.split("=").map(l => l.trim());
        const valueProvided = Number(parsedLineData[1]);
        const valueToStore = this.getResultingValue(valueProvided, mask);
        const memoryLocation = Number(parsedLineData[0].substring(parsedLineData[0].indexOf("[") + 1, parsedLineData[0].length - 1));
        console.debug(`Memory location ${memoryLocation} being ${dataStorage[memoryLocation] ? "*overwritten*" : "set"} to ${valueToStore} (input originally was ${valueProvided})`);
        dataStorage[memoryLocation] = valueToStore;
      }
    });
    const result = dataStorage.reduce((a, b) => a + b, 0);
    return result;
  }

  public getResultingValue(valueToProcess: number, mask: string): number {
    let binaryArray: Array<number> = this.getBinaryArray(valueToProcess);
    const maskArray = mask.split("").reverse();
    for (let i = 0; i < maskArray.length; i++) {
      if(maskArray[i] !== "X") {
        if (i >= binaryArray.length) {
          this.expandBinaryArray(binaryArray, i);
        }
        binaryArray[i] = Number(maskArray[i]);
      }
    }
    const resultingNumber = this.getDecimal(binaryArray);
    return resultingNumber;
  }

  private expandBinaryArray(binaryArray: Array<number>, lengthNeeded: number) {
    for(let i = binaryArray.length; i <= lengthNeeded; i++) {
      binaryArray.push(0);
    }
  }

  private getBinaryArray(base10Value: number): Array<number> {
    let binaryArray: Array<number> = [];
    do {
      binaryArray.push(base10Value % 2);
      base10Value = Math.floor(base10Value / 2);
    } while (base10Value !== 0)
    return binaryArray;
  }

  private getDecimal(binaryArray: Array<number>): number {
    let decimalResult = 0;
    for(let i = 0; i < binaryArray.length; i++) {
      if(binaryArray[i] === 1) {
        decimalResult += 2 ** i;
      }
    }
    return decimalResult;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'day14/docking-data': Day14DockingData;
  }
}

/*
11

11/2 = 5 , 1
5/2 = 2, 1
2/2 = 1, 0
1/2 = 0, 1
1011

--------------------
101

101/2 = 50, 1
50/2 = 25, 0
25/2 = 12, 1
12/2 = 6, 0
6/2 = 3, 0
3/2 = 1, 1
1/2 = 0, 1
1100101
*/
