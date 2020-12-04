import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | day4/passport-processing', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:day4/passport-processing');
    assert.ok(service);
  });
});

