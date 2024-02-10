@tool
extends Interactable
class_name PlantCard

@export var plant:PlantResource:
	set=set_card_init

enum CardStae{COOLING,WAITSUN,READY}

var state:CardStae

func _ready():
	state = CardStae.WAITSUN

func _process(delta):
	match state:
		CardStae.COOLING:
			set_cooling_update()
		CardStae.WAITSUN:
			set_waitsun_update()
		CardStae.READY:
			set_reay_update()

func _interact():
	super._interact()
	print(plant.plant_name)
	

func set_card_init(v:PlantResource):
	plant =v
	set_base_texture(plant.card_canot_choose_testure)
	
func set_cooling_update():
	pass

func set_waitsun_update():
	set_base_texture(plant.card_canot_choose_testure)

func set_reay_update():
		set_base_texture(plant.card_can_choose_testure)
