extends Node2D

@onready var path_follow_2d = $Player/Path2D/PathFollow2D
@onready var game_over = $GameOver
@onready var timer = $Timer
@onready var player = $Player
@onready var audio_stream_player_2d = $AudioStreamPlayer2D
@onready var score_label = $CanvasLayer/Score


var score=0

func _ready():
	game_over.hide()
	for i in range(5):
		spawn_mob()
	audio_stream_player_2d.play()
	score_label.text ="分数:%d" %score

func spawn_mob():
	const MOB = preload("res://game/mob.tscn")
	var mob = MOB.instantiate()
	mob.mob_die.connect(_add_score)
	path_follow_2d.progress_ratio=randf()
	mob.global_position= path_follow_2d.global_position
	add_child(mob)

func _on_timer_timeout():
	spawn_mob()


func _on_player_player_die():
	#print("收到玩家die的信号")
	timer.stop()
	audio_stream_player_2d.stop()
	var gun = player.get_node("Gun")
	gun.get_node("Timer").stop()
	
	
	game_over.show()
	#get_tree().paused =true  # 游戏暂停


func _on_restart_btm_pressed():
	#print("按钮点击了")
	#get_tree().paused =false
	get_tree().reload_current_scene()


func _on_audio_stream_player_2d_finished():
	audio_stream_player_2d.play()

func _add_score():
	score +=10
	score_label.text ="分数:%d" %score
