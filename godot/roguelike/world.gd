extends Node2D

@onready var tile_map: TileMap = $TileMap
@onready var alert: Label = $Alert
@onready var player: Player = $Player
@onready var camera_2d: Camera2D = player.get_node("Camera2D")
@onready var enemy_born_path: PathFollow2D = get_node("EnemyBornPath/PathFollow2D")
@onready var timer: Timer = $Timer

const Gobilin=preload(AllConfigs.GOBLIN_RES)
const Slime=preload(AllConfigs.SLIME_RES)
const Flying=preload(AllConfigs.FLYING_RES)

@export var gcout:=100
@export var scout:=100
@export var fcout:=200


func _ready() -> void:
	print("游戏开始")
	spawn_enemy(AllEnums.EnemyType.GOBLIN)
	spawn_enemy(AllEnums.EnemyType.FLYING)
	spawn_enemy(AllEnums.EnemyType.SLIME)
	spawn_enemy(AllEnums.EnemyType.GOBLIN)
	var tween:= create_tween()
	tween.tween_property(alert,"visible",false,1)
	var used:= tile_map.get_used_rect()
	var tile_size := tile_map.tile_set.tile_size
	
	camera_2d.limit_top = used.position.y * tile_size.y
	camera_2d.limit_right = used.end.x * tile_size.x
	camera_2d.limit_bottom = used.end.y * tile_size.y
	camera_2d.limit_left = used.position.x * tile_size.x
	print(used.position,used.end)
	camera_2d.reset_smoothing() #将相机的位置立即设置为其当前平滑的目标位置
	

func _process(delta: float) -> void:
	if gcout<=0 and scout <=0 and fcout<=0:
		timer.stop()


func spawn_enemy(enmey_type)->void:
	var enemy
	match enmey_type:
		AllEnums.EnemyType.GOBLIN:
			enemy= Gobilin.instantiate()
			gcout -=1
		AllEnums.EnemyType.SLIME:
			enemy= Slime.instantiate()
			scout -=1
		AllEnums.EnemyType.FLYING:
			enemy= Flying.instantiate()
			fcout -=1
	enemy_born_path.progress_ratio = randf()
	enemy.global_position = enemy_born_path.global_position
	add_child(enemy)
	enemy.enemy_die.connect(update_socre.bind(enmey_type))
	


func _on_timer_timeout() -> void:
	if gcout>0:
		spawn_enemy(AllEnums.EnemyType.GOBLIN)
	if scout>0:
		spawn_enemy(AllEnums.EnemyType.SLIME)
	if fcout>0:
		spawn_enemy(AllEnums.EnemyType.FLYING)


func update_socre(v:AllEnums.EnemyType):
	var x:=0 
	var y:=0
	match v:
		AllEnums.EnemyType.FLYING:
			x=1
			y=10
		AllEnums.EnemyType.SLIME:
			x=3
			y=10
		AllEnums.EnemyType.GOBLIN:
			x=5
			y=10	
	
	player.character_state.experience += x
	player.character_state.score += y
