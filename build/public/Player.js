var Player = (function () {
    function Player() {
        this.id = Math.pow(2, Player.count);
        Player.count += 1;
    }
    Player.prototype.isOwnerOf = function (a_node) {
        return (a_node.owner & this.id) == this.id;
    };
    Player.count = 0;
    Player.NONE = 0;
    return Player;
}());
