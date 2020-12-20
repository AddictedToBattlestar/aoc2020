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

export default class Day12NavigationEngineV2 extends Service.extend({
}) {
  private positionFromStartingPoint = {y: 0, x: 0};
  private relativePositionOfWaypoint = {y: 1, x: 10};
  public go(direction: string, distanceOrDegrees: number) {
    console.debug(`Direction: ${direction}, distance or degrees: ${distanceOrDegrees}`);
    switch(direction) {
      case NavigationDirection.Left:
        this.rotateTheWaypointCounterClockwise(distanceOrDegrees);
        break;
      case NavigationDirection.Right:
        this.rotateTheWaypointClockwise(distanceOrDegrees);
        break;
      case NavigationDirection.Forward:
        this.moveToWaypointRepeatedly(distanceOrDegrees);
        break;
      default:
        this.moveWayPointToNewPosition(direction, distanceOrDegrees);
    }
    console.debug(`Current position from starting point: ${JSON.stringify(this.positionFromStartingPoint)}`);
  }

  private rotateTheWaypointClockwise(degreesToTurn: number) {
    const newDirectionInDegrees = degreesToTurn % 360;
    switch(newDirectionInDegrees) {
      case 0:
        break;
      case 90:
        this.relativePositionOfWaypoint = {x: this.relativePositionOfWaypoint.y, y: (this.relativePositionOfWaypoint.x * -1)};
        break;
      case 180:
        this.relativePositionOfWaypoint = {x: (this.relativePositionOfWaypoint.x * -1), y: (this.relativePositionOfWaypoint.y * -1)};
        break;
      case 270:
        this.relativePositionOfWaypoint = {x: (this.relativePositionOfWaypoint.y * -1), y: this.relativePositionOfWaypoint.x};
        break;
      default:
        throw `Error in rotating the waypoint clockwise ${degreesToTurn} degrees`;
    }
    console.debug(`Current waypoint's relative position has been changed to: ${JSON.stringify(this.relativePositionOfWaypoint)}`);
  }

  private rotateTheWaypointCounterClockwise(degreesToTurn: number) {
    const newDirectionInDegrees = degreesToTurn % 360;
    switch(newDirectionInDegrees) {
      case 0:
        break;
      case 90:
        this.relativePositionOfWaypoint = {x: (this.relativePositionOfWaypoint.y * -1), y: this.relativePositionOfWaypoint.x};
        break;
      case 180:
        this.relativePositionOfWaypoint = {x: (this.relativePositionOfWaypoint.x * -1), y: (this.relativePositionOfWaypoint.y * -1)};
        break;
      case 270:
        this.relativePositionOfWaypoint = {x: this.relativePositionOfWaypoint.y, y: (this.relativePositionOfWaypoint.x * -1)};
        break;
      default:
        throw `Error in rotating the waypoint counter clockwise ${degreesToTurn} degrees`;
    }
    console.debug(`Current waypoint's relative position has been changed to: ${JSON.stringify(this.relativePositionOfWaypoint)}`);
  }

  private moveToWaypointRepeatedly(numberOfTimesToMove: number) {
    this.positionFromStartingPoint.x += this.relativePositionOfWaypoint.x * numberOfTimesToMove;
    this.positionFromStartingPoint.y += this.relativePositionOfWaypoint.y * numberOfTimesToMove;
  }

  private moveWayPointToNewPosition(direction: string, distance: number) {
    switch(direction) {
      case NavigationDirection.North:
        this.relativePositionOfWaypoint.y += distance;
        break;
      case NavigationDirection.South:
        this.relativePositionOfWaypoint.y -= distance;
        break;
      case NavigationDirection.East:
        this.relativePositionOfWaypoint.x += distance;
        break;
      case NavigationDirection.West:
        this.relativePositionOfWaypoint.x -= distance;
        break;
    }
    console.debug(`Current waypoint's relative position has been changed to: ${JSON.stringify(this.relativePositionOfWaypoint)}`);
  }

  public getDistanceFromStartingPoint(): number {
    return Math.abs(this.positionFromStartingPoint.x) + Math.abs(this.positionFromStartingPoint.y);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'day12/navigation-engine-v2': Day12NavigationEngineV2;
  }
}
