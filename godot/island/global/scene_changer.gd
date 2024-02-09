extends CanvasLayer

signal game_entered
signal game_exited

@onready var color_rect = $ColorRect

func _ready():
	_on_scene_changed(null,get_tree().current_scene) # 需要在自动加载里 把music manager放在 scene changer前面

func change_scene(path):
	var tween = get_tree().create_tween()
	tween.tween_callback(color_rect.show)
	tween.tween_property(color_rect,"color:a",1.0,0.2)
	tween.tween_callback(_change_scene.bind(path))
	tween.tween_property(color_rect,"color:a",0,0.3)
	tween.tween_callback(color_rect.hide)

func _change_scene(path):
	# 自定义的场景切换
	var old_scene = get_tree().current_scene
	var new_scene = load(path).instantiate() 
	
	var root = get_tree().root
	root.remove_child(old_scene)
	root.add_child(new_scene)
	get_tree().current_scene= new_scene
	_on_scene_changed(old_scene,new_scene)
	old_scene.queue_free()

func _on_scene_changed(old_scene,new_scene):
	var was_in_game = old_scene  is Scene
	var is_in_game = new_scene  is Scene
	
	if was_in_game != is_in_game:
		if is_in_game:
			emit_signal("game_entered")
		else:
			emit_signal("game_exited")
	
	var music = "res://assets/Music/PaperWings.mp3"
	if is_in_game and new_scene.music_override_file:
		music = new_scene.music_override_file
	
	SoundManager.play_music(music)
	

