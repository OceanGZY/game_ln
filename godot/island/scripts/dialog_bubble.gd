extends Control

var _dialogs =[]
var _curent_line=-1

# Called when the node enters the scene tree for the first time.
func _ready():
	hide() #初始状态时气泡隐藏

	
func show_dialog(dialogs):
	if _curent_line==-1 or  _dialogs != dialogs:	
		_dialogs = dialogs
		_show_line(0)
		show()
	else:
		_advance()
	
func _show_line(line):
	_curent_line=line
	$Content.text = _dialogs[line]
	
	var tween = get_tree().create_tween()
	tween.set_ease(Tween.EASE_OUT).set_trans(Tween.TRANS_SINE)
	tween.tween_property(self,"scale",Vector2.ONE,0.2).from(Vector2.ZERO)
	
func _advance():
	if  _curent_line +1 < _dialogs.size():
		_show_line(_curent_line+1)
	else:
		_curent_line =-1
		hide()

func _on_content_gui_input(event):
	if  event.is_action_pressed("interact"):
		_advance()
