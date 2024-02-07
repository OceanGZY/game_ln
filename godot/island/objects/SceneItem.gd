@tool
extends Interactable
class_name SceneItem

@export var item:Item:
	set=set_item

func set_item(v):
	item=v
	set_texture(item.SceneTextue if item else null)


func _interact():
	super._interact()
	# 设置图片替身 给替身做动画，用于表示拾取
	var sprite := Sprite2D.new()
	sprite.texture = item.SceneTextue
	get_parent().add_child(sprite)
	sprite.global_position = global_position 
	
	var tween = sprite.create_tween()
	tween.set_ease(Tween.EASE_IN).set_trans(Tween.TRANS_BACK) # 在动画的开头有一个反方向的动画
	tween.tween_property(sprite,"scale",Vector2.ZERO,0.15)
	tween.tween_callback(sprite.queue_free)
	queue_free()

