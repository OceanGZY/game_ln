@tool  #标记为工具脚本
extends Area2D
class_name Interactable

signal interact

@export var CustomTexture:Texture:
	set=set_texture,
	get=get_texture
@export var allow_item =false



func _input_event(viewport, event, shape_idx):
	if not event.is_action_pressed("interact"):
		return
	if not allow_item and GameState.inventory.active_item:
		return
	_interact()
	

func _interact():
	emit_signal("interact") # 向外部发送信号，通知interact

func set_texture(v:Texture):
	CustomTexture =v
	
	# 判断子节点是否重复添加
	for node in get_children():
		if node.owner ==null:
			node.queue_free()
		
	
	if CustomTexture ==null:
		return
		
	var sprite := Sprite2D.new()
	sprite.texture = CustomTexture
	add_child(sprite)
	
	var rect := RectangleShape2D.new()
	rect.extents = v.get_size()/2
	
	var collider:= CollisionShape2D.new()
	collider.shape = rect
	add_child(collider)
	
func get_texture():
	return CustomTexture
	
	
	
	
