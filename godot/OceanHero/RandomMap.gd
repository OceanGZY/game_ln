extends Node2D

@onready var tile_map: TileMap = $TileMap

func _ready() -> void:
	random_tile()
	

func random_tile()->void:
	# 随机添加地形点缀
	tile_map.clear_layer(1)
	var floor_cells = tile_map.get_used_cells(0)
	for icell in floor_cells: 
		var num = randi_range(0,100)
		if num <=5:
			tile_map.set_cell(1,icell,0,Vector2(5,1))
		
	
