import Service from '@ember/service';

export default class Day3TobogganTrajectory extends Service.extend({
}) {
  public runWithSlope(mapData: Array<string>, horizontalSlope: number, verticalSlope: number): number {
    let currentPosition = {x: 0, y: 0};
    const outOfBounds = {x: mapData[0].length, y: mapData.length};
    console.log(`outOfBounds: ${outOfBounds.x + 1},${outOfBounds.y + 1}`);
    let currentCountOfTreesHit = 0;

    while (currentPosition.y < outOfBounds.y) {
      if (mapData[currentPosition.y][currentPosition.x] === '#') {
        currentCountOfTreesHit++;
        console.log(`current position: (${currentPosition.x + 1},${currentPosition.y + 1}), tree hit (${currentCountOfTreesHit})`);
      } else {
        console.log(`current position: (${currentPosition.x + 1},${currentPosition.y + 1})`);
      }
      currentPosition.x = currentPosition.x + horizontalSlope;
      if (currentPosition.x > outOfBounds.x) {
        currentPosition.x = currentPosition.x - outOfBounds.x;
      }
      currentPosition.y = currentPosition.y + verticalSlope;
    }
    return currentCountOfTreesHit;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'day3/toboggan-trajectory': Day3TobogganTrajectory;
  }
}
