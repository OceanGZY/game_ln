extends Plants

@export_file("*.tscn") var sun_res

var sun

func _ready():
	super._ready()
	print("向日葵初始化了")

func plant_action():
	super.plant_action()
	#print("运行到这里了")
	sun = load(sun_res).instantiate()
	add_child(sun)
	sun.position= sun.position+Vector2(15,0)
	#print("sun.position",sun.position)
	var tween = create_tween()
	tween.set_ease(Tween.EASE_IN_OUT).set_trans(Tween.TRANS_SINE)
	tween.tween_property(sun,"scale",Vector2.ONE, 0.5).from(Vector2.ONE * 0.1)
	#tween.tween_interval(0.1)
	#tween.tween_property(sun,"position",Vector2(20,20),0.5).from(Vector2.ZERO)
	#print("self.position",self.position)
