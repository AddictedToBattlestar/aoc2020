import Service from '@ember/service';

enum FloorLayoutSymbols {
  EmptySeat = "L",
  OccupiedSeat = "#",
  Floor = ".",
  NotOnFloor = ""
}

export default class Day11SeatingSystemV2 extends Service.extend({}) {
  public runUntilNoChangeDetected(seatingLayoutRaw: Array<string>): number {
    let currentSeatingLayout: Array<Array<string>> = this.buildSeatingLayout(seatingLayoutRaw);
    let seatingUnchanged = false;
    let r = 0;
    do {
      console.debug(`Round: ${r}`);
      let nextSeatingLayout: Array<Array<string>> = this.buildNextRound(currentSeatingLayout);
      // this.printSeatingLayout(r, nextSeatingLayout);
      if (this.doLayoutsMatch(currentSeatingLayout, nextSeatingLayout)) {
        seatingUnchanged = true;
      }
      currentSeatingLayout = nextSeatingLayout;
      r++;
    } while (!seatingUnchanged && r < 10000000)
    const totalSeatsOccupied = this.countTotalSeatsOccupied(currentSeatingLayout);
    return totalSeatsOccupied;
  }

  public calculateSeatCount(seatingLayoutRaw: Array<string>, numberOfRounds: number): number | undefined {
    let seatingLayout: Array<Array<string>> = this.buildSeatingLayout(seatingLayoutRaw);
    for (let r = 0; r <= numberOfRounds; r++) {
      seatingLayout = this.buildNextRound(seatingLayout);
      this.printSeatingLayout(r, seatingLayout);
    }
    const totalSeatsOccupied = this.countTotalSeatsOccupied(seatingLayout);
    return totalSeatsOccupied;
  }

  private doLayoutsMatch(currentSeatingLayout: Array<Array<string>>, nextSeatingLayout: Array<Array<string>>): boolean {
    for (let y = 0; y < currentSeatingLayout.length; y++) {
      if(currentSeatingLayout[y].join() !== nextSeatingLayout[y].join()) {
        return false;
      }
    }
    return true;
  }

  private printSeatingLayout(roundNumber: number, seatingLayout: Array<Array<string>>) {
    console.debug(`Round: ${roundNumber}`);
    seatingLayout.forEach(seatingRow => {
      console.debug(seatingRow.join());
    });
  }

  private countTotalSeatsOccupied(seatingLayout: Array<Array<string>>): number {
    let result = 0;
    seatingLayout.forEach(seatingRow => {
      result += seatingRow.filter(seat => seat === FloorLayoutSymbols.OccupiedSeat).length;
    });
    return result;
  }

  private buildNextRound(currentRoundLayout: Array<Array<string>>): Array<Array<string>> {
    const nextRoundLayout: Array<Array<string>> = [];
    for (let y = 0; y < currentRoundLayout.length; y++) {
      let nextRoundSeatingRow: Array<string> = [];
      for (let x = 0; x < currentRoundLayout[y].length; x++) {
        const currentSeat = currentRoundLayout[y][x];
        const countOfOccupiedSeats = this.getCountOfOccupiedSeats(currentRoundLayout, x, y);
        if (currentSeat === FloorLayoutSymbols.EmptySeat && countOfOccupiedSeats === 0) {
          nextRoundSeatingRow[x] = FloorLayoutSymbols.OccupiedSeat;
        } else if (currentSeat === FloorLayoutSymbols.OccupiedSeat && countOfOccupiedSeats > 4) {
          nextRoundSeatingRow[x] = FloorLayoutSymbols.EmptySeat;
        } else {
          nextRoundSeatingRow[x] = currentRoundLayout[y][x];
        }
      }
      nextRoundLayout.push(nextRoundSeatingRow);
    }
    return nextRoundLayout;
  }

  private getCountOfOccupiedSeats(currentRoundLayout: Array<Array<string>>, x: number, y: number): number {
    let countOfOccupiedSeats = 0;
    if(this.isUpperLeftOccupied(currentRoundLayout, x, y)) {
      countOfOccupiedSeats++;
    }
    if(this.isTopOccupied(currentRoundLayout, x, y)) {
      countOfOccupiedSeats++;
    }
    if(this.isUpperRightOccupied(currentRoundLayout, x, y)) {
      countOfOccupiedSeats++;
    }
    if(this.isLeftOccupied(currentRoundLayout, x, y)) {
      countOfOccupiedSeats++;
    }
    if(this.isRightOccupied(currentRoundLayout, x, y)) {
      countOfOccupiedSeats++;
    }
    if(this.isLowerLeftOccupied(currentRoundLayout, x, y)) {
      countOfOccupiedSeats++;
    }
    if(this.isBottomOccupied(currentRoundLayout, x, y)) {
      countOfOccupiedSeats++;
    }
    if(this.isLowerRightOccupied(currentRoundLayout, x, y)) {
      countOfOccupiedSeats++;
    }
    return countOfOccupiedSeats;
  }

