extends CanvasLayer

@onready var color_rect = $ColorRect



func change_scene(path:String):
	var tween:Tween = create_tween()
	
