scene.set_background_color(9)
Cat = sprites.create(assets.image("""
    Cat
"""), SpriteKind.player)
tiles.set_current_tilemap(tilemap("""
    level
"""))
controller.move_sprite(Cat, 100, 0)
Cat.ay = 100
scene.camera_follow_sprite(Cat)
pause(2000)
game.splash("Use arrow keys to move")
pause(500)
game.splash("You can only move left and right")

def on_on_update():
    Cat.set_image(assets.image("""
        Cat
    """))
    if Cat.vx < 0:
        Cat.image.flip_x()
game.on_update(on_on_update)
