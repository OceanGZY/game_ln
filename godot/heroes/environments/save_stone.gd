extends Interactable

@onready var animation_player: AnimationPlayer = $AnimationPlayer

func interact() ->void:
	super.interact()
	
	animation_player.play("activated")
	Game.save_game()
	print("保存游戏成功")
