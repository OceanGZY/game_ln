extends Enemy


func _ready() -> void:
	super()
	character_state.max_health = 10
	print("哥布林的僧生命值",character_state.health)
