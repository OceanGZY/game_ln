// Fill out your copyright notice in the Description page of Project Settings.


#include "Enemy.h"
#include "Components/StaticMeshComponent.h"
#include "Components/SphereComponent.h"
#include "Kismet/GameplayStatics.h"
#include "Kismet/KismetMathLibrary.h"
#include "SpaceShip.h"

// Sets default values
AEnemy::AEnemy()
{
 	// Set this pawn to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

	SphereCollisionComp = CreateDefaultSubobject<USphereComponent>(TEXT("SphereCollisionComp"));
	RootComponent = SphereCollisionComp;

	ShipStaticMeshComp = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("ShipStaticMeshComp"));
	ShipStaticMeshComp->SetupAttachment(RootComponent);

	Speed = 300.0f;

}

// Called when the game starts or when spawned
void AEnemy::BeginPlay()
{
	Super::BeginPlay();
	SpaceShipPlayer = Cast<ASpaceShip>(UGameplayStatics::GetPlayerPawn(this,0)); // 获取主角
	SetColor();
	
}

void AEnemy::MoveTowardPlayer(float DeltaTime)
{
	// 用主角 减去 敌人位置 相减得到 敌人指向主角的 向量
	FVector Direction= (SpaceShipPlayer->GetActorLocation() - GetActorLocation()).GetSafeNormal(); // 单位化
	AddActorWorldOffset(Direction*Speed*DeltaTime, true); // 移动

	// 看向主角，控制旋转
	SetActorRotation(UKismetMathLibrary::FindLookAtRotation(GetActorLocation(), SpaceShipPlayer->GetActorLocation()));

}

// Called every frame
void AEnemy::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
	MoveTowardPlayer(DeltaTime);
}

// Called to bind functionality to input
void AEnemy::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	Super::SetupPlayerInputComponent(PlayerInputComponent);

}

