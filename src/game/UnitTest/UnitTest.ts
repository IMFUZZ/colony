class UnitTest {
    $container
    private currentMethodName :string
    private currentResult : boolean
    constructor(selector : string, public classTest : string) 
    {
        this.$container = $(selector);
    }

    assertTrue(condition: boolean)
    {
        if(condition === false)
        {
            this.currentResult = false;
        }
        // this.showResult(condition);
    }
    private showResult(success : boolean)
    {
        this.$container.append($("<div style='color:" + (success? "green" : "red") + "'>" + (success? "Passed | " : "Failed | ") + this.currentMethodName + "</div>"));
    }

    run() {
        this.$container.append($("<h1>" + this.classTest + "</h1>"));
        for(var key in this)
        {
            if(key.startsWith("test"))
            {
                this.currentResult = true;
                this.currentMethodName = key;
                this[key]();
                this.showResult(this.currentResult);
            }
        }
    }
}

class TestUnitTest extends UnitTest {
    constructor(selector) {
        super(selector, TestUnitTest.name);
    }

    private testIsWorking(){
        super.assertTrue(5 == 5);
    }

    private testIsFailing(){
        var test = 4;
        super.assertTrue(5 == test);
    }
}

$(document).ready(function(){
    var test = new TestUnitTest("#results");
    test.run();
});