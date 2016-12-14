enum MenuType {
    None = 0,
    OwnedNode = 1 << 0,
    OwnedNodeToOwnedNode = 1 << 1,
    OwnedNodeToInRangeNode = 1 << 2,
    SelfNodeToEnemyNode = 1 << 3,
    RangeNode = 1 << 4,
    EnemyNode = 1 << 5
}