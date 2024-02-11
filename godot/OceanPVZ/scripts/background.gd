extends Node2D

@onready var current_sun = $CardBoard/CurrentSun

var cplant

func _ready():
	current_sun.text = str(GameState.sun_manager.SunCount)
	GameState.sun_manager.connect("changed",set_current_sun)
	PlantCardItem.connect("create_new_plant",create_new_plant.bind(type))
	
func _process(delta):
	pass

func set_current_sun():
	current_sun.text = str(GameState.sun_manager.SunCount)
	

func create_new_plant(type:GameState.PlantType):
	var plant_source = GameState.plant_manager.get_plant_item(type)
	var temp = load(plant_source)
	cplant = temp.instantiate()
	cplant.modulate.a=0.5
	add_child(cplant)
	
func _input(event):
	if event is InputEventMouseMotion and cplant != null:
		print("Mouse Motion at: ", event.position)
		print(get_viewport().get_mouse_position())
		cplant.set_position(event.position)
