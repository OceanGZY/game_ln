extends Area2D
class_name Interactable

signal interacted

func _init() -> void:
	collision_layer = 0
	collision_mask = 0
	set_collision_mask_value(2,true) # 打开对2层的扫描
	
	body_entered.connect(_on_body_entered)
	body_exited.connect(_on_body_exited)

func _on_body_entered(player:Player)->void:
	player.register_interactable(self)
	
func _on_body_exited(player:Player)->void:
	player.unregister_interactable(self)

func interact()->void:
	print("[Interact] %s" % name)
	interacted.emit()
