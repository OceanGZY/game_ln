@tool
extends CharacterBody2D
class_name Plants

signal create_sun
signal do_attack

@export var plant:PlantResource:
	set=set_plant

var plant_type:GameState.PlantType
var plant_name:String
var plant_attack:int
var plant_cold_time:int
var plant_life:int
var plant_attack_time:int
#var used_time:float=0.0
#var is_init:bool=false
var timer:Timer

func set_plant(v):
	plant=v
	plant_type=plant.plant_type
	plant_name=plant.plant_name
	plant_attack=plant.plant_attack
	plant_cold_time=plant.plant_cold_time
	plant_life=plant.plant_life
	plant_attack_time = plant.plant_attack_time


func _ready():
	var collider = CollisionShape2D.new()
	var capsule_shape = CapsuleShape2D.new()
	capsule_shape.radius=31
	capsule_shape.height=84
	collider.shape=capsule_shape
	add_child(collider)
	
	timer= Timer.new()
	timer.wait_time = plant_attack_time
	add_child(timer)
	timer.timeout.connect(plant_action)
	#GameState.plant_manager.connect("created",check_enable)
	
#func _process(delta):
	#if is_init:
		#used_time += delta
		#if plant_type == GameState.PlantType.Sunflower:
			#produce_sun()
	
#func check_enable(type):
	##print(" check_enable(type)",type)
	##print("plant_type",plant_type)
	#if type == plant_type:
		#timer.start()


func plant_action():
	#if plant_type == GameState.PlantType.Sunflower:
		#produce_sun()
	print("plant_action")

#func produce_sun():
	#print("生产了一个太阳")
