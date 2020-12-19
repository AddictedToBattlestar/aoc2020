import Service from '@ember/service';

enum NavigationDirection {
  North = "N",
  South = "S",
  East = "E",
  West = "W",
  Left = "L",
  Right = "R",
  Forward = "F"
}

export default class Day12NavigationEngine extends Service.extend({
}) {
  private currentDirection = NavigationDirection.East;
  private positionFromStartingPoint = {y: 0, x: 0};
  public go(direction: string, distanceOrDegrees: number) {
    console.debug(`Direction: ${direction}, distance or degrees: ${distanceOrDegrees}`);
    switch(direction) {
      case NavigationDirection.Left:
        this.currentDirection = this.getCurrentDirectionToTheLeft(distanceOrDegrees);
        break;
      case NavigationDirection.Right:
        this.currentDirection = this.getCurrentDirectionToTheRight(distanceOrDegrees);
        break;
      default:
        const directionToTravel = direction === NavigationDirection.Forward ? this.currentDirection : direction;
        this.moveToNewPosition(directionToTravel, distanceOrDegrees);
    }
    console.debug(`Current position from starting point: ${JSON.stringify(this.positionFromStartingPoint)}`);
  }

  private moveToNewPosition(direction: string, distance: number) {
    switch(direction) {
      case NavigationDirection.North:
        this.positionFromStartingPoint.y += distance;
        break;
      case NavigationDirection.South:
        this.positionFromStartingPoint.y -= distance;
        break;
      case NavigationDirection.East:
        this.positionFromStartingPoint.x += distance;
        break;
      case NavigationDirection.West:
        this.positionFromStartingPoint.x -= distance;
        break;
    }
  }

  private getCurrentDirectionToTheLeft(degreesToTurn: number): NavigationDirection {
    const currentDegrees: number = this.getDirectionInDegrees(this.currentDirection);
    let newDirectionInDegrees = (currentDegrees - degreesToTurn) % 360;
    switch (newDirectionInDegrees) {
      case -90:
        newDirectionInDegrees = 270;
        break;
      case -180:
        newDirectionInDegrees = 180;
        break;
      case -270:
        newDirectionInDegrees = 90;
        break;
    }
    return this.getDirectionFromDegrees(newDirectionInDegrees);
  }

  private getCurrentDirectionToTheRight(degreesToTurn: number): NavigationDirection {
    const currentDegrees: number = this.getDirectionInDegrees(this.currentDirection);
    const newDirectionInDegrees = (currentDegrees + degreesToTurn) % 360;
    return this.getDirectionFromDegrees(newDirectionInDegrees);
  }

  private getDirectionFromDegrees(degrees: number): NavigationDirection {
    switch(degrees) {
      case 0:
        return NavigationDirection.North;
      case 90:
        return NavigationDirection.East;
      case 180:
        return NavigationDirection.South;
      case 270:
        return NavigationDirection.West;
      default:
        throw `Error in finding the direction for ${degrees} degrees`;
    }
  }

  private getDirectionInDegrees(direction: NavigationDirection): number {
    switch(direction) {
      case NavigationDirection.North:
        return 0;
      case NavigationDirection.East:
        return 90;
      case NavigationDirection.South:
        return 180;
      case NavigationDirection.West:
        return 270;
      default:
        throw `Error in finding the direction in degrees for ${this.currentDirection}`;
    }
  }

  public getDistanceFromStartingPoint(): number {
    return Math.abs(this.positionFromStartingPoint.x) + Math.abs(this.positionFromStartingPoint.y);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'day12/navigation-engine': Day12NavigationEngine;
  }
}
