extends CharacterBody3D
signal squashed

@export var min_speed:=10
@export var max_speed:=18


func _physics_process(delta: float) -> void:
	move_and_slide()

func _on_visible_on_screen_notifier_3d_screen_exited() -> void:
	queue_free() # 离开屏幕区域以后 销毁对象


func initialize(start_pos:Vector3,player_pos:Vector3)->void:
	look_at_from_position(start_pos,player_pos,Vector3.UP)
	rotate_y(randf_range(-PI / 4, PI / 4))
	
	# 随机速度
	var random_speed = randi_range(min_speed,max_speed)
	velocity = Vector3.FORWARD * random_speed
	velocity = velocity.rotated(Vector3.UP,rotation.y)

func squash():
	squashed.emit()
	queue_free()