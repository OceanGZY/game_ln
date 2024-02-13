extends CharacterBody2D

#var player
@onready var player = get_node("/root/Game/Player")
@onready var slime = $Slime
const SMOKEEFECT=preload("res://smoke_explosion/smoke_explosion.tscn")
var smoke

var life = 3

func _ready():
	slime.play_walk()
	smoke = SMOKEEFECT.instantiate()

func _physics_process(delta):
	var direction = global_position.direction_to(player.global_position)
	velocity = direction * 300.0
	move_and_slide()

func take_damage():
	slime.play_hurt()
	life -=1
	if life ==0:
		queue_free()
		get_parent().add_child(smoke)
		smoke.global_position=global_position
		
