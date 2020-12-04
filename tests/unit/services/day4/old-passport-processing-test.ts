import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | day4/old-passport-processing', function(hooks) {
  setupTest(hooks);
  let service: any;

  hooks.beforeEach(function () {
    service = this.owner.lookup('service:day4/passport-processing');
  });

  // test('it solves the example provided from aoc for part 1', function (assert) {
  //   const result = service.countValidPassports(exampleData);
  //   assert.equal(result, 2);
  // });

  const exampleData: Array<string> = (`
  ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
  byr:1937 iyr:2017 cid:147 hgt:183cm

  iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
  hcl:#cfa07d byr:1929

  hcl:#ae17e1 iyr:2013
  eyr:2024
  ecl:brn pid:760753108 byr:1931
  hgt:179cm

  hcl:#cfa07d eyr:2025 pid:166559648
  iyr:2011 ecl:brn hgt:59in
  `).trim().split("\n").map(l => l.trim());
});

