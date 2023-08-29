// Fill out your copyright notice in the Description page of Project Settings.


#include "SpaceShip.h"
#include "Components/StaticMeshComponent.h"
#include "Components/SphereComponent.h"
#include "Components/SceneComponent.h"
#include "Camera/CameraComponent.h"
#include "GameFramework/PlayerController.h"
#include "GameFramework/SpringArmComponent.h"
#include "Kismet/KismetMathLibrary.h"
#include "Bullet.h"
#include "TimerManager.h"


// Sets default values
ASpaceShip::ASpaceShip()
{
 	// Set this pawn to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

	
	SphereCollisionComp = CreateDefaultSubobject<USphereComponent>(TEXT("SphereCollisionComp"));
	RootComponent = SphereCollisionComp;

	ShipStaticMeshComp = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("ShipStaticMeshComp"));
	ShipStaticMeshComp->SetupAttachment(RootComponent);

	SpringArmComp = CreateDefaultSubobject<USpringArmComponent>(TEXT("SpringArmComp"));
	SpringArmComp->SetupAttachment(RootComponent);


	CameraComp = CreateDefaultSubobject<UCameraComponent>(TEXT("CameraComp"));
	CameraComp->SetupAttachment(SpringArmComp);

	SpawnPoint = CreateDefaultSubobject<USceneComponent>(TEXT("SpawnPoint"));
	SpawnPoint->SetupAttachment(ShipStaticMeshComp);

	Speed = 2500.0f;

	TimeBetweenShot = 0.2f;

}

// Called when the game starts or when spawned
void ASpaceShip::BeginPlay()
{
	Super::BeginPlay();
	Pc =Cast<APlayerController>(GetController()); // 获取player controller
	Pc->bShowMouseCursor = true; // 显示鼠标
	
}

void ASpaceShip::LookAtCousor()
{
	FVector MouseLocation,MouseDirection;  // 鼠标位置, 鼠标方向
	Pc->DeprojectMousePositionToWorld(MouseLocation,MouseDirection);
	FVector TargetLocation = FVector(MouseLocation.X, MouseLocation.Y, GetActorLocation().Z);
	FRotator Rotator = UKismetMathLibrary::FindLookAtRotation(GetActorLocation(), TargetLocation); // 飞机位置 和 鼠标位置的方向
	SetActorRotation(Rotator); // 使飞机转向

}

void ASpaceShip::MoveUpDown(float Value)
{
	// FVector(1, 0, 0);  //FVector::ForwardVector;  向前移动
	AddMovementInput(FVector::ForwardVector,Value);
}

void ASpaceShip::MoveLeftRight(float Value)
{
	AddMovementInput(FVector::RightVector, Value);
}

void ASpaceShip::Move(float DeltaTime)
{
	AddActorWorldOffset(ConsumeMovementInputVector()*Speed*DeltaTime,false); // 获取输入的移动向量变化，并设置为actor的世界坐标
}

void ASpaceShip::Fire()
{
	if (Bullet) {
		FActorSpawnParameters SpawnParams;
		GetWorld()->SpawnActor<ABullet>(Bullet, SpawnPoint->GetComponentLocation(), SpawnPoint->GetComponentRotation(), SpawnParams);
	}
}

void ASpaceShip::StartFire() // 设置定时器，连续开火
{
	GetWorldTimerManager().SetTimer(TimerHandle_BetweenShot, this, &ASpaceShip::Fire, TimeBetweenShot, true, 0.0f);

}

void ASpaceShip::EndFire()
{
	GetWorldTimerManager().ClearTimer(TimerHandle_BetweenShot);
}

// Called every frame
void ASpaceShip::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
	LookAtCousor();
	Move(DeltaTime);
}

// Called to bind functionality to input
void ASpaceShip::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	Super::SetupPlayerInputComponent(PlayerInputComponent);

	PlayerInputComponent->BindAxis("MoveUpDown", this, &ASpaceShip::MoveUpDown);
	PlayerInputComponent->BindAxis("MoveLeftRight", this, &ASpaceShip::MoveLeftRight);
	PlayerInputComponent->BindAction("Fire",IE_Pressed ,this, &ASpaceShip::StartFire);
	PlayerInputComponent->BindAction("Fire", IE_Released, this, &ASpaceShip::EndFire);
}

