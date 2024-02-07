extends Interactable
class_name Teleporter

# 字符串，文件类型，后缀为tscn
@export_file("*.tscn") var TargetPath:String


func _interact():
	super._interact()
	SceneChanger.change_scene(TargetPath)
