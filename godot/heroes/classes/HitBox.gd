extends Area2D
class_name HitBox

signal hit(hurtbox)

func _init() -> void:
	#print("init了")
	area_entered.connect(_on_area_entered)
	#print("绑定成功")

func _on_area_entered(hurtbox:HurtBox)->void:
	
	#print("[Hit] %s => %s" % [owner.name,hurtbox.owner.name])
	hit.emit(hurtbox)
	hurtbox.hurt.emit(self)
	
