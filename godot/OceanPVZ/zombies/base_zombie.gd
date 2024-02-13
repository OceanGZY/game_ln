extends CharacterBody2D

@onready var animation_tree = $AnimationTree

@export var life:int=100

var hited_plant:bool=false
var half_life:bool=false
var aonther_body

func _ready():
	velocity =Vector2(-8,0)

func _physics_process(delta):
	#print("此时的生命值:",life)
	collision_check()
	change_move_state()
	
func collision_check():
	move_and_slide()
	if get_slide_collision_count()>0:
		for i in get_slide_collision_count():
			var collision = get_slide_collision(i)
			aonther_body= collision.get_collider()
			print("碰到了：", aonther_body.name)
			if aonther_body.name != "PeashooterBullet":
				animation_tree["parameters/conditions/is_hited_plant"]=true
				animation_tree["parameters/conditions/not_hited"]=false
				aonther_body.plant_life -=5
	else:
		velocity =Vector2(-8,0)
		animation_tree["parameters/conditions/is_hited_plant"]=false
		animation_tree["parameters/conditions/not_hited"]=true

func change_move_state():
	if life<=50:
		half_life=true #通过expression设置动画状态
		if life <=0:
			animation_tree["parameters/conditions/is_die"]=true
			var tween = create_tween()
			tween.tween_interval(2)
			tween.tween_callback(queue_free)
			
