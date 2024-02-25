extends Control

@onready var outer_joy: MeshInstance2D = $OuterJoy
@onready var inner_joy: MeshInstance2D = $OuterJoy/innerJoy

var direction:Vector2 = Vector2.ZERO
var is_press:bool= false
var max_len:int=50


func _input(event: InputEvent) -> void:
	if !is_press && event is InputEventScreenTouch and event.is_pressed():
		is_press = true
		outer_joy.position = event.position
	
	if is_press:
		if event is InputEventScreenDrag || (event is InputEventScreenTouch and event.is_pressed()):
			inner_joy.global_position = get_global_mouse_position() 
			if inner_joy.position.length() >max_len:
				direction = inner_joy.position.normalized() 
				inner_joy.position = direction * max_len 
	
		if !event.is_pressed() && event is InputEventScreenTouch:
			direction = Vector2.ZERO
			var tween = create_tween()
			tween.tween_property(inner_joy,"position",Vector2.ZERO,0.2)
			tween.tween_interval(2)
			await  tween.finished
			is_press = false
	
func _process(delta: float) -> void:
	outer_joy.visible = is_press
	inner_joy.visible = is_press
