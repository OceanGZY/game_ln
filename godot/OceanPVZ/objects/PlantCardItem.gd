@tool
extends Node2D
class_name PlantCardItem

signal create_new_plant(type:GameState.PlantType)


@export var plant:PlantResource:
	set=set_plant

var plant_type:GameState.PlantType = GameState.PlantType.Sunflower
var card:Area2D
var sprite:Sprite2D
var mask:Sprite2D
var coldtime:int
var cplant

func _ready():
	if Engine.is_editor_hint():
		return
	check_ready()
	mask.hide()
	GameState.sun_manager.connect("changed",check_ready)
	

func set_plant(v):
	plant =v
	# 判断子节点是否重复添加
	for node in get_children():
		if node.owner ==null:
			node.queue_free()
	
	plant_type = plant.plant_type
	
	card = Area2D.new()
	sprite = Sprite2D.new()
	sprite.texture = plant.card_canot_choose_texture
	card.add_child(sprite)
	
	var rect := RectangleShape2D.new()
	rect.extents = plant.card_canot_choose_texture.get_size()/2
	
	var collider:= CollisionShape2D.new()
	collider.shape = rect
	card.add_child(collider)
	card.input_event.connect(_on_interact_card)
	add_child(card)
	
	mask = Sprite2D.new()
	mask.texture = load("res://assets/Images/Card/card_bk.jpg")
	add_child(mask)
	mask.modulate.a=0.5
	
	
func wait_mask(time):
	var tween =  create_tween()
	tween.set_ease(Tween.EASE_IN).set_trans(Tween.TRANS_LINEAR)
	tween.tween_property(mask,"modulate:a",0,time)
	
func check_ready():
	print(GameState.sun_manager.SunCount)
	if GameState.sun_manager.SunCount >= plant.plant_sun:
		sprite.texture = plant.card_can_choose_texture
	else:
		sprite.texture = plant.card_canot_choose_texture


func _on_interact_card(viewport, event, shape_idx):
	if GameState.sun_manager.SunCount < plant.plant_sun or GameState.hand_manager.had_plant: 
		return
	if event.is_action_pressed("interact"):
		GameState.hand_manager.add_plant(plant_type)
		GameState.sun_manager.use_sun(plant.plant_sun)

	
