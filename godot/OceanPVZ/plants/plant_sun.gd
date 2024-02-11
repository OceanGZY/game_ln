extends Control

func _on_gui_input(event):
	#print("_on_gui_input",event)
	if event.is_action_pressed("interact"):
		var tween = create_tween()
		tween.set_ease(Tween.EASE_OUT).set_trans(Tween.TRANS_BACK)
		tween.tween_property(self,"scale",Vector2.ONE*1.2, 0.2).from(Vector2.ONE)
		tween.tween_property(self,"scale",Vector2.ONE, 0.3).from(Vector2.ONE*1.2)
		tween.tween_callback(queue_free)
		GameState.sun_manager.add_sun()
		
