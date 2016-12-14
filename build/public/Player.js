var Player = (function () {
    function Player(color, id) {
        this.color = color;
        this.id = (id == undefined) ? Math.pow(2, Player.count) : id;
        Player.count += 1;
    }
    Player.prototype.isOwnerOf = function (a_node) {
        return (a_node.getOwner() & this.id) == this.id;
    };
    Player.count = 0;
    Player.NONE = 0;
    return Player;
}());
