class LinkTest extends UnitTest {
    constructor(selector: string)
    {
        super(selector, LinkTest.name);
    }

    testAddTransfert()
    {
        let link = new Link(null,null);
        super.assertTrue(link.transferts.length == 0);
        link.addTransfer();
        super.assertTrue(link.transferts.length == 1);
    }

    testConstructor()
    {
        let nodeA = new NodeEntity(22, 10);
        let nodeB = new NodeEntity(22,10);
        let link = new Link(nodeA, nodeB);
        super.assertTrue(link.nodeA == nodeA && link.nodeB == nodeB);
    }


    testReset()
    {
        let nodeA = new NodeEntity(22, 10);
        let nodeB = new NodeEntity(22,10);
        let link = new Link(nodeA, nodeB);
        link.reset();
        super.assertTrue(link.transferts.length == 0);
    }
}

$(document).ready(function()
{
    let test = new LinkTest("#results");
    test.run();
})