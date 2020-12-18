import Service from '@ember/service';

export default class Day17ConwayCubes extends Service.extend({
}) {
  private currentPocketDimension: Array<Array<Array<boolean>>> = [[[]]];
  private nextPocketDimensionCycle: Array<Array<Array<boolean>>> = [[[]]];

  private activeCubeListing: Array<any> = [];
  private nextActiveCubeListing: Array<any> = [];

  public sixCycleStartup(rawInitialState: Array<string>): number {
    debugger;
    this.buildInitialTwoDimensionalSlice(rawInitialState);
    for(let cycleCount = 0; cycleCount < 6; cycleCount++) {
      this.processCycle();
      // this.printPocketDimension();
    }
    return this.activeCubeListing.length;
  }

  private processCycle() {
    this.nextPocketDimensionCycle = [[[]]];
    this.nextActiveCubeListing = [];
    this.activeCubeListing.forEach((cubeLocation: any) => {
      this.assessCubeLocationAndUpdateNextCycle(cubeLocation);

      // Assess surrounding locations on same z plane
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z, "y": cubeLocation.y-1, "x": cubeLocation.x-1});
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z, "y": cubeLocation.y-1, "x": cubeLocation.x});
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z, "y": cubeLocation.y-1, "x": cubeLocation.x+1});
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z, "y": cubeLocation.y, "x": cubeLocation.x-1});
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z, "y": cubeLocation.y, "x": cubeLocation.x+1});
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z, "y": cubeLocation.y+1, "x": cubeLocation.x-1});
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z, "y": cubeLocation.y+1, "x": cubeLocation.x});
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z, "y": cubeLocation.y+1, "x": cubeLocation.x+1});

      // Assess surrounding locations on z - 1 plane
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z-1, "y": cubeLocation.y-1, "x": cubeLocation.x-1});
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z-1, "y": cubeLocation.y-1, "x": cubeLocation.x});
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z-1, "y": cubeLocation.y-1, "x": cubeLocation.x+1});
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z-1, "y": cubeLocation.y, "x": cubeLocation.x-1});
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z-1, "y": cubeLocation.y, "x": cubeLocation.x});
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z-1, "y": cubeLocation.y, "x": cubeLocation.x+1});
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z-1, "y": cubeLocation.y+1, "x": cubeLocation.x-1});
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z-1, "y": cubeLocation.y+1, "x": cubeLocation.x});
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z-1, "y": cubeLocation.y+1, "x": cubeLocation.x+1});

      // Assess surrounding locations on z + 1 plane
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z+1, "y": cubeLocation.y-1, "x": cubeLocation.x-1});
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z+1, "y": cubeLocation.y-1, "x": cubeLocation.x});
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z+1, "y": cubeLocation.y-1, "x": cubeLocation.x+1});
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z+1, "y": cubeLocation.y, "x": cubeLocation.x-1});
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z+1, "y": cubeLocation.y, "x": cubeLocation.x});
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z+1, "y": cubeLocation.y, "x": cubeLocation.x+1});
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z+1, "y": cubeLocation.y+1, "x": cubeLocation.x-1});
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z+1, "y": cubeLocation.y+1, "x": cubeLocation.x});
      this.assessCubeLocationAndUpdateNextCycle({"z": cubeLocation.z+1, "y": cubeLocation.y+1, "x": cubeLocation.x+1});
    });

    this.currentPocketDimension = this.nextPocketDimensionCycle;
    this.activeCubeListing = this.nextActiveCubeListing;
  }

  private printPocketDimension() {
    const {minZ, maxZ, minY, maxY, minX, maxX} = this.getDimensionalBoundaries();
    for(let z = minZ; z <= maxZ; z++) {
      console.debug(`z=${z}`);
      for(let y = minY; y <= maxY; y++) {
        let horizontalLine = "";
        for(let x = minX; y<= maxX; x++) {
          horizontalLine += this.isCubeLocationActive(z,y,x) ? "#" : ".";
        }
        console.debug(horizontalLine);
      }
    }
  }

  private isCubeLocationActive(x: number, y: number, z: number): boolean {
    return this.currentPocketDimension[z] && this.currentPocketDimension[z][y] && this.currentPocketDimension[z][y][x];
  }

  private getDimensionalBoundaries() {
    return this.activeCubeListing.reduce((accumulator: any, cubeLocation: any) => {
      if(cubeLocation.z < accumulator.minZ) {
        accumulator.minZ = cubeLocation.z;
      }
      if(accumulator.maxZ < cubeLocation.z) {
        accumulator.maxZ = cubeLocation.z;
      }
      if(cubeLocation.y < accumulator.minY) {
        accumulator.minY = cubeLocation.y;
      }
      if(accumulator.maxY < cubeLocation.y) {
        accumulator.maxY = cubeLocation.y;
      }
      if(cubeLocation.x < accumulator.minX) {
        accumulator.minX = cubeLocation.x;
      }
      if(accumulator.maxX < cubeLocation.x) {
        accumulator.maxX = cubeLocation.x;
      }
      return accumulator;
    }, {minZ: 0, maxZ: 0, minY: 0, maxY: 0, minX: 0, maxX: 0});
  }

  private assessCubeLocationAndUpdateNextCycle(cubeLocation: any) {
    if(this.isFutureStateOfCubeLocationActive(cubeLocation.x, cubeLocation.y, cubeLocation.z)) {
      if(!this.nextPocketDimensionCycle[cubeLocation.z]) {
        this.nextPocketDimensionCycle[cubeLocation.z] = [];
      }
      if(!this.nextPocketDimensionCycle[cubeLocation.z][cubeLocation.y]) {
        this.nextPocketDimensionCycle[cubeLocation.z][cubeLocation.y] = [];
      }
      this.nextPocketDimensionCycle[cubeLocation.z][cubeLocation.y][cubeLocation.x] = true;
      this.nextActiveCubeListing.push({"z": cubeLocation.z, "y": cubeLocation.y, "x": cubeLocation.x});
    }
  }

  private isFutureStateOfCubeLocationActive(x: number, y: number, z: number): boolean {
    const countOfActiveCubesNearby = this.getCountOfActiveSurroundingCubesNearby(x,y,z);
    if(this.currentPocketDimension[z] && this.currentPocketDimension[z][y] && this.currentPocketDimension[z][y][x]) {
      return countOfActiveCubesNearby === 2 || countOfActiveCubesNearby === 3;
    } else {
      return countOfActiveCubesNearby === 3;
    }
  }

  private getCountOfActiveSurroundingCubesNearby(x: number, y: number, z: number): number {
    let countOfActiveCubesNearby = 0;

    // Assess surrounding locations on same z plane
    if(this.currentPocketDimension[z] && this.currentPocketDimension[z][y-1] && this.currentPocketDimension[z][y-1][x-1]) countOfActiveCubesNearby++;
    if(this.currentPocketDimension[z] && this.currentPocketDimension[z][y-1] && this.currentPocketDimension[z][y-1][x]) countOfActiveCubesNearby++;
    if(this.currentPocketDimension[z] && this.currentPocketDimension[z][y-1] && this.currentPocketDimension[z][y-1][x+1]) countOfActiveCubesNearby++;
    if(this.currentPocketDimension[z] && this.currentPocketDimension[z][y] && this.currentPocketDimension[z][y][x-1]) countOfActiveCubesNearby++;
    if(this.currentPocketDimension[z] && this.currentPocketDimension[z][y] && this.currentPocketDimension[z][y][x+1]) countOfActiveCubesNearby++;
    if(this.currentPocketDimension[z] && this.currentPocketDimension[z][y+1] && this.currentPocketDimension[z][y+1][x-1]) countOfActiveCubesNearby++;
    if(this.currentPocketDimension[z] && this.currentPocketDimension[z][y+1] && this.currentPocketDimension[z][y+1][x]) countOfActiveCubesNearby++;
    if(this.currentPocketDimension[z] && this.currentPocketDimension[z][y+1] && this.currentPocketDimension[z][y+1][x+1]) countOfActiveCubesNearby++;

    // Assess surrounding locations on z - 1 plane
    if(this.currentPocketDimension[z-1] && this.currentPocketDimension[z-1][y-1] && this.currentPocketDimension[z-1][y-1][x-1]) countOfActiveCubesNearby++;
    if(this.currentPocketDimension[z-1] && this.currentPocketDimension[z-1][y-1] && this.currentPocketDimension[z-1][y-1][x]) countOfActiveCubesNearby++;
    if(this.currentPocketDimension[z-1] && this.currentPocketDimension[z-1][y-1] && this.currentPocketDimension[z-1][y-1][x+1]) countOfActiveCubesNearby++;
    if(this.currentPocketDimension[z-1] && this.currentPocketDimension[z-1][y] && this.currentPocketDimension[z-1][y][x-1]) countOfActiveCubesNearby++;
    if(this.currentPocketDimension[z-1] && this.currentPocketDimension[z-1][y] && this.currentPocketDimension[z-1][y][x]) countOfActiveCubesNearby++;
    if(this.currentPocketDimension[z-1] && this.currentPocketDimension[z-1][y] && this.currentPocketDimension[z-1][y][x+1]) countOfActiveCubesNearby++;
    if(this.currentPocketDimension[z-1] && this.currentPocketDimension[z-1][y+1] && this.currentPocketDimension[z-1][y+1][x-1]) countOfActiveCubesNearby++;
    if(this.currentPocketDimension[z-1] && this.currentPocketDimension[z-1][y+1] && this.currentPocketDimension[z-1][y+1][x]) countOfActiveCubesNearby++;
    if(this.currentPocketDimension[z-1] && this.currentPocketDimension[z-1][y+1] && this.currentPocketDimension[z-1][y+1][x+1]) countOfActiveCubesNearby++;

    // Assess surrounding locations on z + 1 plane
    if(this.currentPocketDimension[z+1] && this.currentPocketDimension[z+1][y-1] && this.currentPocketDimension[z+1][y-1][x-1]) countOfActiveCubesNearby++;
    if(this.currentPocketDimension[z+1] && this.currentPocketDimension[z+1][y-1] && this.currentPocketDimension[z+1][y-1][x]) countOfActiveCubesNearby++;
    if(this.currentPocketDimension[z+1] && this.currentPocketDimension[z+1][y-1] && this.currentPocketDimension[z+1][y-1][x+1]) countOfActiveCubesNearby++;
    if(this.currentPocketDimension[z+1] && this.currentPocketDimension[z+1][y] && this.currentPocketDimension[z+1][y][x-1]) countOfActiveCubesNearby++;
    if(this.currentPocketDimension[z+1] && this.currentPocketDimension[z+1][y] && this.currentPocketDimension[z+1][y][x]) countOfActiveCubesNearby++;
    if(this.currentPocketDimension[z+1] && this.currentPocketDimension[z+1][y] && this.currentPocketDimension[z+1][y][x+1]) countOfActiveCubesNearby++;
    if(this.currentPocketDimension[z+1] && this.currentPocketDimension[z+1][y+1] && this.currentPocketDimension[z+1][y+1][x-1]) countOfActiveCubesNearby++;
    if(this.currentPocketDimension[z+1] && this.currentPocketDimension[z+1][y+1] && this.currentPocketDimension[z+1][y+1][x]) countOfActiveCubesNearby++;
    if(this.currentPocketDimension[z+1] && this.currentPocketDimension[z+1][y+1] && this.currentPocketDimension[z+1][y+1][x+1]) countOfActiveCubesNearby++;

    return countOfActiveCubesNearby;
  }

  private buildInitialTwoDimensionalSlice(rawInitialState: Array<string>) {
    let initialTwoDimensionalSlice: Array<Array<boolean>> = [];
    let activeCubeListing = [];
    for (let y = 0; y < rawInitialState.length; y++) {
      for (let x = 0; x < rawInitialState[y].length; x++) {
        if (rawInitialState[y][x] === "#") {
          if (!initialTwoDimensionalSlice[y]) {
            initialTwoDimensionalSlice[y] = [];
          }
          initialTwoDimensionalSlice[y][x] = true;
          activeCubeListing.push({"z": 0, "y": y, "x": x});
        }
      }
    }
    this.currentPocketDimension = [initialTwoDimensionalSlice];
    this.activeCubeListing = activeCubeListing;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'day17/conway-cubes': Day17ConwayCubes;
  }
}
