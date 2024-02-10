@tool
extends Interactable
class_name PlantCard

@export var plant:PlantResource:
	set=set_card_init



func _interact():
	super._interact()
	print(plant.plant_name)
	

func set_card_init(v:PlantResource):
	plant =v
	set_base_texture(plant.card_canot_choose_testure)
