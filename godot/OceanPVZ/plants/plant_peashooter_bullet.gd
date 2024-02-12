extends RigidBody2D


func _on_visible_on_screen_notifier_2d_screen_exited():
	print("子弹进入屏幕外边了")
	queue_free()


func _on_body_entered(body):
	print("碰到了一个物体")
	var sprite= get_node("Sprite2D")
	sprite.texture = load("res://assets/Images/Effect/PeaBulletHit.png")

