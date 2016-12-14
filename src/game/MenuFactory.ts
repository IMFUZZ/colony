class MenuFactory {
    SpawnMenuAtNode(node : NodeEntity, type : MenuType) {
        game.contextMenu.clear();
        switch(type)
        {
            case MenuType.OwnedNode:
                game.contextMenu.addItems(
                    [
                        { 
                            name: "OwnedNode",
                            isSubMenu : false,
                            execute : function()
                            {
                                alert("Allo");
                            }
                        }
                    ]
                );
            break;
            default:
            break;
        }
        game.contextMenu.showAtNode(node);
    }
}