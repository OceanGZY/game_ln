extends Control

@onready var score: Label = $CurrentState/Score
@onready var coins: Label = $CurrentState/Coins
@onready var level: Label = $CurrentState/Level
@onready var attack: Label = $CurrentState/Attack
@onready var experience: Label = $CurrentState/Experience
@onready var life: Label = $CurrentState/Life

@onready var cur_data:CurrentState:
	set(v):
		cur_data =v
		if not ready:
			await ready
		score.text = "分数:%d" % cur_data.score
		coins.text = "金币:%d" % cur_data.coins
		level.text = "等级:%d" % cur_data.level
		attack.text = "攻击:%d" % cur_data.damage
		experience.text = "经验:%d" % cur_data.experience
		life.text = "生命:%d" % cur_data.health

func update_current_state_panel_score(v:int):
	score.text = "分数:%d" % v
	
func update_current_state_panel_coins(v:int):
	coins.text = "金币:%d" % v

func update_current_state_panel_level(v:int):
	level.text = "等级:%d" % v
	
func update_current_state_panel_damage(v:int):
	attack.text = "攻击:%d" % v
	
func update_current_state_panel_experience(v:float):
	experience.text = "经验:%d" % v
	
func update_current_state_panel_health(v:int):
	life.text = "生命:%d" % v
