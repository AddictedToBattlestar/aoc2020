import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | day10/adapter-array', function(hooks) {
  setupTest(hooks);
  let service: any;

  hooks.beforeEach(function () {
    service = this.owner.lookup('service:day10/adapter-array');
  });

  test('it solves the first example provided from aoc for part 1', function (assert) {
    const {oneJoltDifferenceCount, threeJoltDifferenceCount} = service.findJoltDifferences(exampleOneData);
    assert.equal(oneJoltDifferenceCount, 7);
    assert.equal(threeJoltDifferenceCount, 5);
  });

  test('it solves the second example provided from aoc for part 1', function (assert) {
    const {oneJoltDifferenceCount, threeJoltDifferenceCount} = service.findJoltDifferences(exampleTwoData);
    assert.equal(oneJoltDifferenceCount, 22);
    assert.equal(threeJoltDifferenceCount, 10);
  });

  test('it solves for part 1', function (assert) {
    const {oneJoltDifferenceCount, threeJoltDifferenceCount} = service.findJoltDifferences(sourceData);
    assert.ok(oneJoltDifferenceCount);
    assert.ok(threeJoltDifferenceCount);
    console.info(`-Day 10- The answer to part 1 is: ${oneJoltDifferenceCount} * ${threeJoltDifferenceCount} = ${oneJoltDifferenceCount*threeJoltDifferenceCount}\n`);
  });


  const exampleOneData: Array<string> = (`
  16
  10
  15
  5
  1
  11
  7
  19
  6
  12
  4
  `).trim().split("\n").map(l => l.trim());

  const exampleTwoData: Array<string> = (`
  28
  33
  18
  42
  31
  14
  46
  20
  48
  47
  24
  23
  49
  45
  19
  38
  39
  11
  1
  32
  25
  35
  8
  17
  7
  9
  4
  2
  34
  10
  3
  `).trim().split("\n").map(l => l.trim());

  const sourceData: Array<string> = (`
  99
  128
  154
  160
  61
  107
  75
  38
  15
  11
  129
  94
  157
  84
  121
  14
  119
  48
  30
  10
  55
  108
  74
  104
  91
  45
  134
  109
  164
  66
  146
  44
  116
  89
  79
  32
  149
  1
  136
  58
  96
  7
  60
  23
  31
  3
  65
  110
  90
  37
  43
  115
  122
  52
  113
  123
  161
  50
  95
  150
  120
  101
  126
  151
  114
  127
  73
  82
  162
  140
  51
  144
  36
  4
  163
  85
  42
  59
  67
  64
  86
  49
  2
  145
  135
  22
  24
  33
  137
  16
  27
  70
  133
  130
  20
  21
  83
  143
  100
  41
  76
  17
  `).trim().split("\n").map(l => l.trim());
});

