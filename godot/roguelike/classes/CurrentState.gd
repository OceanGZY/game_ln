extends Node
class_name CurrentState

signal health_changed(v)
signal level_changed(v)
signal damage_changed(v)
signal speed_changed(v)
signal max_health_changed(v)
signal health_regen_changed(v)
signal experience_changed(v)
signal attract_cion_radius_changed(v)
signal weapon_type_changed(v)
signal knock_back_force_changed(v)
signal accerelation_changed(v)
signal max_spped_changed(v)
signal score_changed(v)
signal coins_changed(v)

signal died


@export var level :int =0 :
	set(v):
		level =v
		level_changed.emit(level)
	
@export var damage:int =1 :
	set(v):
		damage =v
		damage_changed.emit(damage)
		
@export var speed :int =50 :
	set(v):
		speed =v
		speed_changed.emit(speed)
		
@export var max_health:int =3 :
	set(v):
		max_health =v
		max_health_changed.emit(max_health)
		
@export var health_regen:float=0 :
	set(v):
		health_regen =v
		health_regen_changed.emit(health_regen)
		
@export var experience:int=0 :
	set(v):
		experience =v
		experience_changed.emit(experience)
		
@export var attract_cion_radius:Vector2 = Vector2.ZERO :
	set(v):
		attract_cion_radius =v
		attract_cion_radius_changed.emit(attract_cion_radius)
		
@export var weapon_type = AllEnums.WeaponType.NONE :
	set(v):
		weapon_type =v
		weapon_type_changed.emit(weapon_type)
		
@export var knock_back_force:int =300 :
	set(v):
		knock_back_force =v
		knock_back_force_changed.emit(knock_back_force)
		
@export var knock_back_direction:Vector2 =Vector2.ZERO
@export var accerelation:int = 40 :
	set(v):
		accerelation =v
		accerelation_changed.emit(accerelation)
		
@export var max_spped:int = 100 :
	set(v):
		max_spped =v
		max_spped_changed.emit(max_spped)
		
@export var friction:float =0.5 # 摩擦力
@export var mov_direction :Vector2 =Vector2.ZERO


@onready var health:int = max_health:
	set(v):
		v = clampi(v,0,max_health)
		if health == v:
			return
		health =v
		if health ==0:
			died.emit()
		health_changed.emit(health)
		print("发出ealth信号了")

@onready var score:int = 0 :
	set(v):
		score = v
		score_changed.emit(score)
		
@onready var coins:int = 0 :
	set(v):
		coins = v
		coins_changed.emit(coins)
		

func _process(delta: float) -> void:
	health += health_regen
