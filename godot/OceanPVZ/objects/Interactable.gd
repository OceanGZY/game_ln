@tool
extends Area2D
class_name Interactable
signal interact

@export var base_texture:Texture2D:
	set=set_base_texture

func _ready():
	if Engine.is_editor_hint():
		print(Engine.is_editor_hint())
		return

func _input_event(viewport, event, shape_idx):
	if not event.is_action_pressed("interact"):
		return
	_interact()
	
func _interact():
	emit_signal("interact")


func set_base_texture(v):
	base_texture =v
	# 判断子节点是否重复添加
	for node in get_children():
		if node.owner ==null:
			node.queue_free()
	
	var sprite = Sprite2D.new()
	sprite.texture = base_texture
	add_child(sprite)

	var rect := RectangleShape2D.new()
	rect.extents = base_texture.get_size()/2
	
	var collider:= CollisionShape2D.new()
	collider.shape = rect
	add_child(collider)
