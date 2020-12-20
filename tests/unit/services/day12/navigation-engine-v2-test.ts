import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | day12/navigation-engine-v2', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:day12/navigation-engine-v2');
    assert.ok(service);
  });
});

