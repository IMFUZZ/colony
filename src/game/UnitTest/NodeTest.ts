class NodeTest extends UnitTest {
    constructor(selector: string)
    {
        super(selector, NodeTest.name);
    }

    testAddLink()
    {
        let node = new NodeEntity(10,10);
        super.assertTrue(node.links.length == 0);
        let link = new Link(null,null);
        node.addLink(link);
        super.assertTrue(node.links.length == 1);
        super.assertTrue(node.links[0] == link);
    }

    testBelongsTo()
    {
        let color = 0xffffff
        let player = new Player(color,22);
        let node = new NodeEntity(10,10);
        super.assertTrue(!node.belongsTo(player));
        node.setOwner(player);
        super.assertTrue(node.belongsTo(player));
        super.assertTrue(node.color == color);
    }
}

$(document).ready(function()
{
    let test = new NodeTest("#results");
    test.run();
})