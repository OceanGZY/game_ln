@tool
extends Control
 
var has_plant:bool=false:
	set=set_has_plant,
	get=get_has_plant
	
func set_has_plant(v):
	has_plant=v
func get_has_plant():
	return has_plant
