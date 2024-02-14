extends CharacterBody2D

const RUN_SPEED := 160.0
const JUMP_VELOCITY := -300.0
const FLOOR_ACCELERATION:=RUN_SPEED/0.2
const AIR_ACCELERATION:=RUN_SPEED/0.02

@onready var coyote_timer: Timer = $CoyoteTimer
@onready var jump_request_timer: Timer = $JumpRequestTimer

@onready var sprite_2d:Sprite2D = $Sprite2D
@onready var animation_player:AnimationPlayer = $AnimationPlayer

var gravity := ProjectSettings.get("physics/2d/default_gravity") as float

func _physics_process(delta:float) -> void:
	var direction := Input.get_axis("move_left","move_right")

	#velocity.x = direction * RUN_SPEED
	var acceleration = FLOOR_ACCELERATION if is_on_floor() else AIR_ACCELERATION
	velocity.x = move_toward(velocity.x,direction* RUN_SPEED, acceleration*delta)
	velocity.y += gravity*delta 
	
	print("coyote_timer.time_left",coyote_timer.time_left)
	var can_jump := is_on_floor() or coyote_timer.time_left>0 # coyote_timer实现在空中连跳
	print("jump_request_timer.time_left",jump_request_timer.time_left)
	var should_jump := can_jump and  jump_request_timer.time_left>0
	if should_jump:
		velocity.y = JUMP_VELOCITY
		coyote_timer.stop()
		jump_request_timer.stop()
	
	if is_on_floor():
		if is_zero_approx(direction) and is_zero_approx(velocity.x): # x分量几乎为0
			animation_player.play("idle")
		else:
			animation_player.play("running")
	else:
		animation_player.play("jump")
		
		
	if not is_zero_approx(direction):
		sprite_2d.flip_h= direction <0
	
	var was_on_floor := is_on_floor()
	move_and_slide()
	
	if is_on_floor() != was_on_floor:
		if was_on_floor:
			coyote_timer.start()
		else:
			coyote_timer.stop()


func _unhandled_input(event: InputEvent) -> void:
	if event.is_action_pressed("jump"):
		jump_request_timer.start() # 实现在接触地面前就会起跳
	
	if event.is_action_released("jump"):
		jump_request_timer.stop()
		if velocity.y < JUMP_VELOCITY /2:
			velocity.y = JUMP_VELOCITY /2 # 如果松开跳跃键以后, 速度比跳跃速度小,则加速跳跃结束 --- >松的越早跳的低, 即为 大小跳
	
	
