extends CharacterBody2D

class_name Player

enum Direction{
	LEFT=-1,
	RIGHT=1
}

enum ACTState{
	IDLE,
	RUNNING,
	JUMP,
	FALL,
	LANDING,
	WALLSLIDING,
	WALLJUMP,
	ATTACK1,
	ATTACK2,
	ATTACK3,
	HURT,
	DYING,
	SLIDING_START,
	SLIDING_LOOP,
	SLIDING_END,
}

const GROUND_STATES:=[
	ACTState.IDLE,ACTState.RUNNING,ACTState.LANDING,
	ACTState.ATTACK1,ACTState.ATTACK2,ACTState.ATTACK3
]
const RUN_SPEED := 100.0
const JUMP_VELOCITY := -320.0
const FLOOR_ACCELERATION := RUN_SPEED/0.2
const AIR_ACCELERATION := RUN_SPEED/0.1
const WALL_JUMP_VELOCITY := Vector2(500,-280)

const KNOCKBACK_AMOUT := 200.0
const SLIDING_DURATION := 0.3
const SLIDING_SPEED :=100
const SLIDING_ENERGY :=4.0
const LANDING_HEIGHT:=100



@onready var coyote_timer: Timer = $CoyoteTimer
@onready var jump_request_timer: Timer = $JumpRequestTimer

#@onready var sprite_2d:Sprite2D = $Sprite2D

@onready var animation_player:AnimationPlayer = $AnimationPlayer
@onready var graphics: Node2D = $Graphics

@onready var hand_checker: RayCast2D = $Graphics/HandChecker
@onready var foot_checker: RayCast2D = $Graphics/FootChecker
@onready var state_macine: StateMacine = $StateMacine

@export var can_comboo:bool = false
@export var direction:= Direction.RIGHT:
	set(v):
		direction = v
		if not is_node_ready():
			await ready
		graphics.scale.x = direction

@onready var stats: Stats = Game.player_stats
@onready var invincible_timer: Timer = $InvincibleTimer
@onready var interaction_icon: AnimatedSprite2D = $InteractionIcon
@onready var slide_request_timer: Timer = $SlideRequestTimer


var default_gravity := ProjectSettings.get("physics/2d/default_gravity") as float
var is_first_tick:=false
var is_comboo_requested := false
var pending_damage:Damage
var interacting_with:Array[Interactable]
var fall_from_y:float


#func _physics_process(delta:float) -> void:
	#var movement := Input.get_axis("move_left","move_right")
#
	##velocity.x = movement * RUN_SPEED
	#var acceleration = FLOOR_ACCELERATION if is_on_floor() else AIR_ACCELERATION
	#velocity.x = move_toward(velocity.x,movement* RUN_SPEED, acceleration*delta)
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
		#if is_zero_approx(movement) and is_zero_approx(velocity.x): # x分量几乎为0
			#animation_player.play("idle")
		#else:
			#animation_player.play("running")
	#elif velocity.y < 0:
		#animation_player.play("jump")
	#else:
		#animation_player.play("fall")
		#
		#
	#if not is_zero_approx(movement):
		#sprite_2d.flip_h= movement <0
	#
	#var was_on_floor := is_on_floor()
	#move_and_slide()
	#
	#if is_on_floor() != was_on_floor:
		#if was_on_floor:
			#coyote_timer.start()
		#else:
			#coyote_timer.stop()


func tick_physics(state:ACTState,delta:float)->void:
	interaction_icon.visible = not interacting_with.is_empty()
	
	if invincible_timer.time_left >0:
		graphics.modulate.a = sin(Time.get_ticks_msec() /20 ) *0.5 +0.5
	else:
		graphics.modulate.a = 1
	
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
			stand(0.0,delta)
		
		ACTState.WALLSLIDING:
			move(default_gravity / 3 ,delta)
			direction = Direction.LEFT if get_wall_normal().x<0 else Direction.RIGHT
		
		ACTState.WALLJUMP:
			if state_macine.state_time <0.1:
				stand(0.0 if is_first_tick else default_gravity,delta)
				direction = Direction.LEFT if get_wall_normal().x<0 else Direction.RIGHT
			else:
				move(default_gravity,delta)
		
		ACTState.ATTACK1,ACTState.ATTACK2,ACTState.ATTACK3:
			stand(default_gravity,delta)
		
		ACTState.HURT,ACTState.DYING:
			stand(default_gravity,delta)
			
		ACTState.SLIDING_END:
			stand(default_gravity,delta)
		
		ACTState.SLIDING_START,ACTState.SLIDING_LOOP:
			slide(delta)
	
	is_first_tick= false

func move(gravity:float,delta:float)->void:
	var movement := Input.get_axis("move_left","move_right")
	var acceleration = FLOOR_ACCELERATION if is_on_floor() else AIR_ACCELERATION
	velocity.x = move_toward(velocity.x,movement* RUN_SPEED, acceleration*delta)
	velocity.y += gravity*delta
	if not is_zero_approx(movement):
		direction = Direction.LEFT if movement <0 else Direction.RIGHT
	move_and_slide()
	
func slide(delta:float)->void:
	velocity.x = graphics.scale.x * SLIDING_SPEED
	velocity.y = graphics.scale.y * delta
	move_and_slide()

func stand(gravity:float,delta:float)->void:
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
			
	if event.is_action_pressed("attack") and can_comboo:
		is_comboo_requested=true
	
	if event.is_action_pressed("interact") and not interacting_with.is_empty():
		interacting_with.back().interact()
	
	if event.is_action_pressed("slide"):
		slide_request_timer.start()
		
		

func register_interactable(v :Interactable) ->void:
	if state_macine.current_state == ACTState.DYING:
		return
	
	if v in interacting_with:
		return
	interacting_with.append(v)

