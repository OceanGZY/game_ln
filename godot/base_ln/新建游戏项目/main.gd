extends Node

@export var mob_scene:PackedScene

var score

# Called when the node enters the scene tree for the first time.
func _ready():
	#pass # Replace with function body.
	pass


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass


func game_over():
	#pass # Replace with function body.
	$Music.stop()
	$DeathSound.play()
	$ScoreTimer.stop()
	$MobTimer.stop()
	$HUD.show_game_over()
	
	
func new_game():
	$Music.play()
	score =0
	$HUD.update_score(score)
	$HUD.show_message("Get Ready")
	$Player.start($StartPosition.position)
	$StartTimer.start()
	get_tree().call_group("mobs","queue_free") # 函数调用组中每个节点上的删除函数——让每个怪物删除其自身。


func _on_mob_timer_timeout():
	var mob = mob_scene.instantiate() #实例化
	
	# 在Path2D上选择一个随机点
	var mob_spawn_location = get_node("MobPath/MobSpawnLocation")
	mob_spawn_location.progress_ratio = randf()
	
	# 设置敌人的方向， 垂直于mob_spawn_location的路径方向
	var direction = mob_spawn_location.rotation + PI / 2
	
	# 设置敌人的位置
	mob.position = mob_spawn_location.position
	
	direction += randf_range(-PI/4,PI/4)
	mob.rotation = direction
	
	# 设置敌人的初始速度
	var velocity = Vector2(randf_range(150.0,200.0),0.0)
	mob.linear_velocity = velocity.rotated(direction)
	
	add_child(mob)
	


func _on_score_timer_timeout():
	score +=1
	$HUD.update_score(score)


func _on_start_timer_timeout():
	$MobTimer.start()
	$ScoreTimer.start()
