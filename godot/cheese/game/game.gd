extends Node2D

@onready var path_follow_2d = $Player/Path2D/PathFollow2D
@onready var game_over = $GameOver
@onready var timer = $Timer
@onready var player = $Player
@onready var audio_stream_player_2d = $AudioStreamPlayer2D


func _ready():
	game_over.hide()
	for i in range(5):
		spawn_mob()
	audio_stream_player_2d.play()

func spawn_mob():
	const MOB = preload("res://game/mob.tscn")
	var mob = MOB.instantiate()
	path_follow_2d.progress_ratio=randf()
	mob.global_position= path_follow_2d.global_position
	add_child(mob)

func _on_timer_timeout():
	spawn_mob()


func _on_player_player_die():
	#print("收到玩家die的信号")
	timer.stop()
	audio_stream_player_2d.stop()
	game_over.show()
	#get_tree().paused =true  # 游戏暂停


func _on_restart_btm_pressed():
	#print("按钮点击了")
	#get_tree().paused =false
	get_tree().reload_current_scene()
