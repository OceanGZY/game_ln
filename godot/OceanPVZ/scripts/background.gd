extends Node2D

@onready var current_sun = $CardBoard/CurrentSun

func _ready():
	current_sun.text = str(GameState.sun_manager.SunCount)
	GameState.sun_manager.connect("changed",set_current_sun)
	
func _process(delta):
	pass

func set_current_sun():
	current_sun.text = str(GameState.sun_manager.SunCount)
