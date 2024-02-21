extends Control
@onready var level: Label = $CurrentState/Level
@onready var attack: Label = $CurrentState/Attack
@onready var experience: Label = $CurrentState/Experience
@onready var life: Label = $CurrentState/Life
@onready var state_data: CurrentState = $StateData :
	set(v):
		state_data=v
		state_data.current_state_changed.emit()


func _ready() -> void:
	update_current_state_panel()
	state_data.current_state_changed.connect(update_current_state_panel)

func update_current_state_panel():
	level.text = "分数:%d" % state_data.level
	attack.text = "攻击:%d" % state_data.damage
	experience.text = "经验:%f" % state_data.experience
	life.text = "生命:%d" % state_data.helath
