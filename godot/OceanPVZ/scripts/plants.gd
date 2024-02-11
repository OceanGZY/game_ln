extends Node2D
class_name Plant

enum PlantState{Enable,Disable}

var state:PlantState

var plant_type:GameState.PlantType=GameState.PlantType.Sunflower

func _process(delta):
	match state:
		PlantState.Enable:
			enable_update()
		PlantState.Disable:
			disable_update()


func enable_update():
	pass
	

func disable_update():
	pass
