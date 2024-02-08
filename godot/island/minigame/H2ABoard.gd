@tool
extends Node2D

@export var radius:float=100.0:
	set=_update_radius
@export var config:H2AConfig:
	set=_update_config

const SLOT_TEXTURE = preload("res://assets/H2A/CIRCLE.png")
const LINE_TEXTURE = preload("res://assets/H2A/CIRCLELINE.png")

var _stone_map={}


func _draw():
	for slot in H2AConfig.Slot.size():
		#print(slot)
		draw_texture(SLOT_TEXTURE,_get_slot_position(slot)-SLOT_TEXTURE.get_size()/2)


func _get_slot_position(slot:int)->Vector2:
	return Vector2.DOWN.rotated(TAU / H2AConfig.Slot.size() * slot) * radius


func _update_radius(v):
	radius= v
	queue_redraw()

func _update_config(v):
	
	if config and config.is_connected("changed",_update_board):
		config.disconnect("changed",_update_board)
	config= v
	if config and config.is_connected("changed",_update_board):
		config.connect("changed",_update_board)
	_update_board()
	


func _update_board():
	for node in get_children():
		if node.owner ==null:
			node.queue_free()
			
	if not config:
		return
		
	for src in H2AConfig.Slot.size():
		for dst in range(src+1,H2AConfig.Slot.size()):
			if not dst in config.connections[src]:
				continue
			var line = Line2D.new()
			add_child(line)
			line.add_point(_get_slot_position(src))
			line.add_point(_get_slot_position(dst))
			line.width = LINE_TEXTURE.get_size().y
			line.texture = LINE_TEXTURE
			line.texture_mode = Line2D.LINE_TEXTURE_TILE
			line.default_color = Color.WHITE
			line.show_behind_parent =true
	
	for slot in range(1,H2AConfig.Slot.size()):
		var stone = H2AStone.new()
		add_child(stone)
		stone.target_slot =slot
		stone.current_slot = config.placements[slot]
		stone.position = _get_slot_position(stone.current_slot)
		_stone_map[slot]= stone
		stone.connect("interact",_request_move.bind(stone))
		
	queue_redraw()
	
	
func _request_move(stone:H2AStone):
	var avaliable = H2AConfig.Slot.values()
	for s in _stone_map.values():
		avaliable.erase(s.current_slot)
		
	assert(avaliable.size()==1)
	var avaliable_slot = avaliable.front() as int
	if avaliable_slot in config.connections[stone.current_slot]:
		_move_stone(stone,avaliable_slot)
	

func _move_stone(stone:H2AStone,slot:int):
	stone.current_slot = slot
	var tween = create_tween()
	tween.set_ease(Tween.EASE_IN_OUT).set_trans(Tween.TRANS_SINE)
	tween.tween_property(stone,"position",_get_slot_position(slot),0.2)
	tween.tween_interval(1.0)
	tween.tween_callback(_check)

func _check():
	for stone in _stone_map.values():
		if stone.current_slot != stone.target_slot:
			return
	GameState.flags.add("h2a_unlocked")
	SceneChanger.change_scene("res://scenes/h2.tscn")
	
