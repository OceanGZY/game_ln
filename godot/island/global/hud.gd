extends CanvasLayer


func _ready():
	SceneChanger.connect("game_entered",show)
	SceneChanger.connect("game_exited",hide)
	visible= get_tree().current_scene is Scene

func _on_menu_pressed():
	GameState.back_to_title()
