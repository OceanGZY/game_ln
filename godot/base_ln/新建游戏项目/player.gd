extends Area2D

signal hit

@export var speed=400
var screen_size

# Called when the node enters the scene tree for the first time.
func _ready():
	#pass # Replace with function body.
	screen_size= get_viewport_rect().size
	hide()


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	#pass
	var velocity = Vector2.ZERO
	if Input.is_action_just_pressed("move_right"):
		velocity.x+=1;
	if Input.is_action_just_pressed("move_left"):
		velocity.x-=1;
	if Input.is_action_just_pressed("move_up"):
		velocity.y-=1;
	if Input.is_action_just_pressed("move_down"):
		velocity.y+=1;
	
	if  velocity.length()>0 :
		velocity = velocity.normalized() * speed
		$AnimatedSprite2D.play()
		
	position+= velocity*delta
	position = position.clamp(Vector2.ZERO,screen_size)
	
	
	if velocity.x != 0:
		$AnimatedSprite2D.flip_v = false; # 是否垂直反转
		$AnimatedSprite2D.flip_h = velocity.x <0 # 如果速度方向是 负值，则反转
		$AnimatedSprite2D.animation ="walk"
	elif velocity.y != 0:
		$AnimatedSprite2D.animation ="up"
		$AnimatedSprite2D.flip_v = velocity.y>0; # 往上飞是负值， 下降是正值
		
func _on_body_entered(nody): #敌人每次击中 玩家时都会发出一个信号。需要禁用玩家的碰撞检测，确保不会多次触发 hit 信号。
	hide()
	hit.emit()
	$CollisionShape2D.set_deferred("disabled",true)

func start(pos):#用于在开始新游戏时调用来重置玩家。
	position = pos
	show()
	$CollisionShape2D.disabled = false
	
