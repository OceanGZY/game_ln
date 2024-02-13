extends RigidBody2D

var attack:int

func _on_visible_on_screen_notifier_2d_screen_exited():
	print("子弹进入屏幕外边了")
	queue_free()





func _on_body_entered(body):
	print("打中什么东西了")
	var sprite = get_node("Sprite2D")
	#sprite.texture= load("res://assets/Images/Effect/PeaBulletHit.png")
	var tween = create_tween()
	tween.set_ease(Tween.EASE_OUT).set_trans(Tween.TRANS_EXPO)
	tween.tween_property(sprite,"texture",load("res://assets/Images/Effect/PeaBulletHit.png"),0.1)
	tween.tween_callback(queue_free)
	if body.name=="Zombie":
		body.life -= attack

