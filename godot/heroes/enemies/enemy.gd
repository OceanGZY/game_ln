extends CharacterBody2D

class_name Enemy

enum Direction {
	LEFT = -1,
	RIGHT =1
}

# @export 第一步执行，比onready早
@export var direction := Direction.LEFT:
	set(v):
		direction = v
		if not is_node_ready(): # 等待redy信号之后再初始化
			await ready
		graphics.scale.x = -direction

@export var max_speed:float =100.0
@export var acceleraion:float = 2000.0

# @onready 第二步执行
@onready var animation_player: AnimationPlayer = $AnimationPlayer
@onready var state_macine: StateMacine = $StateMacine
@onready var graphics: Node2D = $Graphics
@onready var stats: Stats = $Stats

var default_gravity := ProjectSettings.get("physics/2d/default_gravity") as float


func move(speed:float,delta:float):
	velocity.x = move_toward(velocity.x, speed*direction, acceleraion *delta)
	velocity.y += default_gravity * delta
	
	move_and_slide()
