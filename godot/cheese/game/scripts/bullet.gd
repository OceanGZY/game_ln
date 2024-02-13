extends Area2D

var travel_distance=0 # 子弹飞行距离

func _physics_process(delta):
	const SPEED =1000 # 子弹速度
	const RANGE =1200 # 最大射程
	
	var direction = Vector2.RIGHT.rotated(rotation)
	position += direction * SPEED* delta
	travel_distance = SPEED* delta
	if travel_distance>RANGE:
		queue_free()


func _on_body_entered(body):
	queue_free()
	if body.has_method("take_damage"):
		body.take_damage()
