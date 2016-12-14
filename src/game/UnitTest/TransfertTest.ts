class TransfertTest extends UnitTest {
    constructor(selector: string)
    {
        super(selector, TransfertTest.name);
    }

    testUpdate() 
    {
        let nodeA = new NodeEntity(10, 10);
        let nodeB = new NodeEntity(10, 10);

        let link = new Link(nodeA, nodeB);
        let transfert = new Transfert(link, 0.01, 1, "gold");
        transfert.update();
        super.assertTrue(transfert.lk.nodeA.resources["gold"].amount == 98); 
        super.assertTrue(transfert.lk.nodeB.resources["gold"].amount == 102);
    }
}

$(document).ready(function()
{
    let test = new TransfertTest("#results");
    test.run();
})