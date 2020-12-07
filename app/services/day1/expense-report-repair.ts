import Service from "@ember/service";

export default class Day1ExpenseReportRepair extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  // normal class body definition here
  public findTheTwoEntriesThatSumTo2020(
    expenseReportEntries: Array<number>
  ): number {
    for (let x = 0; x < expenseReportEntries.length - 1; x++) {
      for (let y = x + 1; y < expenseReportEntries.length; y++) {
        if (expenseReportEntries[x] + expenseReportEntries[y] === 2020) {
          const multipliedResult = expenseReportEntries[x] * expenseReportEntries[y];
          console.log(`-Day 3- ${expenseReportEntries[x]} + ${expenseReportEntries[y]} = 2020, multiplied result = ${multipliedResult}\n`);
          return multipliedResult;
        }
      }
    }
    return 0;
  }

  public findTheThreeEntriesThatSumTo2020(
    expenseReportEntries: Array<number>
  ): number {
    for (let x = 0; x < expenseReportEntries.length - 2; x++) {
      for (let y = x + 1; y < expenseReportEntries.length - 1; y++) {
        for (let z = y + 1; z < expenseReportEntries.length; z++) {
          if (expenseReportEntries[x] + expenseReportEntries[y]+ expenseReportEntries[z] === 2020) {
            const multipliedResult = expenseReportEntries[x] * expenseReportEntries[y] * expenseReportEntries[z];
            console.log(`-Day 3- ${expenseReportEntries[x]} + ${expenseReportEntries[y]} + ${expenseReportEntries[z]} = 2020, multiplied result = ${multipliedResult}.\n`);
            return multipliedResult;
          }
        }
      }
    }
    return 0;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module "@ember/service" {
  interface Registry {
    "day1/expense-report-repair": Day1ExpenseReportRepair;
  }
}