func unregister_interactable(v :Interactable) ->void:
	if not v in interacting_with:
		return
	interacting_with.erase(v)
	
	
func get_next_state(state:ACTState)-> int:
	if stats.health ==0:
		return  StateMacine.KEEP_CURRENT if state==ACTState.DYING else ACTState.DYING
	if pending_damage:
		#print("有待处理的伤害")
		return ACTState.HURT
	
	
	var can_jump := is_on_floor() or coyote_timer.time_left>0 # coyote_timer实现在空中连跳
	var should_jump := can_jump and  jump_request_timer.time_left>0
	if should_jump:
		return ACTState.JUMP
	
	if state in GROUND_STATES and not is_on_floor():
		return ACTState.FALL
		
	var movement := Input.get_axis("move_left","move_right")
	var is_stand_idle := is_zero_approx(movement) and is_zero_approx(velocity.x) 
	
	match state:
		ACTState.IDLE:
			if Input.is_action_just_pressed("attack"):
				return ACTState.ATTACK1
			
			if should_slide():
				return ACTState.SLIDING_START
			
			if not is_stand_idle:
				return ACTState.RUNNING
		
		ACTState.RUNNING:
			if Input.is_action_just_pressed("attack"):
				return ACTState.ATTACK1
					
			if should_slide():
				return ACTState.SLIDING_START
				
			if is_stand_idle:
				return ACTState.IDLE
		
		ACTState.JUMP:
			if velocity.y >=0:
				return ACTState.FALL
		
		ACTState.FALL:
			if is_on_floor():
				var height := global_position.y - fall_from_y
				return ACTState.LANDING if height >= LANDING_HEIGHT else ACTState.IDLE
			if can_wall_slide():
				return ACTState.WALLSLIDING
		
		ACTState.LANDING:	
			#if not is_stand_idle:
				#return ACTState.RUNNING
			if not animation_player.is_playing():
				return ACTState.IDLE
		
		ACTState.WALLSLIDING:
			if jump_request_timer.time_left >0:
				return ACTState.WALLJUMP
			if is_on_floor():
				return ACTState.IDLE
			if not is_on_wall():
				return ACTState.FALL
		
		ACTState.WALLJUMP:
			if can_wall_slide() and not is_first_tick:
				return ACTState.WALLSLIDING
			if velocity.y >=0:
				return ACTState.FALL
		
		ACTState.ATTACK1:
			if not animation_player.is_playing():
				return ACTState.ATTACK2 if is_comboo_requested else ACTState.IDLE
		
		ACTState.ATTACK2:
			if not animation_player.is_playing():
				return ACTState.ATTACK3 if is_comboo_requested else ACTState.IDLE

		ACTState.ATTACK3:
			if not animation_player.is_playing():
				return ACTState.IDLE
		
		ACTState.HURT:
			if not animation_player.is_playing():
				return ACTState.IDLE
		
		ACTState.SLIDING_START:
			if not animation_player.is_playing():
				return ACTState.SLIDING_LOOP
		
		ACTState.SLIDING_END:
			if not animation_player.is_playing():
				return ACTState.IDLE
				
		ACTState.SLIDING_LOOP:
			if state_macine.state_time > SLIDING_DURATION:
				return ACTState.SLIDING_END
	
	return StateMacine.KEEP_CURRENT
	
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
			fall_from_y = global_position.y
			animation_player.play("fall")
			if from in GROUND_STATES:
				coyote_timer.start()
		
		ACTState.LANDING:
			animation_player.play("landing")
		
		ACTState.WALLSLIDING:
			animation_player.play("wall_sliding")
		
		ACTState.WALLJUMP:
			animation_player.play("jump")
			velocity= WALL_JUMP_VELOCITY
			velocity.x *= get_wall_normal().x # get_wall_normal().x为墙的法线向量
			jump_request_timer.stop()
			
		ACTState.ATTACK1:
			animation_player.play("attack1")
			is_comboo_requested=false
		
		ACTState.ATTACK2:
			animation_player.play("attack2")
			is_comboo_requested=false

		ACTState.ATTACK3:
			animation_player.play("attack3")
			is_comboo_requested=false
			
		ACTState.HURT:
			animation_player.play("hurt")
			stats.health -= pending_damage.amount
			var dir:= pending_damage.source.global_position.direction_to(global_position)
			velocity = dir * KNOCKBACK_AMOUT
			
			pending_damage =null
			invincible_timer.start()
			
		ACTState.DYING:
			animation_player.play("die")
			invincible_timer.stop()
			interacting_with.clear()
		
		ACTState.SLIDING_START:
			animation_player.play("slide_start")
			slide_request_timer.stop()
			stats.energy -= SLIDING_ENERGY
			print("滑铲开始",stats.energy )
			
		ACTState.SLIDING_LOOP:
			animation_player.play("slide_loop")
			
		ACTState.SLIDING_END:
			animation_player.play("slide_end")
	
	# 时间膨胀效果
	#if to == ACTState.WALLJUMP:
		#Engine.time_scale= 0.3
	#else:
		#Engine.time_scale=1.0
		
	is_first_tick= true


func can_wall_slide()->bool:
	return is_on_wall() and hand_checker.is_colliding() and foot_checker.is_colliding()

func should_slide()->bool:
	if slide_request_timer.is_stopped():
		return false
	if stats.energy < SLIDING_ENERGY:
		return false
	return not foot_checker.is_colliding()

func _on_hurt_box_hurt(hitbox: Variant) -> void:
	#print(invincible_timer.time_left)
	if invincible_timer.time_left>0:
		return
	
	pending_damage = Damage.new()
	pending_damage.amount = 1
	pending_damage.source = hitbox.owner
	
	
func die()->void:
	get_tree().reload_current_scene()
