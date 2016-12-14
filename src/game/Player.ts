class Player {

  readonly id: number;
  
  constructor(public color: number, id?: number,) {
    this.id = (id == undefined) ? Math.pow(2, Player.count) : id;
    Player.count += 1;
  }

  isOwnerOf(a_node: NodeEntity): boolean {
    return (a_node.getOwner() & this.id) == this.id;
  }

  private static count:number = 0;
  public static readonly NONE:number = 0;
}