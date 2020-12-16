import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | day13/shuttle-bus-calculator', function(hooks) {
  setupTest(hooks);
  let service: any;

  hooks.beforeEach(function () {
    service = this.owner.lookup('service:day13/shuttle-bus-calculator');
  });

  test('it solves the example provided from aoc for part 1', function (assert) {
    const result = service.getNextBusIdAvailableOnArrival(exampleData[0], exampleData[1]);
    assert.equal(result.nextBusIdAvailable, 59);
    assert.equal(result.minutesToWaitAfterArrival, 5);
  });

  test('it solves for part 1 for day 12', function (assert) {
    const result = service.getNextBusIdAvailableOnArrival(sourceData[0], sourceData[1]);
    assert.ok(result);
    if (result != 0) {
      console.info(`-Day 12- The answer to part 1 is: ${result.nextBusIdAvailable * result.minutesToWaitAfterArrival}\n`);
    }
  });

  test('it solves example 1 provided from aoc for part 2', function (assert) {
    const result = service.getNextTimeStampWithFullLineup("7,13,x,x,59,x,31,19");
    assert.equal(result, 1068781);
  });

  test('it solves example 2 provided from aoc for part 2', function (assert) {
    const result = service.getNextTimeStampWithFullLineup("17,x,13,19");
    assert.equal(result, 3417);
  });

  test('it solves example 3 provided from aoc for part 2', function (assert) {
    const result = service.getNextTimeStampWithFullLineup("67,7,59,61");
    assert.equal(result, 754018);
  });

  test('it solves example 4 provided from aoc for part 2', function (assert) {
    const result = service.getNextTimeStampWithFullLineup("67,x,7,59,61");
    assert.equal(result, 779210);
  });

  test('it solves example 5 provided from aoc for part 2', function (assert) {
    const result = service.getNextTimeStampWithFullLineup("67,7,x,59,61");
    assert.equal(result, 1261476);
  });

  test('it solves example 6 provided from aoc for part 2', function (assert) {
    const result = service.getNextTimeStampWithFullLineup("1789,37,47,1889");
    assert.equal(result, 1202161486);
  });

  // test('it solves for part 2 for day 12', function (assert) {
  //   const result = service.getNextTimeStampWithFullLineup(sourceData[1]);
  //   assert.ok(result);
  //   if (result != 0) {
  //     console.info(`-Day 12- The answer to part 2 is: ${result}\n`);
  //   }
  // });

  const exampleData: Array<string> = (`
  939
  7,13,x,x,59,x,31,19
  `).trim().split("\n").map(l => l.trim());

  const sourceData: Array<string> = (`
  1000299
  41,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,971,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,17,13,x,x,x,x,23,x,x,x,x,x,29,x,487,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,19
  `).trim().split("\n").map(l => l.trim());
});

