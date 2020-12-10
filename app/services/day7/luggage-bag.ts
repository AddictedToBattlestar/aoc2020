export default class LuggageBag {
  private _luster: string;
  private _color: string;
  private _parents: Array<LuggageBag>;
  private _children: Array<LuggageBag>;
  private _childrenQuantities: Map<string, number>;
  private _key: string;

  constructor(luster: string, color: string) {
    this._luster = luster;
    this._color = color;
    this._parents = [];
    this._children = [];
    this._childrenQuantities = new Map();
    this._key = `${luster}|${color}`;
  }

  get luster(): string {
    return this._luster;
  }
  get color(): string {
    return this._color;
  }
  get parents(): Array<LuggageBag> {
    return this._parents;
  }
  get children(): Array<LuggageBag> {
    return this._children;
  }
  get key(): string {
    return this._key;
  }
  public addParent(parent: LuggageBag) {
    this._parents.push(parent);
  }
  public addChild(child: LuggageBag, quantity: number) {
    this._children.push(child);
    this._childrenQuantities.set(child.key, quantity);
  }
  public getCountOfBagsWithin(): number {
    let result = 0;
    this._children.forEach(child => {
      const numberOfChildInstances: number | undefined = this._childrenQuantities.get(child.key);
      if (!numberOfChildInstances) {
        throw `-Day 7- ERROR. Unable to get count of bags of child (${this.key})`;
      }
      result += numberOfChildInstances;

      const numberOfTotalBagsInSingleChildInstance: number = child.getCountOfBagsWithin();
      result += numberOfChildInstances * numberOfTotalBagsInSingleChildInstance;
    });
    return result;
  }

  public getParentCount(): number {
    const distinctParents: Array<string> = [...this.getParentKeys()];
    console.debug(distinctParents);
    return distinctParents.length;
  }
  public getParentKeys(): Set<string> {
    let result: Set<string> = new Set();
    this._parents.forEach(p => {
      console.debug(`${p.key} contains ${this.key}`);
      result.add(p.key);
      p.getParentKeys().forEach(pk => {
        result.add(pk);
      });
    });
    return result;
  }
}
