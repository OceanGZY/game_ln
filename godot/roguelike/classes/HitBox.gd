extends Area2D

class_name HitBox

signal hit(other:HurtBox)

@export var damage:float =1.0
@export var knock_back_force:int =300

var knock_back_direction:Vector2 =Vector2.ZERO


func _init() -> void:
	#print("在初始化了")
	area_entered.connect(_on_area_entered)

func _on_area_entered(other:HurtBox):
	#print("[Hit] %s => %s" % [owner.name,other.owner.name])
	hit.emit(other)
	other.hurt.emit(self)
