extends Enemy


func _ready() -> void:
	super()
	life = 10
	damage= 1

#func _on_hurt_box_hurt(hit_source: HitBox) -> void:
	#print("被layer打了： ",hit_source)
