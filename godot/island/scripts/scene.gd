extends Sprite2D

class_name Scene

@export_file("*.mp3") var music_override_file;

#@onready var background = $"."


# Called when the node enters the scene tree for the first time.
func _ready():
	var tween = get_tree().create_tween()
	tween.set_ease(Tween.EASE_OUT).set_trans(Tween.TRANS_SINE)
	tween.tween_property(self,"scale",Vector2.ONE,0.3).from(Vector2.ONE*1.03)# 让场景从1.03倍 变为1倍
