import Service from '@ember/service';

enum FloorLayoutSymbols {
  EmptySeat = "L",
  OccupiedSeat = "#",
  Floor = ".",
  NotOnFloor = ""
}

export default class Day11SeatingSystem extends Service.extend({
}) {
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
        if (currentSeat === FloorLayoutSymbols.EmptySeat && this.getCountOfOccupiedSeatsAdjacent(currentRoundLayout, x, y) === 0) {
          nextRoundSeatingRow[x] = FloorLayoutSymbols.OccupiedSeat;
        } else if (currentSeat === FloorLayoutSymbols.OccupiedSeat && this.getCountOfOccupiedSeatsAdjacent(currentRoundLayout, x, y) > 3) {
          nextRoundSeatingRow[x] = FloorLayoutSymbols.EmptySeat;
        } else {
          nextRoundSeatingRow[x] = currentRoundLayout[y][x];
        }
      }
      nextRoundLayout.push(nextRoundSeatingRow);
    }
    return nextRoundLayout;
  }

  private getCountOfOccupiedSeatsAdjacent(currentRoundLayout: Array<Array<string>>, x: number, y: number): number {
    let countOfOccupiedSeats = 0;
    if(this.getUpperLeftPosition(currentRoundLayout, x, y) === FloorLayoutSymbols.OccupiedSeat) {
      countOfOccupiedSeats++;
    }
    if(this.getTopPosition(currentRoundLayout, x, y) === FloorLayoutSymbols.OccupiedSeat) {
      countOfOccupiedSeats++;
    }
    if(this.getUpperRightPosition(currentRoundLayout, x, y) === FloorLayoutSymbols.OccupiedSeat) {
      countOfOccupiedSeats++;
    }
    if(this.getLeftPosition(currentRoundLayout, x, y) === FloorLayoutSymbols.OccupiedSeat) {
      countOfOccupiedSeats++;
    }
    if(this.getRightPosition(currentRoundLayout, x, y) === FloorLayoutSymbols.OccupiedSeat) {
      countOfOccupiedSeats++;
    }
    if(this.getLowerLeftPosition(currentRoundLayout, x, y) === FloorLayoutSymbols.OccupiedSeat) {
      countOfOccupiedSeats++;
    }
    if(this.getBottomPosition(currentRoundLayout, x, y) === FloorLayoutSymbols.OccupiedSeat) {
      countOfOccupiedSeats++;
    }
    if(this.getLowerRightPosition(currentRoundLayout, x, y) === FloorLayoutSymbols.OccupiedSeat) {
      countOfOccupiedSeats++;
    }
    return countOfOccupiedSeats;
  }

  private getUpperLeftPosition(currentRoundLayout: Array<Array<string>>, x: number, y: number): string  {
    if (y === 0 || x === 0) {
      return FloorLayoutSymbols.NotOnFloor;
    } else {
      return currentRoundLayout[y - 1][x - 1];
    }
  }

  private getTopPosition(currentRoundLayout: Array<Array<string>>, x: number, y: number): string  {
    if (y === 0) {
      return FloorLayoutSymbols.NotOnFloor;
    } else {
      return currentRoundLayout[y - 1][x];
    }
  }

  private getUpperRightPosition(currentRoundLayout: Array<Array<string>>, x: number, y: number): string  {
    if (y === 0 || currentRoundLayout[y].length - 1 <= x) {
      return FloorLayoutSymbols.NotOnFloor;
    } else {
      return currentRoundLayout[y - 1][x + 1];
    }
  }

  private getLeftPosition(currentRoundLayout: Array<Array<string>>, x: number, y: number): string  {
    if (x === 0) {
      return FloorLayoutSymbols.NotOnFloor;
    } else {
      return currentRoundLayout[y][x - 1];
    }
  }

  private getRightPosition(currentRoundLayout: Array<Array<string>>, x: number, y: number): string  {
    if (currentRoundLayout[y].length - 1 <= x) {
      return FloorLayoutSymbols.NotOnFloor;
    } else {
      return currentRoundLayout[y][x + 1];
    }
  }

  private getLowerLeftPosition(currentRoundLayout: Array<Array<string>>, x: number, y: number): string  {
    if (currentRoundLayout.length - 1 <= y || x === 0) {
      return FloorLayoutSymbols.NotOnFloor;
    } else {
      return currentRoundLayout[y + 1][x - 1];
    }
  }

  private getBottomPosition(currentRoundLayout: Array<Array<string>>, x: number, y: number): string  {
    if (currentRoundLayout.length - 1 <= y) {
      return FloorLayoutSymbols.NotOnFloor;
    } else {
      return currentRoundLayout[y + 1][x];
    }
  }

  private getLowerRightPosition(currentRoundLayout: Array<Array<string>>, x: number, y: number): string  {
    if (currentRoundLayout.length - 1 <= y || currentRoundLayout[y].length - 1 <= x) {
      return FloorLayoutSymbols.NotOnFloor;
    } else {
      return currentRoundLayout[y + 1][x + 1];
    }
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
    'day11/seating-system': Day11SeatingSystem;
  }
}
