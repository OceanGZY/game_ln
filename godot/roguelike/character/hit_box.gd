extends Area2D

class_name HitBox

@export var damage:float =1.0
@export var knock_back_force:int =300

var knock_back_direction:Vector2 =Vector2.ZERO


func _init() -> void:
	body_entered.connect(_on_body_entered)


func _on_body_entered(body: BaseCharacter):
	pass
