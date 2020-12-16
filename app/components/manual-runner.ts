import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Day13ShuttleBusCalculator from '../services/day13/shuttle-bus-calculator';

interface ManualRunnerArgs {}

export default class ManualRunner extends Component<ManualRunnerArgs> {
  @service("shuttle-bus-calculator") shuttleBusCalculator!: Day13ShuttleBusCalculator;
  @tracked result: string = "";

  @action
  manuallyExecute() {
    this.result = "";
    const result = this.shuttleBusCalculator.getNextTimeStampWithFullLineup(sourceData);
    if (result) {
      this.result = result.toString();
    } else {
      this.result = "No value returned."
    }
  }
}

const sourceData: string = "41,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,971,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,17,13,x,x,x,x,23,x,x,x,x,x,29,x,487,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,19";
