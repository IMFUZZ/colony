class MenuFactory {
    SpawnMenuAtNode(node : NodeEntity, type : MenuType) {
        game.contextMenu.clear();
        switch(type)
        {
            case MenuType.OwnedNode:
                this.FillOwnedNodeMenuAtNode(node)
            break;
            default:
            break;
        }
        game.contextMenu.showAtNode(node);
    }

    FillOwnedNodeMenuAtNode(node : NodeEntity)
    {
        game.contextMenu.addItems(
            [
                { 
                    name: "OwnedNode",
                    isSubMenu : false,
                    execute : function() {
                        alert("Allo");
                    }
                }
            ]
        );
    }
}