  private isUpperLeftOccupied(currentRoundLayout: Array<Array<string>>, x: number, y: number): boolean  {
    x--;
    y--;
    while (0 <= y && 0 <= x) {
      if (currentRoundLayout[y][x] !== FloorLayoutSymbols.Floor) {
        return currentRoundLayout[y][x] === FloorLayoutSymbols.OccupiedSeat;
      }
      x--;
      y--;
    }
    return false;
  }

  private isTopOccupied(currentRoundLayout: Array<Array<string>>, x: number, y: number): boolean  {
    y--;
    while (0 <= y) {
      if (currentRoundLayout[y][x] !== FloorLayoutSymbols.Floor) {
        return currentRoundLayout[y][x] === FloorLayoutSymbols.OccupiedSeat;
      }
      y--;
    }
    return false;
  }

  private isUpperRightOccupied(currentRoundLayout: Array<Array<string>>, x: number, y: number): boolean  {
    x++;
    y--;
    while (0 <= y && x <= currentRoundLayout[y].length - 1) {
      if (currentRoundLayout[y][x] !== FloorLayoutSymbols.Floor) {
        return currentRoundLayout[y][x] === FloorLayoutSymbols.OccupiedSeat;
      }
      x++;
      y--;
    }
    return false;
  }

  private isLeftOccupied(currentRoundLayout: Array<Array<string>>, x: number, y: number): boolean  {
    x--;
    while (0 <= x) {
      if (currentRoundLayout[y][x] !== FloorLayoutSymbols.Floor) {
        return currentRoundLayout[y][x] === FloorLayoutSymbols.OccupiedSeat;
      }
      x--;
    }
    return false;
  }

  private isRightOccupied(currentRoundLayout: Array<Array<string>>, x: number, y: number): boolean  {
    x++;
    while (x <= currentRoundLayout[y].length - 1) {
      if (currentRoundLayout[y][x] !== FloorLayoutSymbols.Floor) {
        return currentRoundLayout[y][x] === FloorLayoutSymbols.OccupiedSeat;
      }
      x++;
    }
    return false;
  }

  private isLowerLeftOccupied(currentRoundLayout: Array<Array<string>>, x: number, y: number): boolean {
    x--;
    y++;
    while (y <= currentRoundLayout.length - 1 && 0 <= x) {
      if (currentRoundLayout[y][x] !== FloorLayoutSymbols.Floor) {
        return currentRoundLayout[y][x] === FloorLayoutSymbols.OccupiedSeat;
      }
      x--;
      y++;
    }
    return false;
  }

  private isBottomOccupied(currentRoundLayout: Array<Array<string>>, x: number, y: number): boolean {
    y++;
    while (y <= currentRoundLayout.length - 1) {
      if (currentRoundLayout[y][x] !== FloorLayoutSymbols.Floor) {
        return currentRoundLayout[y][x] === FloorLayoutSymbols.OccupiedSeat;
      }
      y++;
    }
    return false;
  }

  private isLowerRightOccupied(currentRoundLayout: Array<Array<string>>, x: number, y: number): boolean  {
    x++;
    y++;
    while (y <= currentRoundLayout.length - 1 && x <= currentRoundLayout[y].length - 1) {
      if (currentRoundLayout[y][x] !== FloorLayoutSymbols.Floor) {
        return currentRoundLayout[y][x] === FloorLayoutSymbols.OccupiedSeat;
      }
      x++;
      y++;
    }
    return false;
  }

  private buildSeatingLayout(seatingLayoutRaw: Array<string>): Array<Array<string>> {
    let currentSeating: Array<Array<string>> = [];
    seatingLayoutRaw.forEach(seatingRowRaw => {
      let seatingRow: Array<string> = [];
      for(let seat of seatingRowRaw) {
        seatingRow.push(seat);
      }
      currentSeating.push(seatingRow);
    });
    return currentSeating;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'day11/seating-system-v2': Day11SeatingSystemV2;
  }
}
