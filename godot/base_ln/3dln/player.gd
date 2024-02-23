extends CharacterBody3D

@export var speed :=4
@export var fall_acceleration :=75
@export var jump_impulse:=20

@export var bounce_impulse:=16



var tagrt_velocity :=Vector3.ZERO


func _physics_process(delta: float) -> void:
	
	var direction:=Vector3.ZERO
	
	if Input.is_action_pressed("move_left"):
		direction.x-=1
	if Input.is_action_pressed("move_right"):
		direction.x+=1
	if Input.is_action_pressed("move_forward"):
		direction.z-=1
	if Input.is_action_pressed("move_back"):
		direction.z+=1
		
	#朝向
	if direction != Vector3.ZERO:
		direction = direction.normalized()
		$Pivot.look_at(position + direction)
		
	# 速度
	tagrt_velocity.x = direction.x * speed
	tagrt_velocity.z = direction.z * speed
	
	if not is_on_floor():
		tagrt_velocity.y = tagrt_velocity.y -(fall_acceleration * delta)
	
	
	# 跳跃
	if is_on_floor() and Input.is_action_just_pressed("jump"):
		tagrt_velocity.y = jump_impulse
		
	
	# 碰到小怪
	for index in range(get_slide_collision_count()):
		var collision = get_slide_collision(index)
		
		if collision.get_collider() ==null:
			continue
		
		if collision.get_collider().is_in_group("enemies"):
			var temp = collision.get_collider()
			if Vector3.UP.dot(collision.get_normal()) >0.1: #点积
				temp.squash()
				tagrt_velocity.y = bounce_impulse
				break
	
	# 移动
	velocity = tagrt_velocity
	move_and_slide()
