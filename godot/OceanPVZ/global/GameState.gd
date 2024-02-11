extends Node

enum CardState{COOLING,WAITSUN,READY}

class SunManager:
	signal changed
	
	var SunCount:int=100
	
	func add_sun():
		SunCount +=50
		emit_signal("changed")
		
	func use_sun(count):
		SunCount-=count
		emit_signal("changed")

var sun_manager:SunManager = SunManager.new()
