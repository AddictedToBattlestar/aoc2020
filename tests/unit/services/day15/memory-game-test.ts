import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | day15/memory-game', function(hooks) {
  setupTest(hooks);
  let service: any;

  hooks.beforeEach(function () {
    service = this.owner.lookup('service:day15/memory-game');
  });

  test('it solves example 1 provided from aoc for part 1 on day 15', function (assert) {
    const result = service.play([0,3,6], 2020);
    assert.equal(result, 436);
  });

  test('it solves example 2 provided from aoc for part 1 on day 15', function (assert) {
    const result = service.play([1,3,2], 2020);
    assert.equal(result, 1);
  });

  test('it solves example 3 provided from aoc for part 1 on day 15', function (assert) {
    const result = service.play([2,1,3], 2020);
    assert.equal(result, 10);
  });

  test('it solves example 4 provided from aoc for part 1 on day 15', function (assert) {
    const result = service.play([1,2,3], 2020);
    assert.equal(result, 27);
  });

  test('it solves example 5 provided from aoc for part 1 on day 15', function (assert) {
    const result = service.play([2,3,1], 2020);
    assert.equal(result, 78);
  });

  test('it solves example 6 provided from aoc for part 1 on day 15', function (assert) {
    const result = service.play([3,2,1], 2020);
    assert.equal(result, 438);
  });

  test('it solves example 7 provided from aoc for part 1 on day 15', function (assert) {
    const result = service.play([3,1,2], 2020);
    assert.equal(result, 1836);
  });

  test('it solves for part 1 for day 15', function (assert) {
    const result = service.play([15,12,0,14,3,1], 2020);
    assert.ok(result);
    if (result != 0) {
      console.info(`-Day 15- The answer to part 1 is: ${result}\n`);
    }
  });

  // test('it solves example 1 provided from aoc for part 2 on day 15', function (assert) {
  //   const result = service.play([0,3,6], 30000000);
  //   assert.equal(result, 175594);
  // });

  // test('it solves example 2 provided from aoc for part 2 on day 15', function (assert) {
  //   const result = service.play([1,3,2], 30000000);
  //   assert.equal(result, 2578);
  // });

  // test('it solves example 3 provided from aoc for part 2 on day 15', function (assert) {
  //   const result = service.play([2,1,3], 30000000);
  //   assert.equal(result, 3544142);
  // });

  // test('it solves example 4 provided from aoc for part 2 on day 15', function (assert) {
  //   const result = service.play([1,2,3], 30000000);
  //   assert.equal(result, 261214);
  // });

  // test('it solves example 5 provided from aoc for part 2 on day 15', function (assert) {
  //   const result = service.play([2,3,1], 30000000);
  //   assert.equal(result, 6895259);
  // });

  // test('it solves example 6 provided from aoc for part 2 on day 15', function (assert) {
  //   const result = service.play([3,2,1], 30000000);
  //   assert.equal(result, 18);
  // });

  // test('it solves example 6 provided from aoc for part 2 on day 15', function (assert) {
  //   const result = service.play([3,1,2], 30000000);
  //   assert.equal(result, 362);
  // });

  // Runs in @ 8 minutes... :P
  // test('it solves for part 2 for day 15', function (assert) {
  //   const result = service.play([15,12,0,14,3,1], 30000000);
  //   assert.equal(result, 0);
  //   console.info(`-Day 15- The answer to part 2 is: ${result}\n`);
  // });
});

