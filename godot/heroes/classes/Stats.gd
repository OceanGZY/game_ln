extends Node
class_name Stats

@export var max_health:=3

@onready var health:= max_health:
	set(v):
		v = clampi(v,0,max_health)
		if health ==v:
			return
		health =v
