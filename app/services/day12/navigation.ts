import Service from '@ember/service';
import Day12NavigationEngine from './navigation-engine';
import Day12NavigationEngineV2 from './navigation-engine-v2';

export default class Day12Navigation extends Service.extend({
}) {
  public goAndGetDistance(navigationInstructions: Array<string>) {
    let navigationEngine: Day12NavigationEngine = new Day12NavigationEngine();
    navigationInstructions.forEach((navigationInstruction: string) => {
      const instructionDirection = navigationInstruction.substring(0,1);
      const instructionDistance = Number(navigationInstruction.substring(1, navigationInstruction.length));
      navigationEngine.go(instructionDirection, instructionDistance);
    });
    return navigationEngine.getDistanceFromStartingPoint();
  }

  public goAndGetDistanceV2(navigationInstructions: Array<string>) {
    let navigationEngine: Day12NavigationEngineV2 = new Day12NavigationEngineV2();
    navigationInstructions.forEach((navigationInstruction: string) => {
      const instructionDirection = navigationInstruction.substring(0,1);
      const instructionDistance = Number(navigationInstruction.substring(1, navigationInstruction.length));
      navigationEngine.go(instructionDirection, instructionDistance);
    });
    return navigationEngine.getDistanceFromStartingPoint();
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'day12/navigation': Day12Navigation;
  }
}
