extends CanvasLayer

signal start_game
# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass

func show_message(text):
	$Message.text = text
	$Message.show()
	$MessageTimer.start()


func show_game_over():
	show_message("Game Over")
	
	# 等待，等待$MessageTimer.timeout
	await  $MessageTimer.timeout
	
	$Message.text = "Ocean Dodge Game"
	$Message.show()
	
	# 设置一个单次计时器，然后等待它完成结束
	await get_tree().create_timer(1.0).timeout
	$StartBtn.show()

func update_score(score):
	$ScoreLabel.text = str(score)
	




func _on_message_timer_timeout():
	$Message.hide()


func _on_start_btn_pressed():
	$StartBtn.hide()
	start_game.emit()
