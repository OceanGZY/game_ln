extends Area2D

@onready var bullet_born_point = $Marker2D/Pistol/BulletBornPoint
@onready var timer = $Timer
@onready var audio_stream_player_2d = $AudioStreamPlayer2D

func _physics_process(delta):
	var enemied_in_range = get_overlapping_bodies()
	if enemied_in_range.size()>0:
		var target_enemy = enemied_in_range.front()
		look_at(target_enemy.global_position)

func shoot():
	const BULLET = preload("res://game/bullet.tscn") # 游戏一开始就预先加载
	audio_stream_player_2d.play()
	#load() # 使用的时候才加载，按需加载
	var new_bullet = BULLET.instantiate()
	new_bullet.position = bullet_born_point.position
	bullet_born_point.add_child(new_bullet)


func _on_timer_timeout():
	shoot()
