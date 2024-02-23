extends Node

@export var enemy_scene:PackedScene


func _on_mob_timer_timeout() -> void:
	var enemy = enemy_scene.instantiate()
	
	var enemy_spawn_location = get_node("SpawnPath/SpawnLocation")
	enemy_spawn_location.progress_ratio= randf()
	
	var player_position = $Player.position
	#print("player_position",player_position)
	
	enemy.initialize(enemy_spawn_location.position,player_position)
	#print("enemy.position",enemy.position)
	#print("enemy.velocity",enemy.velocity)
	add_child(enemy)
	
