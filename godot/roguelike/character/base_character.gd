@icon("res://assets/heroes/knight/knight_idle_anim_f0.png")
extends CharacterBody2D
class_name BaseCharacter

@export var accerelation:int = 40
@export var max_spped:int = 100
@onready var animated_sprite_2d = get_node("AnimatedSprite2D")


const FRICTION :float =0.5 # 摩擦力

var mov_direction :Vector2 =Vector2.ZERO

func _physics_process(delta):
	move_and_slide()
	velocity= lerp(velocity,Vector2.ZERO,FRICTION)
	
func move():
	mov_direction = mov_direction.normalized()
	velocity+= mov_direction* accerelation
