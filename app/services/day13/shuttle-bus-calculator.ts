import Service from '@ember/service';

export default class Day13ShuttleBusCalculator extends Service.extend({
}) {
  public getNextBusIdAvailableOnArrival(rawArrivalTime: number, rawBusIdListing: string): any | undefined {
    const arrivalTime: number = Number(rawArrivalTime);
    const busIdListing: Array<number> = this.parseBusIdListing(rawBusIdListing);
    let nextBusIdAvailable: number | undefined = undefined;
    let minutesToWaitAfterArrival: number | undefined = undefined;
    busIdListing.forEach(busId => {
      const waitTime = this.getWaitTime(arrivalTime, busId);
      console.debug(`Bus ID ${busId}'s wait time is ${waitTime}`);
      if(!minutesToWaitAfterArrival || waitTime < minutesToWaitAfterArrival) {
        console.debug(`Bus ID ${busId} appears to have the closest wait time of ${waitTime}`);
        nextBusIdAvailable = busId;
        minutesToWaitAfterArrival = waitTime;
      }
    });
    return {
      nextBusIdAvailable,
      minutesToWaitAfterArrival
    };
  }

  private getWaitTime(arrivalTime: number, busId: number): number {
    const d = Math.floor(arrivalTime / busId);
    return busId * (d + 1) - arrivalTime;
  }

  private parseBusIdListing(rawBusIdListing: string) {
    let busIdListing: Array<number> = [];
    rawBusIdListing.split(",").forEach(r => {
      if(r !== 'x') {
        busIdListing.push(Number(r));
      }
    });
    return busIdListing
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'day13/shuttle-bus-calculator': Day13ShuttleBusCalculator;
  }
}
