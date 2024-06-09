namespace SpriteKind {
    export const Fire = SpriteKind.create()
    export const Portal = SpriteKind.create()
    export const Coins = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Cat.vy == 0) {
        Cat.vy = -75
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Portal, function (sprite, otherSprite) {
    game.gameOver(true)
    game.setGameOverEffect(true, effects.confetti)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Fire`, function (sprite, location) {
    game.gameOver(false)
    game.setGameOverEffect(false, effects.melt)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coins, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite, effects.spray, 500)
})
let PortalSprite: Sprite = null
let Coin: Sprite = null
let Cat: Sprite = null
scene.setBackgroundColor(9)
Cat = sprites.create(assets.image`Cat`, SpriteKind.Player)
tiles.setCurrentTilemap(tilemap`level`)
for (let value of tiles.getTilesByType(assets.tile`Coins placeholder`)) {
    Coin = sprites.create(assets.image`Coin`, SpriteKind.Coins)
    animation.runImageAnimation(
    Coin,
    assets.animation`AnimationCoin`,
    100,
    true
    )
    tiles.placeOnTile(Coin, value)
    tiles.setTileAt(value, assets.tile`transparency16`)
    for (let value of tiles.getTilesByType(assets.tile`Portal`)) {
        PortalSprite = sprites.create(assets.image`Portal`, SpriteKind.Portal)
        animation.runImageAnimation(
        PortalSprite,
        assets.animation`AnimationPortal`,
        100,
        true
        )
        tiles.placeOnTile(PortalSprite, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
controller.moveSprite(Cat, 100, 0)
Cat.ay = 100
scene.cameraFollowSprite(Cat)
pause(2000)
game.splash("Use arrow keys to move")
pause(500)
game.splash("You can jump up and down left and right")
game.onUpdate(function () {
    Cat.setImage(assets.image`Cat`)
    if (Cat.vx < 0) {
        Cat.image.flipX()
    }
})
