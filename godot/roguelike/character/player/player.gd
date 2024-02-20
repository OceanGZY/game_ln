extends BaseCharacter
class_name Player

@onready var sword = get_node("Sword")
@onready var sword_animation_player = sword.get_node("SwordAnimationPlayer")
@onready var sword_slash_sprite = sword.get_node("SlashSprite")
@onready var life_panel: ProgressBar = $LifePanel
@onready var hit_box: HitBox = $Sword/Node2D/Sprite2D/HitBox


func _ready():
	life_panel.value = character_state.helath  / character_state.max_health
	hit_box.damage = character_state.damage
	hit_box.knock_back_direction = character_state.knock_back_direction
	hit_box.knock_back_force = character_state.knock_back_force
	sword_slash_sprite.hide()
	sword.visible=false
	match character_state.weapon_type:
		AllEnums.WeaponType.SWORD:
			sword.visible=true


func _process(delta):
	life_panel.value = character_state.helath  / float(character_state.max_health)
	character_state.helath += character_state.health_regen *delta
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
		match character_state.weapon_type:
			AllEnums.WeaponType.SWORD:
				sword_slash_sprite.show() 
				if not sword_animation_player.is_playing():
					sword_animation_player.play("attack")

func get_input():
	character_state.mov_direction =Vector2.ZERO
	if Input.is_action_pressed("move_down"):
		character_state.mov_direction += Vector2.DOWN
	if Input.is_action_pressed("move_up"):
		character_state.mov_direction += Vector2.UP
	if Input.is_action_pressed("move_left"):
		character_state.mov_direction += Vector2.LEFT
	if Input.is_action_pressed("move_right"):
		character_state.mov_direction += Vector2.RIGHT

func _on_hurt_box_hurt(hit_source) -> void:
	#var pending_damage:= Damge.new()
	#pending_damage.damage = hitbox.damage
	#pending_damage.soure = hitbox.owner
	print("敌人撞住我了")
	print(hit_source)
	character_state.helath -= hit_source.damage
	print("玩家剩余血量",character_state.helath)
	var tween:=create_tween()
	tween.tween_property(self,"self_modulate",Color(255,0,0),0.1)
	tween.tween_property(self,"self_modulate",Color(255,255,255),0.1)
	
	
