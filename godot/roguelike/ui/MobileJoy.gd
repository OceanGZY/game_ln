extends Control
@onready var out_joy: MeshInstance2D = $OutJoy
@onready var in_joy: MeshInstance2D = $OutJoy/InJoy

var is_press:bool = false
var max_len:int=20
var direction:Vector2 =Vector2.ZERO

func _input(event: InputEvent) -> void:

	if !is_press and event is InputEventScreenTouch and event.is_pressed():
		is_press=true
		out_joy.position = event.position
		
	if is_press:
		if event is	InputEventScreenDrag or (event.is_pressed() and event is InputEventScreenTouch):
			in_joy.global_position = get_global_mouse_position()
			if in_joy.position.length() > max_len:
				direction = in_joy.position.normalized() 
				in_joy.position= direction * max_len
			
		if !event.is_pressed() and event is InputEventScreenTouch:
			direction = Vector2.ZERO
			var tween = create_tween()
			tween.tween_property(in_joy,"position",Vector2.ZERO,0.2)
			tween.tween_interval(2)
			await tween.finished
			is_press =false
			
func _process(delta: float) -> void:
	out_joy.visible = is_press
	in_joy.visible = is_press
