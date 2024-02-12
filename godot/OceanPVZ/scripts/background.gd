extends Node2D

@export_file("*.tscn") var grass_cell

@onready var current_sun = $CardBoard/CurrentSun
@onready var grid_container = $GrassLand/Grass/GridContainer

var cplant
var cplant_type

func _ready():
	current_sun.text = str(GameState.sun_manager.SunCount)
	create_grass()
	GameState.sun_manager.connect("changed",set_current_sun)
	GameState.hand_manager.connect("create_new",create_new_plant)

func set_current_sun():
	current_sun.text = str(GameState.sun_manager.SunCount)
	
func create_grass():
	for i in range(45):
		var temp = load(grass_cell).instantiate()
		grid_container.add_child(temp)
		#print("temp.has_plant",temp.has_plant)
		temp.gui_input.connect(_on_interact_grass_cell.bind(temp))

func create_new_plant(type:GameState.PlantType):
	cplant_type =type
	var plant_source = GameState.plant_manager.get_plant_item(type)
	var temp = load(plant_source)
	cplant = temp.instantiate()
	cplant.modulate.a=0.5
	add_child(cplant)
	GameState.hand_manager.set_has_plant(true)
	
func _input(event):
	if event is InputEventMouseMotion and cplant != null and GameState.hand_manager.had_plant:
		#print("Mouse Motion at: ", event.position)
		#print(get_viewport().get_mouse_position())
		cplant.set_position(event.position)

func _on_interact_grass_cell(event,cell):
	if cell.has_plant: #如果这个位置已经有植物了，那么就不种植
		return
	if event.is_action_pressed("interact") and cplant != null and GameState.hand_manager.had_plant:
		cplant.modulate.a=1
		cplant.position = cell.global_position+Vector2(40,48)
		cell.has_plant=true
		#GameState.plant_manager.create_plant(cplant_type)
		cplant.timer.start()
		GameState.hand_manager.set_has_plant(false)
		cplant=null
