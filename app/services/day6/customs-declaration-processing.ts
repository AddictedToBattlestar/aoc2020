import Service from '@ember/service';

export default class Day6CustomsDeclarationProcessing extends Service.extend({
}) {
  public countValidCustomDeclarationsByGroup(answersForCustomsDeclarations: Array<string>, whereAllAnswersInGroupAreYes: boolean = false): number {
    let state: any = {
      totalDistinctAnswersInAllDeclarations: 0,
      currentGroupAnswers: {},
      numberOfPeopleInGroup: 0
    }
    for (let declarationAnswerLine of answersForCustomsDeclarations) {
      console.log(`-Day 6- processing line: "${declarationAnswerLine}"`);
      if (declarationAnswerLine === "") {
        this.processGroupAnswers(state, whereAllAnswersInGroupAreYes);
      } else {
        for (let answer of declarationAnswerLine) {
          state.currentGroupAnswers[answer] = state.currentGroupAnswers[answer] ? state.currentGroupAnswers[answer] + 1 : 1;
        }
        state.numberOfPeopleInGroup++;
      }
    }
    this.processGroupAnswers(state, whereAllAnswersInGroupAreYes);
    return state.totalDistinctAnswersInAllDeclarations;
  }

  private processGroupAnswers(state: any, whereAllAnswersInGroupAreYes: boolean) {
    let distinctAnswerCountInGroup = 0;
    if (whereAllAnswersInGroupAreYes) {
      for (let answerKey in state.currentGroupAnswers) {
        if (state.currentGroupAnswers[answerKey] === state.numberOfPeopleInGroup) {
          distinctAnswerCountInGroup++;
        }
      }
    } else {
      distinctAnswerCountInGroup = Object.keys(state.currentGroupAnswers).length;
    }

    state.totalDistinctAnswersInAllDeclarations += distinctAnswerCountInGroup;
    console.log(`-Day 6- Group processing terminated.  Distinct count of answers in group: ${distinctAnswerCountInGroup}.  Current total count: ${state.totalDistinctAnswersInAllDeclarations}`)
    state.currentGroupAnswers = {};
    state.numberOfPeopleInGroup = 0;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'day6/customs-declaration-processing': Day6CustomsDeclarationProcessing;
  }
}
