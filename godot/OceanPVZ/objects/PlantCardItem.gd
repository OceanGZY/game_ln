@tool
extends Node2D
class_name PlantCardItem


@export var plant:PlantResource:
	set=set_plant
	
var card:Area2D
var sprite:Sprite2D
var mask:Sprite2D
var coldtime:int

func _ready():
	if Engine.is_editor_hint():
		print(Engine.is_editor_hint())
		return
	connect("coldtimeout",wait_mask)
	check_ready()
	coldtime = plant.plant_cold_time

func _input(event):
	if not event.is_action_pressed("interact"):
		return
	print("被点击了")
	wait_mask(coldtime)

func _process(delta):
	if coldtime>0:
		coldtime-=delta
	check_ready()

func set_plant(v):
	plant =v
	# 判断子节点是否重复添加
	for node in get_children():
		if node.owner ==null:
			node.queue_free()
			
	card = Area2D.new()
	sprite = Sprite2D.new()
	sprite.texture = plant.card_canot_choose_texture
	card.add_child(sprite)

	var rect := RectangleShape2D.new()
	rect.extents = plant.card_canot_choose_texture.get_size()/2
	
	var collider:= CollisionShape2D.new()
	collider.shape = rect
	card.add_child(collider)
	
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
	if GameState.SunCout >= plant.plant_sun:
		sprite.texture = plant.card_can_choose_texture
