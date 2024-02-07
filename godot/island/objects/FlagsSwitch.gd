extends Node2D
class_name FlagsSwitch

@export var flag:String

var default_node:Node2D # Flag不存在时默认显示的节点
var switch_node:Node2D # Flag存在时,切换显示的节点


func _ready():
	var count = get_child_count()
	if count >0:
		default_node = get_child(0)
	if count >1:
		switch_node = get_child(1)
	GameState.flags.connect("changed",_update_nodes)
	_update_nodes()
	
	
func _update_nodes():
	var exists = GameState.flags.has(flag)
	if default_node:
		default_node.visible = not exists
	if switch_node:
		switch_node.visible = exists
