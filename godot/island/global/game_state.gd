extends Node

const SVAE_PATH = "user://data.sav"

class Flags:
	
	signal changed
	
	var _flags=[]
	
	func has(flag:String)->bool:
		return flag in _flags
	func add(flag:String):
		if flag in _flags:
			return
		else:
			_flags.append(flag)
			emit_signal("changed")
	func to_dict():
		return {
			all_flags=_flags
		}
	func from_dict(dict):
		_flags= dict.all_flags
		emit_signal("changed")
	func reset():
		_flags.clear()
		emit_signal("changed")

class Inventory:
	signal changed
	
	var active_item:Item
	
	var _items = []
	var _current_item_index = -1
	
	func get_item_count()->int: #道具数量
		return _items.size()
		
	func get_current_item()->Item:
		if _current_item_index==-1:
			return null
		return _items[_current_item_index]
		
	func add_item(item:Item):
		if item in _items:
			return
		_items.append(item)
		_current_item_index = _items.size()-1
		emit_signal("changed")
		
	func del_item(item:Item):
		var index = _items.find(item)
		if index ==-1:
			return
		_items.remove_at(index)
		
		if _current_item_index>= _items.size():
			_current_item_index=_items.size()-1 if _items else -1
		emit_signal("changed")
		
		
	func select_next():
		if _current_item_index ==-1:
			return
		_current_item_index = (_current_item_index+1) % _items.size() 
		emit_signal("changed")
		
	func select_prev():
		if _current_item_index ==-1:
			return
		_current_item_index = (_current_item_index-1 + _items.size()) % _items.size() 
		emit_signal("changed")
	func to_dict():
		var names=[]
		for item in _items:
			var path=  item.resource_path
			names.append(path.get_file().get_base_name())
		return {
			all_items=names,
			current_item_index=_current_item_index
		}
		
	func from_dict(dict):
		_current_item_index = dict.current_item_index
		_items.clear()
		
		for name in dict.all_items:
			_items.append(load("res://items/%s.tres"%name))
		emit_signal("changed")
		
	func reset():
		_current_item_index =-1
		_items.clear()
		emit_signal("changed")
	
	

var flags = Flags.new()
var inventory = Inventory.new()

func back_to_title():
	save_game()
	SceneChanger.change_scene("res://ui/title_screen.tscn")

func save_game():
	var file = FileAccess.open(SVAE_PATH,FileAccess.WRITE)
	printraw(get_scene_file_path())
	var data = {
		inventory_dict = inventory.to_dict(),
		flags_dict = flags.to_dict(),
		#current_scene_name = get_tree().current_scene.filename.get_file().get_name()
		current_scene_name = get_scene_file_path().get_file().get_basename()	
	}
	
	var json = JSON.stringify(data)
	file.store_string(json)

func load_game():
	var file = FileAccess.open(SVAE_PATH,FileAccess.READ)
	var json = file.get_as_text()
	var data = JSON.parse_string(json)
	inventory.from_dict(data.inventory_dict)
	flags.from_dict(data.flags_dict)
	SceneChanger.change_scene("res://scenes/%s.tscn" %  data.current_scene_name)

func new_game():
	inventory.reset()
	flags.reset()
	SceneChanger.change_scene("res://scenes/h1.tscn")


func has_save_file():
	return FileAccess.file_exists(SVAE_PATH)
