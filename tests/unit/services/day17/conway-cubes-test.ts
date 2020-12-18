import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | day17/conway-cubes', function(hooks) {
  setupTest(hooks);
  let service: any;

  hooks.beforeEach(function () {
    service = this.owner.lookup('service:day17/conway-cubes');
  });

  test('it solves example 1 provided from aoc for part 1', function (assert) {
    const result = service.sixCycleStartup(exampleData);
    assert.equal(result, 112);
  });

  const exampleData: Array<string> = (`
  .#.
  ..#
  ###
  `).trim().split("\n").map(l => l.trim());
});

