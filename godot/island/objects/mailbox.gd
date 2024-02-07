extends FlagsSwitch


func _on_interactable_interact():
	var item = GameState.inventory.active_item
	if not item or item!= preload("res://items/key.tres"):
		return
	GameState.flags.add(flag)
	GameState.inventory.del_item(item)
		
