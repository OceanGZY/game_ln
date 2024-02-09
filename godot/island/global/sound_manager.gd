extends Node

@onready var bgm_player = $BGMPlayer

func play_music(path):
	if bgm_player.playing and bgm_player.stream.resource_path ==path:
		return
	bgm_player.stream = load(path)
	bgm_player.play()
	
