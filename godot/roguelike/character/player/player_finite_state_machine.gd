extends FiniteStateMachine

func _init():
	_add_state("idle")
	_add_state("move")
	
func _ready():
	set_state(states.idle)

func _state_logic(delta:float) ->void:
	super._state_logic(delta)
	
