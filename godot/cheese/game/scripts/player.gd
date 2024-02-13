extends CharacterBody2D

signal  player_die

@onready var happy_boo = $HappyBoo
@onready var hurt_box = $HurtBox
@onready var health_bar = $HealthBar

var life=100.0

func _physics_process(delta):
	var direction = Input.get_vector("move_left","move_right","move_up","move_down")
	velocity= direction *600
	move_and_slide()
	
	if velocity.length()>0.0:
		happy_boo.play_walk_animation()
	else:
		happy_boo.play_idle_animation()
	
	const DAMAGE_RATE=5.0
	var overlapping_mobs = hurt_box.get_overlapping_bodies()
	if overlapping_mobs.size()>0:
		life -= DAMAGE_RATE * overlapping_mobs.size() * delta
		health_bar.value=life
		if life <=0:
			player_die.emit()


func _on_hurt_box_body_entered(body):
	#print("有slime碰到了",body)
	pass
