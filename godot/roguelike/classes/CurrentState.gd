extends Node
class_name CurrentState

signal health_changed

signal current_state_changed

@export var level :=0 
@export var damage:=1
@export var speed :=50
@export var max_health:int =3
@export var health_regen:float=0
@export var experience:float=0
@export var attract_cion_radius:Vector2 = Vector2.ZERO
@export var weapon_type = AllEnums.WeaponType.NONE
@export var knock_back_force:int =300
@export var knock_back_direction:Vector2 =Vector2.ZERO
@export var accerelation:int = 40
@export var max_spped:int = 100
@export var friction:float =0.5 # 摩擦力
@export var mov_direction :Vector2 =Vector2.ZERO

@onready var helath:int = max_health:
	set(v):
		v = clampi(v,0,max_health)
		if helath == v:
			return
		helath =v
		health_changed.emit()

func _process(delta: float) -> void:
	helath += health_regen
