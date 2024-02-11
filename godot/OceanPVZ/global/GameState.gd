extends Node

enum CardState{COOLING,WAITSUN,READY}

enum PlantType{Sunflower,Peashooter}


class SunManager:
	signal changed
	
	var SunCount:int=100
	
	func add_sun():
		SunCount +=50
		emit_signal("changed")
		
	func use_sun(count):
		SunCount-=count
		emit_signal("changed")

class PlantManager:
	signal changed
	signal created(type:PlantType)
	
	var all_plants:Dictionary={
		PlantType.Sunflower:"res://plants/plant_sunflower.tscn",
		PlantType.Peashooter:"res://plants/plant_peashooter.tscn",
	}
		
	func get_plant_item(type:PlantType):
		return all_plants[type]
		
	func create_plant(type:PlantType):
		#print("发送创建了植物的信号",type)
		emit_signal("created",type)
	


class HandManager:
	signal create_new
	
	var had_plant:bool
	
	func add_plant(type:PlantType):
		emit_signal("create_new",type)
	
	func set_has_plant(ishas:bool):
		had_plant =ishas

var sun_manager:SunManager = SunManager.new()
var plant_manager:PlantManager=PlantManager.new()
var hand_manager:HandManager = HandManager.new()


