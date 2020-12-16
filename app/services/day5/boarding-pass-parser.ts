import Service from '@ember/service';

export default class Day5BoardingPassParser extends Service.extend({
}) {
  public findSeatId(boardingPassSeatInformation: string): number {
    let lowerRowNumber = 0;
    let upperRowNumber = 127;
    for (let i = 0; i < 7; i++) {
      const numberOfSeatsToDeduct = Math.round((upperRowNumber - lowerRowNumber) / 2);
      if (boardingPassSeatInformation[i] === 'F') {
        upperRowNumber -= numberOfSeatsToDeduct;
      } else {
        lowerRowNumber += numberOfSeatsToDeduct;
      }
      console.debug(`-Day 5- Position ${i + 1}, value: ${boardingPassSeatInformation[i]}, lowerRowNumber: ${lowerRowNumber}, upperRowNumber: ${upperRowNumber}`);
    }
    if (lowerRowNumber !== upperRowNumber) {
      console.error(`-Day 5- The upper and lower bounds for the row being determined could not be found. (lowerRowNumber: ${lowerRowNumber}, upperRowNumber: ${upperRowNumber})`)
    }
    console.debug(`-Day 5- Boarding pass is for row number ${lowerRowNumber}`);

    let leftMostSeatNumber = 0;
    let rightMostSeatNumber = 7;
    for (let i = 7; i < 10; i++) {
      const numberOfSeatsToDeduct = Math.round((rightMostSeatNumber - leftMostSeatNumber) / 2);

      if (boardingPassSeatInformation[i] === 'L') {
        rightMostSeatNumber -= numberOfSeatsToDeduct;
      } else {
        leftMostSeatNumber += numberOfSeatsToDeduct;
      }
      console.debug(`-Day 5- Position ${i + 1}, value: ${boardingPassSeatInformation[i]}, leftMostSeatNumber: ${leftMostSeatNumber}, rightMostSeatNumber: ${rightMostSeatNumber}`);
    }
    if (leftMostSeatNumber !== rightMostSeatNumber) {
      console.error(`-Day 5- The left and right bounds for the seat being determined could not be found. (leftMostSeatNumber: ${leftMostSeatNumber}, rightMostSeatNumber: ${rightMostSeatNumber})`)
    }
    console.debug(`-Day 5- Boarding pass is for seat number ${leftMostSeatNumber}`);
    const seatId: number = lowerRowNumber * 8 + leftMostSeatNumber;
    console.debug(`-Day 5- The seat ID for ${boardingPassSeatInformation} was found to be ${seatId}`);
    return seatId;
  }
  public findHighestSeatId(boardingPassSeatListing: Array<string>): number | undefined {
    let highestSeatIdValue: number | undefined;
    let seatIds: Array<number> = [];
    for (let boardingPassSeatInformation of boardingPassSeatListing) {
      const seatId = this.findSeatId(boardingPassSeatInformation);
      if(highestSeatIdValue === undefined || highestSeatIdValue < seatId) {
        highestSeatIdValue = seatId;
      }
      seatIds.push(seatId);
    }
    this.findGapsInSeating(seatIds);
    return highestSeatIdValue;
  }

  private findGapsInSeating(seatIds: Array<number>) {
    const sortedSeatIds: Array<number> = seatIds.sort((s1: number, s2: number) => {return s1 - s2});
    for (let i = 1; i < sortedSeatIds.length; i++) {
      if (sortedSeatIds[i] - sortedSeatIds[i - 1] !== 1) {
        console.debug(`-Day 5- A seat gap was found for seat ID's ${sortedSeatIds[i - 1]} & ${sortedSeatIds[i]}`);
      }
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'day5/boarding-pass-parser': Day5BoardingPassParser;
  }
}
