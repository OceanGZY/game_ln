extends Control

@onready var new_game: Button = $V/NewGame
@onready var v: VBoxContainer = $V
@onready var load_game: Button = $V/LoadGame

func _ready() -> void:
	load_game.disabled = not Game.has_save()
	
	new_game.grab_focus()
	
	for node:Button in v.get_children():
		node.mouse_entered.connect(node.grab_focus)


func _on_new_game_pressed() -> void:
	Game.new_game()


func _on_load_game_pressed() -> void:
	Game.load_game()


func _on_exit_game_pressed() -> void:
	get_tree().quit()
