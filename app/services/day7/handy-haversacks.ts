import Service from '@ember/service';
import LuggageBag from './luggage-bag';

export default class Day7HandyHaversacks extends Service.extend({
}) {
  public countParents(luster: string, color: string, bagData: Array<string>): number | undefined {
    let bagListing: Map<string,LuggageBag> = this.buildBagListing(bagData);
    const focusBag: LuggageBag | undefined = bagListing.get(`${luster}|${color}`);
    if (!focusBag) {
      console.error("-Day 7- ERROR, the bag description provided could not be found.")
      return undefined;
    }
    return focusBag.getParentCount();
  }

  public countBagsWithin(luster: string, color: string, bagData: Array<string>): number | undefined {
    let bagListing: Map<string,LuggageBag> = this.buildBagListing(bagData);
    const focusBag: LuggageBag | undefined = bagListing.get(`${luster}|${color}`);
    if (!focusBag) {
      console.error("-Day 7- ERROR, the bag description provided could not be found.")
      return undefined;
    }
    return focusBag.getCountOfBagsWithin();
  }

  private buildBagListing(bagData: Array<string>): Map<string,LuggageBag> {
    let bagListing: Map<string,LuggageBag>  = new Map();
    for(let bagDataLine of bagData) {
      console.debug(`-Day 7- processing line: "${bagDataLine}"`);
      const {bagUnderFocus, bagChildrenRawArray} = this.parseBagDataLine(bagDataLine, bagListing);
      this.bagListing = this.processChildren(bagListing, bagUnderFocus, bagChildrenRawArray);
    }
    return bagListing;
  }

  private parseBagDataLine(bagDataLine: string, bagListing: Map<string,LuggageBag>): any {
    const [bagDescriptionRaw, bagChildrenRaw] = bagDataLine.split("contain");
    const bagDescription: Array<string> = bagDescriptionRaw.split(" ");
    const bagKey = `${bagDescription[0]}|${bagDescription[1]}`;
    let bagUnderFocus: LuggageBag | undefined = bagListing.get(bagKey);
    if (!bagUnderFocus) {
      bagUnderFocus = new LuggageBag(bagDescription[0], bagDescription[1]);
      bagListing.set(bagKey, bagUnderFocus);
    }
    const bagChildrenRawArray: Array<string> = bagChildrenRaw.split(",");
    return {bagUnderFocus, bagChildrenRawArray};
  }

  private processChildren(bagListing: Map<string,LuggageBag>, bagUnderFocus: LuggageBag, bagChildrenRaw: Array<string>): Map<string,LuggageBag> {
    bagChildrenRaw.filter(c => !c.trim().includes("no other bags")).forEach(childBagDescription => {
      const childBagRaw = childBagDescription.trim().split(" ");
      const childBagKey = `${childBagRaw[1]}|${childBagRaw[2]}`;
      let childBag = bagListing.get(childBagKey);
      if (!childBag) {
        childBag = new LuggageBag(childBagRaw[1], childBagRaw[2]);
        bagListing.set(childBagKey, childBag);
      }
      childBag.addParent(bagUnderFocus);
      bagUnderFocus.addChild(childBag, Number(childBagRaw[0]));
    });
    return bagListing;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'day7/handy-haversacks': Day7HandyHaversacks;
  }
}
