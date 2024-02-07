extends VBoxContainer

@onready var label = $Label
@onready var prev = $ItemBar/Prev
@onready var use = $ItemBar/Use
@onready var next = $ItemBar/Next
@onready var prop = $ItemBar/Use/Prop
@onready var hand = $ItemBar/Use/Hand
@onready var timer = $Label/Timer


var _hand_outro:Tween
var _label_outro:Tween

func _ready():
	#GameState.inventory.add_item(preload("res://items/key.tres"))
	#GameState.inventory.add_item(preload("res://items/mail.tres"))
	
	hand.hide()
	hand.modulate.a = 0.0
	
	label.hide()
	label.modulate.a =0.0
	
	GameState.inventory.connect("changed",_update_ui)
	_update_ui(true)

func _update_ui(is_init=false):
	var cout= GameState.inventory.get_item_count()
	prev.disabled = cout < 2
	next.disabled = cout < 2
	visible = cout > 0
	
	var item = GameState.inventory.get_current_item()
	if not item:
		return
	label.text = item.Description
	prop.texture = item.PropTexture
	if is_init: # 如果是初始化_ready的时候不做动画效果
		return
	var tween = create_tween() # 道具加载显示的动画
	tween.set_ease(Tween.EASE_OUT).set_trans(Tween.TRANS_BACK)
	tween.tween_property(prop,"scale",Vector2.ONE,0.15).from(Vector2.ZERO)
	
	_show_label()


func _on_prev_pressed():
	GameState.inventory.select_prev()


func _on_next_pressed():
	GameState.inventory.select_next()


func _on_use_pressed():
	GameState.inventory.active_item = GameState.inventory.get_current_item()
	
	if _hand_outro and _hand_outro.is_valid():
		_hand_outro.kill()
		_hand_outro=null
	
	hand.show()
	var tween = create_tween()
	tween.set_ease(Tween.EASE_OUT).set_trans(Tween.TRANS_BACK).set_parallel()
	tween.tween_property(hand,"scale",Vector2.ONE,0.15).from(Vector2.ZERO)
	tween.tween_property(hand,"modulate:a",1.0,0.15)
	_show_label()
	
	
func _input(event): #在 on_handle_input  和 guiinput之前执行
	if event.is_action_pressed("interact") and GameState.inventory.active_item:
		GameState.inventory.set_deferred("active_item",null)
		
		_hand_outro = create_tween()
		_hand_outro.set_ease(Tween.EASE_IN_OUT).set_trans(Tween.TRANS_SINE).set_parallel()
		_hand_outro.tween_property(hand,"scale",Vector2.ONE*3,0.15)
		_hand_outro.tween_property(hand,"modulate:a",0.0,0.15)
		_hand_outro.chain().tween_callback(hand.hide)


func _on_timer_timeout():
	_label_outro = create_tween()
	_label_outro.set_ease(Tween.EASE_IN_OUT).set_trans(Tween.TRANS_SINE)
	_label_outro.tween_property(label,"modulate:a",0.0,0.2)
	_label_outro.tween_callback(label.hide)


func _show_label():
	if _label_outro and _label_outro.is_valid():
		_label_outro.kill()
		_label_outro =null
	label.show()

	var tween= create_tween()
	tween.set_ease(Tween.EASE_IN_OUT).set_trans(Tween.TRANS_SINE)
	tween.tween_property(label,"modulate:a",1.0,0.2)
	tween.tween_callback(timer.start)
