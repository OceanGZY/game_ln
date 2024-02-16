extends Enemy

enum ACTState{
	IDLE,
	WALK,
	RUN,
	HURT,
	DYING,
}

const KNOCKBACK_AMOUT :=200.0

var pending_damage:Damage

@onready var wall_checker: RayCast2D = $Graphics/WallChecker
@onready var floor_checker: RayCast2D = $Graphics/FloorChecker
@onready var player_checker: RayCast2D = $Graphics/PlayerChecker
@onready var calmdown_timer: Timer = $CalmdownTimer


func tick_physics(state:ACTState,delta:float)->void:
	match state:
		ACTState.IDLE,ACTState.HURT,ACTState.DYING:
			move(0.0,delta)
		ACTState.WALK:
			move(max_speed/3, delta)
		ACTState.RUN:
			if wall_checker.is_colliding()  or not floor_checker.is_colliding():
				direction *= -1
			move(max_speed,delta)
			
			#print("player_checker.is_colliding()",player_checker.is_colliding())
			if player_checker.is_colliding():
				calmdown_timer.start()



func get_next_state(state:ACTState)->int:
	if stats.health ==0:
		return  StateMacine.KEEP_CURRENT if state==ACTState.DYING else ACTState.DYING
	if pending_damage:
		#print("有待处理的伤害")
		return ACTState.HURT
		
	match state:
		ACTState.IDLE:
			if player_checker.is_colliding():
				return ACTState.RUN
			if state_macine.state_time>2:
				return ACTState.WALK
		
		ACTState.WALK:
			if player_checker.is_colliding():
				return ACTState.RUN
			if wall_checker.is_colliding() or not floor_checker.is_colliding():
				return ACTState.IDLE
		
		ACTState.RUN:
			if  not player_checker.is_colliding() and calmdown_timer.time_left<0.05:
				return ACTState.WALK
		
		ACTState.HURT:
			if not animation_player.is_playing():
				return ACTState.RUN
		
		
	return StateMacine.KEEP_CURRENT
	
	

func transition_state(from:ACTState,to:ACTState) -> void:
	#print("[%s] %s => %s" %[
		#Engine.get_physics_frames(),
		#ACTState.keys()[from] if from !=-1 else "<START>",
		#ACTState.keys()[to]		
	#])
	
	match to:
		ACTState.IDLE:
			animation_player.play("idle")
			if wall_checker.is_colliding():
				direction*=-1
		
		ACTState.WALK:
			animation_player.play("walk")
			if not floor_checker.is_colliding():
				direction*=-1
				floor_checker.force_raycast_update()
		
		ACTState.RUN:
			animation_player.play("run")
			
		ACTState.HURT:
			animation_player.play("hit")
			stats.health -= pending_damage.amount
			#print(stats.health)
			
			var dir:= pending_damage.source.global_position.direction_to(global_position)
			velocity = dir * KNOCKBACK_AMOUT
			
			if dir.x>0:
				direction = Direction.LEFT
			else:
				direction = Direction.RIGHT
			pending_damage =null
			
		ACTState.DYING:
			animation_player.play("die")


func _on_hurt_box_hurt(hitbox: Variant) -> void:
	pending_damage = Damage.new()
	pending_damage.amount = 1
	pending_damage.source = hitbox.owner
