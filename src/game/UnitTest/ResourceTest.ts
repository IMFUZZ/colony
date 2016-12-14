class ResourceTest extends UnitTest {
    constructor(selector: string)
    {
        super(selector, ResourceTest.name);
    }

    testConstructor()
    {
        let resource = new Resource("gold", 100, 0.01, 1);
        super.assertTrue(resource.amount == 100);
        super.assertTrue(resource.name == "gold");
        super.assertTrue(resource.growthRatio == 0.01);
    }

    testUpdate() 
    {
        let resource = new Resource("gold", 100, 0.01, 1);
        resource.update();
        super.assertTrue(resource.amount == 102);
    }
}

$(document).ready(function()
{
    let test = new ResourceTest("#results");
    test.run();
})