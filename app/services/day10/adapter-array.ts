import Service from '@ember/service';

export default class Day10AdapterArray extends Service.extend({

}) {
  public findJoltDifferences(rawAdapterListing: Array<string>): any {
    let joltageDifferenceCounter: any = {
      1: 0,
      2: 0,
      3: 0
    };
    const adapterListing: Array<number> = rawAdapterListing.map(a => Number(a)).sort((a1, a2) => a1 - a2);
    for(let i = 0; i < adapterListing.length; i++) {
      const joltageDifference = i === 0 ? adapterListing[i] : adapterListing[i] - adapterListing[i - 1];
      if (joltageDifference > 3) {
        throw `An adapter could not be found to join to ${adapterListing[i - 1]}`;
      }
      console.debug(`Adapter ${adapterListing[i]} added with a joltage difference of ${joltageDifference}`);
      joltageDifferenceCounter[joltageDifference]++;
    }
    joltageDifferenceCounter[3]++;
    return {
      oneJoltDifferenceCount: joltageDifferenceCounter[1],
      twoJoltDifferenceCount: joltageDifferenceCounter[2],
      threeJoltDifferenceCount: joltageDifferenceCounter[3]
    };
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'day10/adapter-array': Day10AdapterArray;
  }
}
