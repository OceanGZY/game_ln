extends CharacterBase

@onready var mobile_control: Control = $MobileControl.get_node("JoyStick")

var speed:=100

func _physics_process(delta: float) -> void:
	velocity = mobile_control.direction * speed
	move_and_slide()
