import Service from '@ember/service';

export default class Day15MemoryGame extends Service.extend({
}) {
  public play(startingNumbers: Array<number>, terminatingTurn: number): number {
    let turnTracker: Map<number, Array<number>> = new Map();
    for (let turnNumber = 0; turnNumber < startingNumbers.length; turnNumber++) {
      turnTracker.set(startingNumbers[turnNumber],[turnNumber]);
      console.debug(`Turn ${turnNumber + 1}: ${startingNumbers[turnNumber]}`);
    }
    let lastNumberSpoken: number = startingNumbers[startingNumbers.length - 1];
    for (let turnNumber = startingNumbers.length; turnNumber < terminatingTurn; turnNumber++) {
      let turnPreviouslySpoken: Array<number> | undefined = turnTracker.get(lastNumberSpoken);
      if (turnPreviouslySpoken && turnPreviouslySpoken.length > 1) {
        let nextNumberBeingSpoken: number = turnPreviouslySpoken[turnPreviouslySpoken.length - 1] - turnPreviouslySpoken[turnPreviouslySpoken.length - 2];
        this.updateTrackerData(nextNumberBeingSpoken, turnNumber, turnTracker);
        console.debug(`Turn ${turnNumber + 1}: ${nextNumberBeingSpoken}`);
        lastNumberSpoken = nextNumberBeingSpoken;
      } else {
        this.updateTrackerData(0, turnNumber, turnTracker);
        console.debug(`Turn ${turnNumber + 1}: ${0}`);
        lastNumberSpoken = 0;
      }
    }
    return lastNumberSpoken;
  }

  private updateTrackerData(nextNumberBeingSpoken: number, turnNumber: number, turnTracker: Map<number, Array<number>>) {
    let trackerData: Array<number> | undefined = turnTracker.get(nextNumberBeingSpoken);
    if (trackerData) {
      trackerData = [trackerData[trackerData.length - 1], turnNumber];
    } else {
      trackerData = [turnNumber];
    }
    turnTracker.set(nextNumberBeingSpoken, trackerData);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'day15/memory-game': Day15MemoryGame;
  }
}
