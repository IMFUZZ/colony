class Player {

  readonly id: number;

  constructor() {
    this.id = Math.pow(2, Player.count);
    Player.count += 1;
  }

  isOwnerOf(a_node: NodeEntity): boolean {
    return (a_node.owner & this.id) == this.id;
  }

  private static count:number = 0;
  public static readonly NONE:number = 0;
}