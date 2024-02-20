extends Control

@onready var new_game: Button = $ControllBtns/NewGame
@onready var about_game: Button = $ControllBtns/AboutGame
@onready var exit_game: Button = $ControllBtns/ExitGame
@onready var controll_btns: VBoxContainer = $ControllBtns


func _ready() -> void:
	new_game.grab_focus()
	
	for node:Button in controll_btns.get_children():
		node.mouse_entered.connect(node.grab_focus)



func _on_new_game_pressed() -> void:
	Game.change_scene("res://world.tscn")



func _on_about_game_pressed() -> void:
	pass # Replace with function body.


func _on_exit_game_pressed() -> void:
	get_tree().quit()
