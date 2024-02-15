extends CharacterBody2D

enum ACTState{
	IDLE,
	RUNNING,
	JUMP,
	FALL,
	LANDING
}

const GROUND_STATES:=[ACTState.IDLE,ACTState.RUNNING,ACTState.LANDING]

const RUN_SPEED := 100.0
const JUMP_VELOCITY := -320.0
const FLOOR_ACCELERATION:=RUN_SPEED/0.2
const AIR_ACCELERATION:=RUN_SPEED/0.02

@onready var coyote_timer: Timer = $CoyoteTimer
@onready var jump_request_timer: Timer = $JumpRequestTimer

@onready var sprite_2d:Sprite2D = $Sprite2D
@onready var animation_player:AnimationPlayer = $AnimationPlayer

var default_gravity := ProjectSettings.get("physics/2d/default_gravity") as float
var is_first_tick:=false

#func _physics_process(delta:float) -> void:
	#var direction := Input.get_axis("move_left","move_right")
#
	##velocity.x = direction * RUN_SPEED
	#var acceleration = FLOOR_ACCELERATION if is_on_floor() else AIR_ACCELERATION
	#velocity.x = move_toward(velocity.x,direction* RUN_SPEED, acceleration*delta)
	#velocity.y += gravity*delta 
	#
	##print("coyote_timer.time_left",coyote_timer.time_left)
	#var can_jump := is_on_floor() or coyote_timer.time_left>0 # coyote_timer实现在空中连跳
	##print("jump_request_timer.time_left",jump_request_timer.time_left)
	#var should_jump := can_jump and  jump_request_timer.time_left>0
	#if should_jump:
		#velocity.y = JUMP_VELOCITY
		#coyote_timer.stop()
		#jump_request_timer.stop()
	#
	#if is_on_floor():
		#if is_zero_approx(direction) and is_zero_approx(velocity.x): # x分量几乎为0
			#animation_player.play("idle")
		#else:
			#animation_player.play("running")
	#elif velocity.y < 0:
		#animation_player.play("jump")
	#else:
		#animation_player.play("fall")
		#
		#
	#if not is_zero_approx(direction):
		#sprite_2d.flip_h= direction <0
	#
	#var was_on_floor := is_on_floor()
	#move_and_slide()
	#
	#if is_on_floor() != was_on_floor:
		#if was_on_floor:
			#coyote_timer.start()
		#else:
			#coyote_timer.stop()


func tick_phycis(state:ACTState,delta:float)->void:
	match state:
		ACTState.IDLE:
			move(default_gravity,delta)
		ACTState.RUNNING:
			move(default_gravity,delta)
		ACTState.JUMP:
			move(0.0 if is_first_tick else default_gravity,delta)
		ACTState.FALL:
			move(default_gravity,delta)
		ACTState.LANDING:
			stand(delta)
	is_first_tick= false

func move(gravity:float,delta:float)->void:
	var direction := Input.get_axis("move_left","move_right")
	var acceleration = FLOOR_ACCELERATION if is_on_floor() else AIR_ACCELERATION
	velocity.x = move_toward(velocity.x,direction* RUN_SPEED, acceleration*delta)
	velocity.y += gravity*delta
	if not is_zero_approx(direction):
		sprite_2d.flip_h= direction <0
	move_and_slide()
	

func stand(delta:float)->void:
	var acceleration := FLOOR_ACCELERATION if is_on_floor() else AIR_ACCELERATION
	velocity.x = move_toward(velocity.x,0.0, acceleration*delta)
	velocity.y += default_gravity * delta
	
	move_and_slide()
	
	

func _unhandled_input(event: InputEvent) -> void:
	if event.is_action_pressed("jump"):
		jump_request_timer.start() # 实现在接触地面前就会起跳
	
	if event.is_action_released("jump"):
		jump_request_timer.stop()
		if velocity.y < JUMP_VELOCITY /2:
			velocity.y = JUMP_VELOCITY /2 # 如果松开跳跃键以后, 速度比跳跃速度小,则加速跳跃结束 --- >松的越早跳的低, 即为 大小跳

func get_next_state(state:ACTState)->ACTState:
	var can_jump := is_on_floor() or coyote_timer.time_left>0 # coyote_timer实现在空中连跳
	var should_jump := can_jump and  jump_request_timer.time_left>0
	if should_jump:
		return ACTState.JUMP
	
	var direction := Input.get_axis("move_left","move_right")
	var is_stand_idle := is_zero_approx(direction) and is_zero_approx(velocity.x) 
	
	match state:
		ACTState.IDLE:
			if not is_on_floor():
				return ACTState.FALL
			if not is_stand_idle:
				return ACTState.RUNNING
		ACTState.RUNNING:
			if not is_on_floor():
				return ACTState.FALL
			if is_stand_idle:
				return ACTState.IDLE
		ACTState.JUMP:
			if velocity.y >=0:
				return ACTState.FALL
		ACTState.FALL:
			if is_on_floor():
				return ACTState.LANDING if is_stand_idle else ACTState.IDLE
		ACTState.LANDING:
			if not animation_player.is_playing():
				return ACTState.IDLE
	
	return state
	
func transition_state(from:ACTState,to:ACTState) -> void:
	# 判断from的类型 和to的类型
	if from not in GROUND_STATES  and to in GROUND_STATES:
		coyote_timer.stop()
		
	match to:
		ACTState.IDLE:
			animation_player.play("idle")
			
		ACTState.RUNNING:
			animation_player.play("running")
			
		ACTState.JUMP:
			animation_player.play("jump")
			velocity.y = JUMP_VELOCITY
			coyote_timer.stop()
			jump_request_timer.stop()
			
		ACTState.FALL:
			animation_player.play("fall")
			if from in GROUND_STATES:
				coyote_timer.start()
		ACTState.LANDING:
			animation_player.play("landing")
			
	is_first_tick= true
	
