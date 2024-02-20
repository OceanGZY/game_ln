extends Enemy

func _ready() -> void:
	super()
	character_state.max_health = 5
	print("史莱姆的僧生命值",character_state.helath)

