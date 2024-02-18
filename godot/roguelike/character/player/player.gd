extends BaseCharacter
class_name Player

@onready var sword = get_node("Sword")
@onready var sword_animation_player = sword.get_node("SwordAnimationPlayer")
@onready var sword_slash_sprite = sword.get_node("SlashSprite")

func _ready():
	sword_slash_sprite.hide()

func _process(delta):
	var mouse_direction = (get_global_mouse_position()-global_position).normalized()
	if mouse_direction.x>0 and animated_sprite_2d.flip_h:
		animated_sprite_2d.flip_h =false
	elif mouse_direction.x<0 and not animated_sprite_2d.flip_h:
		animated_sprite_2d.flip_h =true
		
	sword.rotation = mouse_direction.angle()
	if sword.scale.y==1 and mouse_direction.x <0:
		sword.scale.y=-1
		#print("此",sword.scale)
	elif sword.scale.y== -1 and mouse_direction.x >0:
		sword.scale.y=1
		#print("此时",sword.scale)
		
	if Input.is_action_pressed("ui_attack"):
		sword_slash_sprite.show() 
		if not sword_animation_player.is_playing():
			sword_animation_player.play("attack")

func get_input():
	mov_direction =Vector2.ZERO
	if Input.is_action_pressed("ui_down"):
		mov_direction += Vector2.DOWN
	if Input.is_action_pressed("ui_up"):
		mov_direction += Vector2.UP
	if Input.is_action_pressed("ui_left"):
		mov_direction += Vector2.LEFT
	if Input.is_action_pressed("ui_right"):
		mov_direction += Vector2.RIGHT

func _on_hurt_box_hurt(hitbox: HitBox) -> void:
	var pending_damage:= Damge.new()
	pending_damage.damage = hitbox.damage
	pending_damage.soure = hitbox.owner
