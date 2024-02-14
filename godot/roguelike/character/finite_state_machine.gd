extends Node
class_name FiniteStateMachine

@onready var parent:BaseCharacter = get_parent()
@onready var animation_player:AnimationPlayer = parent.get_node("AnimationPlayer")

var states:Dictionary ={} # 保存所有状态
var previous_state:int =-1
var state:int = -1: # 当前状态
	set = set_state,
	get = get_state
	
	
func set_state(new_state:int) ->void:
	_exit_state(state)
	previous_state= state
	state = new_state
	_enter_state(previous_state,state)
	
func get_state() -> int:
	return state


func _process(delta:float) ->void:
	if  state != -1:
		_state_logic(delta)
		var transition: int = _get_transtion()
		if transition != -1:
			set_state(transition)

func _state_logic(delta:float) ->void:
	pass

func _get_transtion() ->int :
	return -1

func _add_state(name:String)->void:
	states[name] = states.size()
	
func _enter_state(pstate:int,nstate:int)->void:
	pass
	
func _exit_state(state:int)->void:
	pass
