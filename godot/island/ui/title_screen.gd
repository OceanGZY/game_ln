extends TextureRect

@onready var load_btn = $VBoxContainer/Load

func _ready():
	load_btn.disabled= not GameState.has_save_file()

func _on_new_pressed():
	GameState.new_game()


func _on_load_pressed():
	GameState.load_game()


func _on_quit_pressed():
	get_tree().quit()
