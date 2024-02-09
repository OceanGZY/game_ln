extends "res://scripts/scene.gd"

@onready var board = $Board
@onready var gear = $Reset/Gear

func _on_reset_interact():
	var tween= create_tween()
	tween.set_ease(Tween.EASE_IN_OUT).set_trans(Tween.TRANS_SINE)
	tween.tween_property(gear,"rotation_degrees",360.0,0.2).as_relative() # 相对动画
	tween.tween_callback(board.reset)
