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

    testInsert()
    {
        let node = new NodeEntity(10,10);
        super.assertTrue(node.resources["gold"].amount == 100);
        super.assertTrue(node.resources["food"].amount == 100);
        super.assertTrue(node.resources["population"].amount == 100);
        node.insert(150, "gold");
        node.insert(50, "food");
        node.insert(300, "population");
        super.assertTrue(node.resources["gold"].amount == 250);
        super.assertTrue(node.resources["food"].amount == 150);
        super.assertTrue(node.resources["population"].amount == 400);
    }
    
    testExtract() 
    {
        let node = new NodeEntity(10,10);
        super.assertTrue(node.resources["gold"].amount == 100);
        super.assertTrue(node.resources["food"].amount == 100);
        super.assertTrue(node.resources["population"].amount == 100);
        node.extract(10, "gold");
        node.extract(15, "food");
        node.extract(20, "population");
        super.assertTrue(node.resources["gold"].amount == 90);
        super.assertTrue(node.resources["food"].amount == 85);
        super.assertTrue(node.resources["population"].amount == 80);
        
    }
}

$(document).ready(function()
{
    let test = new NodeTest("#results");
    test.run();
})