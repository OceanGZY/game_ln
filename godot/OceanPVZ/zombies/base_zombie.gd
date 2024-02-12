extends CharacterBody2D

@onready var animation_tree = $AnimationTree

@export var life:int=100

var hited_plant:bool=false
var half_life:bool=false

func _physics_process(delta):
	collision_check(delta)
	change_move_state()
	
func collision_check(delta):
	var collision = move_and_collide(velocity * delta)
	if collision:
		print("I collided with ", collision.get_collider().name)
	
func change_move_state():
	if life<=50:
		half_life=true #通过expression设置动画状态

