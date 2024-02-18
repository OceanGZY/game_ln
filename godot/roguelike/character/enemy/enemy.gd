@icon("res://assets/enemies/goblin/goblin_idle_anim_f0.png")
extends BaseCharacter
class_name Enemy

@export var speed:int =50

@onready var player:CharacterBody2D = get_tree().current_scene.get_node("Player")
@onready var navigation_agent_2d: NavigationAgent2D = $Node2D/NavigationAgent2D


func _ready() -> void:
	animated_sprite_2d.play("idle")

func _on_timer_timeout() -> void:
	navigation_agent_2d.target_position = player.global_position
	#print("player.global_position",player.global_position)
	#print("player.position",player.position)
	
func  _physics_process(delta: float) -> void:
	var direction: = to_local(navigation_agent_2d.get_next_path_position()).normalized()
	#print("navigation_agent_2d.get_next_path_position()",navigation_agent_2d.get_next_path_position())
	#print("to_local(navigation_agent_2d.get_next_path_position())",to_local(navigation_agent_2d.get_next_path_position()))
	#print("to_global(navigation_agent_2d.get_next_path_position())",to_global(navigation_agent_2d.get_next_path_position()))
	#velocity = direction * speed
	#move_and_slide()
	navigation_agent_2d.velocity =direction * speed


func _on_navigation_agent_2d_velocity_computed(safe_velocity: Vector2) -> void:
	#print("计算出避障速度发出通知")
	velocity = safe_velocity
	animated_sprite_2d.play("run")
	move_and_slide()
