extends FiniteStateMachine

func _init():
	_add_state("idle")
	_add_state("move")
	
func _ready():
	set_state(states.idle)

func _state_logic(delta:float) ->void:
	super._state_logic(delta)
	parent.get_input()
	parent.move()
	
	
func _get_transtion()->int:
	super._get_transtion()
	match state:
		states.idle:
			if parent.velocity.length()>10:
				return states.move
		states.move:
			if parent.velocity.length()<10:
				return states.idle
	return -1
	
func _enter_state(pstate:int,nstate:int)->void:
	super._enter_state(pstate,nstate)
	match nstate:
		states.idle:
			animation_player.play("idle")
		states.move:
			animation_player.play("move")
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
