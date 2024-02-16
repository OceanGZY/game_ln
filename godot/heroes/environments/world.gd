extends Node2D

@onready var tile_map: TileMap = $TileMap
@onready var camera_2d: Camera2D = $Player/Camera2D
@onready var player: Player = $Player


func _ready() -> void:
	var used:= tile_map.get_used_rect().grow(-1) # 在tilemap上占用的尺寸大小
	var tile_size := tile_map.tile_set.tile_size # 一个tile的像素
	
	#print(used.position)
	#print(used.end)
	#print(tile_size)
	
	#used.position # 左上角坐标
	#used.end # 右下角坐标
	
	camera_2d.limit_top = used.position.y * tile_size.y
	camera_2d.limit_right = used.end.x * tile_size.x
	camera_2d.limit_bottom = used.end.y * tile_size.y
	camera_2d.limit_left = used.position.x * tile_size.x
	
	#print(camera_2d.limit_bottom)
	#print("limit_right",camera_2d.limit_right)
	
	camera_2d.reset_smoothing() # 将相机立即设置到目标位置


func update_player(pos:Vector2) -> void:
	player.global_position = pos
	camera_2d.reset_smoothing() # 将相机立即设置到目标位置
