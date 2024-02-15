extends Node
class_name StateMacine

var current_state:int=-1:
	set(v):
		owner.transition_state(current_state,v)
		current_state=v

func _ready() -> void:
	await owner.ready # 等待owner的eady信号
	current_state = 0

func _physics_process(delta: float) -> void:
	while true:
		var next_state = owner.get_next_state(current_state) as int
		if current_state == next_state:
			break
		current_state = next_state
	
	owner.tick_phycis(current_state,delta)
