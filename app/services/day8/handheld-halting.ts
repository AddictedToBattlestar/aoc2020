import Service from '@ember/service';

export default class Day8HandheldHalting extends Service.extend({
}) {
  public getAccumulatorValuePriorToRepetition(instructionCodesRaw: Array<string>): number {
    try {
      return this.processAndGetAccumulator(instructionCodesRaw);
    } catch (error) {
      console.info(error.message);
      return error.accumulatorValueAtTimeOfError;
    }
  }

  public fixBadInstructionAndGetAccumulatorValue(instructionCodesRaw: Array<string>): number {
    for (let i = 1; i < instructionCodesRaw.length; i++) {
      const {instructionCommand} = this.parseRawInstructionCode(instructionCodesRaw[i]);
      if (instructionCommand !== "acc") {
        const clonedInstructionCodesRaw: Array<string>  = Object.assign([], instructionCodesRaw);
        switch(instructionCommand) {
          case "jmp":
            console.debug(`Testing the replacement of a "jmp" instruction with a "nop" on line ${i + 1}`);
            clonedInstructionCodesRaw[i] = clonedInstructionCodesRaw[i].replace("jmp", "nop");
            break;
          case "nop":
            console.debug(`Testing the replacement of a "nop" instruction with a "jmp" on line ${i + 1}`);
            clonedInstructionCodesRaw[i] = clonedInstructionCodesRaw[i].replace("nop", "jmp");
        }
        try {
          const result = this.processAndGetAccumulator(clonedInstructionCodesRaw);
          console.info(`SUCCESSFULLY replaced the instruction on line ${i + 1} and the accumulator value result was ${result}.`)
          return result;
        } catch (error) {
            console.error(`Tried replacing the instruction on line ${i + 1} without success.`)
        }
      }
    }
    return 0;
  }

  private processAndGetAccumulator(instructionCodesRaw: Array<string>): number {
    let currentInstructionIndex: number = 0;
    let accumulatorValue: number = 0;
    let instructionsExecuted: Array<number> = [];
    do {
      if (instructionsExecuted.includes(currentInstructionIndex)) {
        throw {message: "Encountered instruction previously processed", accumulatorValueAtTimeOfError: accumulatorValue};
      }
      console.debug(`Processing command: ${instructionCodesRaw[currentInstructionIndex]}, line: ${currentInstructionIndex + 1}`);
      instructionsExecuted.push(currentInstructionIndex);
      const {instructionCommand, instructionValue} = this.parseRawInstructionCode(instructionCodesRaw[currentInstructionIndex]);
      switch(instructionCommand) {
        case "acc":
          accumulatorValue += instructionValue;
          console.debug(`Accumulator increased by ${instructionValue} to now be: ${accumulatorValue}`);
          currentInstructionIndex++;
          break;
        case "jmp":
          currentInstructionIndex = (currentInstructionIndex + instructionValue);
          break;
        case "nop":
          currentInstructionIndex++;
      }
    } while (currentInstructionIndex < instructionCodesRaw.length)
    return accumulatorValue;
  }

  private parseRawInstructionCode(instructionCodeRaw: string): any {
    const instructionCodeBreakdown = instructionCodeRaw.split(" ");
    return {
      instructionCommand: instructionCodeBreakdown[0],
      instructionValue: Number(instructionCodeBreakdown[1])
    };
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'day8/handheld-halting': Day8HandheldHalting;
  }
}
