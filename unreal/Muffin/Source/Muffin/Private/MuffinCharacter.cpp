// Fill out your copyright notice in the Description page of Project Settings.


#include "MuffinCharacter.h"
#include "GameFramework/CharacterMovementComponent.h"

// Sets default values
AMuffinCharacter::AMuffinCharacter()
{
 	// Set this character to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

	LaunchVelocity = FVector(0, 0, 1500);

	AirSpeed = 10500.0f;
	GroundSpeed = 300.0f;
}

// Called when the game starts or when spawned
void AMuffinCharacter::BeginPlay()
{
	Super::BeginPlay();
	Pc = Cast<APlayerController>(GetController());
	Pc->bShowMouseCursor=true;
	
}

// Called every frame
void AMuffinCharacter::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
	if (!bDead)
	{
		MoveTowardCursor();// 每一帧都调用
		SetSpeed();
	}
	
}

// Called to bind functionality to input
void AMuffinCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	Super::SetupPlayerInputComponent(PlayerInputComponent);
	PlayerInputComponent->BindAction("Jump",IE_Pressed,this,&AMuffinCharacter::LaunchOnAnyKeyPressed);
}


void AMuffinCharacter::MoveTowardCursor() 
{
	FVector MouseLocation, MouseDirection;
	Pc->DeprojectMousePositionToWorld(MouseLocation, MouseDirection); // 获取世界坐标下，鼠标的位置和方向

	float YDirection =  FMath::Clamp(MouseLocation.Y - GetActorLocation().Y, -1.0f, 1.0f);

	FVector Direction = FVector(0, YDirection, 0);

	float ScaleValue =FMath::Clamp(FMath::Abs(MouseLocation.Y - GetActorLocation().Y)/100,0.0f,1.0f);

	AddMovementInput(Direction, ScaleValue);
}

void AMuffinCharacter::LaunchOnAnyKeyPressed()
{
	if (!GetCharacterMovement()->IsFalling() && !bGameStarted) {
		Launch();
	}
	if (!bGameStarted) {
		bGameStarted = true;
	}
}

void AMuffinCharacter::SetSpeed()
{
	if (GetCharacterMovement()->IsFalling()) {
		GetCharacterMovement()->MaxWalkSpeedCrouched = AirSpeed;
	}
	else {
		if (bGameStarted) {
			GameOver();
		}
		GetCharacterMovement()->MaxWalkSpeedCrouched = GroundSpeed;
	}
}

void AMuffinCharacter::GameOver()
{
	bDead = true;
	SetActorRotation(FRotator::ZeroRotator);
	EnableInput(Pc);
	DisplayReStart();
}

void AMuffinCharacter::ReStart()
{
	Score = 0;
	bDead = false;
	bGameStarted = false;

}

void AMuffinCharacter::Launch()
{
	LaunchCharacter(LaunchVelocity,false,true); // z速度设置true，保证重新使用Z 1500的速度
}

void AMuffinCharacter::InCreaseScore()
{
	Score++;
}

int AMuffinCharacter::GetScore() const
{
	return Score;
}
