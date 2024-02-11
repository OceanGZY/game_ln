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
	
	var all_plants:Dictionary={
		PlantType.Sunflower:"res://plants/plant_sunflower.tscn",
		PlantType.Peashooter:"res://plants/plant_peashooter.tscn",
	}
	
	func add_plant_item(type:PlantType):
		pass
		
	func get_plant_item(type:PlantType):
		return all_plants[type]
	


class HandManager:
	signal changed
	
	func add_plant(type:PlantType):
		pass


var sun_manager:SunManager = SunManager.new()
var plant_manager:PlantManager=PlantManager.new()
var hand_manager:HandManager = HandManager.new()


