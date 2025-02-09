@tool
extends Resource
class_name H2AConfig

enum Slot {NULL,TIME,SUN,FISH,HILL,CROSS,CHOICE}

#@export var placements = [] #该方法相对低效且亿出错
#@export var connections = {}

var placements = []
var connections = {}

func _init():
	placements.resize(Slot.size())
	placements.fill(Slot.NULL)
	
	for slot in Slot.values():
		connections[slot]=[]
		
		
func _get_property_list():
	var properties = [
		{
			name="placements",
			type=TYPE_ARRAY,
			usage=PROPERTY_USAGE_STORAGE
		},
		{
			name="connections",
			type=TYPE_DICTIONARY,
			usage=PROPERTY_USAGE_STORAGE
		}
	]
	
	var options =",".join(PackedStringArray(Slot.keys())) 
	for slot in range(1,Slot.size()):
		properties.append({
			name ="placements/"+Slot.keys()[slot],
			type = TYPE_INT,
			usage=PROPERTY_USAGE_EDITOR,
			hint = PROPERTY_HINT_ENUM,
			hint_string = options
		})
		
	for slot in Slot.size()-1:
		var avaliable = []
		for dst in Slot.size():
			if dst <= slot:
				avaliable.append("")
			else:
				avaliable.append(Slot.keys()[dst])
			
		properties.append({
			name ="connections/"+Slot.keys()[slot],
			type = TYPE_INT,
			usage=PROPERTY_USAGE_EDITOR,
			hint = PROPERTY_HINT_FLAGS,
			hint_string = ",".join(avaliable)
		})
		
	return properties
	
func _get(property):
	if  property.begins_with("placements/"):
		property =property.trim_prefix("placements/")
		var index = Slot[property] as int
		return placements[index]
		
		
	if  property.begins_with("connections/"):
		property =property.trim_prefix("connections/")
		var index = Slot[property] as int
		var value=0
		for dst in range(index+1,Slot.size()):
			if dst in connections[index]:
				value |= (1<<dst)
		return value
		
	return null

func _set(property, value):
	if  property.begins_with("placements/"):
		property =property.trim_prefix("placements/")
		var index = Slot[property] 
		placements[index]=value
		emit_changed()
		return true
	
	if  property.begins_with("connections/"):
		property =property.trim_prefix("connections/")
		var index = Slot[property] 
		for dst in range(index+1,Slot.size()):
			var temp:bool = value &(1<<dst) 
			_set_connected(index,dst,temp)
		emit_changed()
		return true
		
	return false
	
	
	
func _set_connected(src, dst, connected):
	var src_arr = connections[src] as Array
	var dst_arr = connections[dst] as Array
	
	var src_idx = src_arr.find(dst)
	var dst_idx = dst_arr.find(src)
	if  connected:
		if src_idx == -1:
			src_arr.append(dst)
		if dst_idx==-1:
			dst_arr.append(src)
	else:
		if src_idx != -1:
			src_arr.remove_at(src_idx)
		if dst_idx != -1:
			dst_arr.remove_at(dst_idx)
			
