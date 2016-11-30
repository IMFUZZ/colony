class contextMenu {
  $menu;
  margin:number;
  currentNode: NodeEntity;
  constructor(selector: string){
    this.$menu = $(selector);
    this.margin = 5;
    this.$menu.hide();
  }

  addItem(item : IMenuItem){
    var $item = $("<div class='menu-item'>" + item.name + "</div>");
    if(item.isSubMenu)
    {
      $item.click(()=> {
        this.clear();
        this.$menu.append(item.subMenuContent);
        if(this.currentNode) {
          this.showAtNode(this.currentNode);
        }
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
    this.currentNode = null;
    this.$menu.css({ top: top, left: left});
    this.show();
  }

  showAtNode(node: NodeEntity)
  {
    this.currentNode = node;
    var heigth:number, width:number, x:number, y:number;
    heigth = this.$menu.outerHeight();
    width = this.$menu.outerWidth();

    x = node.graphic.x - width/2;
    y = node.graphic.y - (node.radius* 2) - this.margin - heigth;
    x = Math.max(x,0);
    if (y < 0) {
      y = node.graphic.y + (node.radius*2) + this.margin;
    }
    this.$menu.css({top: y, left: x});
    this.show();
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
