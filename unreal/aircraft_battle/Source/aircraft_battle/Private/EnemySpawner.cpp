// Fill out your copyright notice in the Description page of Project Settings.


#include "EnemySpawner.h"
#include "Components/BoxComponent.h"
#include "Enemy.h"
#include "SpaceShip.h"
#include "Kismet/KismetMathLibrary.h"
#include "Kismet/GameplayStatics.h"
#include "Engine/World.h"
#include "TimerManager.h"

// Sets default values
AEnemySpawner::AEnemySpawner()
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

	SpawnArea = CreateDefaultSubobject<UBoxComponent>(TEXT("SpawnArea"));
	RootComponent = SpawnArea;

	MinimumDistanceToPlayer = 1200;

	SpawnInterval = 2.0f;

	MaxEnemyNum = 30;

	CurrentEnemyCount = 0;
}

// Called when the game starts or when spawned
void AEnemySpawner::BeginPlay()
{
	Super::BeginPlay();

	SpaceShip = Cast<ASpaceShip>(UGameplayStatics::GetPlayerPawn(this, 0));

	// 设置定时器
	GetWorldTimerManager().SetTimer(TimerHandle_Spawn,this,&AEnemySpawner::SpawnEnemy,SpawnInterval,true,0.0f);
	
}

FVector AEnemySpawner::GetGenerateLocation()
{
	float Distance=0.0f;
	FVector Location;
	while (Distance < MinimumDistanceToPlayer)
	{
		Location = UKismetMathLibrary::RandomPointInBoundingBox(SpawnArea->Bounds.Origin, SpawnArea->Bounds.BoxExtent);// 获取区域内对的随机点
		Distance = (Location - SpaceShip->GetActorLocation()).Size(); // 获取距离
	}
	return Location;
}

void AEnemySpawner::SpawnEnemy()
{
	if (SpaceShip->GetBDead() == false && CurrentEnemyCount<MaxEnemyNum) {
		FActorSpawnParameters SpawnParams;
		GetWorld()->SpawnActor<AEnemy>(Enemy, GetGenerateLocation(), FRotator::ZeroRotator, SpawnParams);
		CurrentEnemyCount++;
	}
}

// Called every frame
void AEnemySpawner::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

}

void AEnemySpawner::DecreaseEnemyCount()
{
	if (CurrentEnemyCount>0) {
		CurrentEnemyCount--;
	}
}

