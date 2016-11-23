class contextMenu {
  $menu;
  constructor(selector: string){
    this.$menu = $(selector);
    this.$menu.hide();
  }

  addItem(item : IMenuItem){
    var $item = $("<div class='menu-item'>" + item.name + "</div>");
    if(item.isSubMenu)
    {
      $item.click(()=> {
        this.clear();
        this.$menu.append(item.subMenuContent);
      });
    }else{
      $item.click(() => {item.execute(); this.hide()});
    }
    this.$menu.append($item);
  }

  addItems(items : IMenuItem[])
  {
    items.forEach((element) => { this.addItem(element)});
  }

  clear()
  {
    this.$menu.empty();
  }

  show()
  {
    this.$menu.show();
  }

  hide()
  {
    this.$menu.hide();
  }

  showAt(top:number,left : number)
  {
    this.$menu.css({ top: top, left: left});
    this.show();
  }

  showOverNode(node: Node)
  {
    
  }
}

interface IMenuItem{
  name: string;
  isSubMenu : boolean;
  execute?;
  subMenuContent?;
}

var ContextMenu;
$(function(){
  ContextMenu = new contextMenu(".context-menu");
  ContextMenu.addItem({ name : "Transferer des ressources!", isSubMenu :false, execute : function(){alert("Transferer des ressources!")}});
  ContextMenu.addItem({ name : "Detruire la node", isSubMenu: false, execute : function(){alert("Detruire la node!")}});
  ContextMenu.addItem({ name : "Wow test un peu returd", isSubMenu: false, execute : function(){alert("Wow test un peu returd")}});
  var $submenu = $("<input type='text'></input>");
  ContextMenu.addItem({ name : "iasioajoasfojasfoasf", isSubMenu : true, subMenuContent : $submenu});
  ContextMenu.showAt(200,200);
});

$(document).contextmenu(function() {
    return false;
});
