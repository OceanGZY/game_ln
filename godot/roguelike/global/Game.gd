extends CanvasLayer

@onready var loading_page: ColorRect = $LoadingPage
@onready var global_player_state: State = $GlobalPlayerState



func _ready() -> void:
	loading_page.color.a =0

func change_scene(path:String)->void:
	var tree:= get_tree()
	tree.paused = true # 转场的时候游戏逻辑暂停
	
	var tween:=create_tween()
	tween.set_pause_mode(Tween.TWEEN_PAUSE_PROCESS)
	# 如果该 Tween 绑定了节点，它将在该节点可以处理时进行处理（见 Node.process_mode）。否则与 TWEEN_PAUSE_STOP 相同。
	#● TWEEN_PAUSE_STOP = 1
	#如果 SceneTree 被暂停，则该 Tween 也会暂停。
	#● TWEEN_PAUSE_PROCESS = 2
	#无论 SceneTree 是否被暂停，该 Tween 都会处理。
	tween.tween_property(loading_page,"color:a",1,0.2)
	await  tween.finished
	
	tree.change_scene_to_file(path)
	
	await tree.tree_changed
	
	tree.paused =false
	
	tween = create_tween()
	tween.tween_property(loading_page,"color:a",0,0.2)
