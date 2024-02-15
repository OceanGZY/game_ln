extends Enemy

enum ACTState{
	IDLE,
	WALK,
	RUN,
}

@onready var wall_checker: RayCast2D = $Graphics/WallChecker
@onready var floor_checker: RayCast2D = $Graphics/FloorChecker
@onready var player_checker: RayCast2D = $Graphics/PlayerChecker
@onready var calmdown_timer: Timer = $CalmdownTimer


func tick_physics(state:ACTState,delta:float)->void:
	match state:
		ACTState.IDLE:
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



func get_next_state(state:ACTState)->ACTState:
	if player_checker.is_colliding():
		return ACTState.RUN
		
	match state:
		ACTState.IDLE:
			if state_macine.state_time>2:
				return ACTState.WALK
		
		ACTState.WALK:
			if wall_checker.is_colliding() or not floor_checker.is_colliding():
				return ACTState.IDLE
		
		ACTState.RUN:
			#print(calmdown_timer.time_left)
			if calmdown_timer.time_left<0.05:
				return ACTState.WALK
		
	return state
	
	

func transition_state(from:ACTState,to:ACTState) -> void:
	print("[%s] %s => %s" %[
		Engine.get_physics_frames(),
		ACTState.keys()[from] if from !=-1 else "<START>",
		ACTState.keys()[to]		
	])
	
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
	


func _on_hurt_box_hurt(hitbox: Variant) -> void:
	print("Ouch!")
	stats.health -=1
	if stats.health ==0:
		queue_free()
