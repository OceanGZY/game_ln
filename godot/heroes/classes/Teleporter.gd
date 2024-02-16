extends Interactable
class_name Teleporter

@export_file("*.tscn") var path:String
@export var entry_point:EntryPoint


func interact()->void:
	super.interact()
	get_tree().change_scene_to_file(path)
