class Player {

  readonly id: number;

  // attention: un id doit etre une puissance de 2
  constructor(public color: number, id = 0) {
    this.id = id || Math.pow(2, Player.count);
    Player.count += 1;
  }

  isOwnerOf(a_node: NodeEntity): boolean {
    return (a_node.getOwner() & this.id) == this.id;
  }

  private static count:number = 0;
  public static readonly NONE:number = 0;
}