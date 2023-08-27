// Fill out your copyright notice in the Description page of Project Settings.


#include "CloudSpawner.h"
#include "Components/BoxComponent.h"
#include "Components/SceneComponent.h"
#include "Kismet/KismetMathLibrary.h"
#include "Engine/World.h"
#include "Cloud.h"
#include "MuffinCharacter.h"
#include "Kismet/GameplayStatics.h"

// Sets default values
ACloudSpawner::ACloudSpawner()
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

	DefaultRootComponent = CreateDefaultSubobject<USceneComponent>(TEXT("DefaultRootComponent"));
	RootComponent = DefaultRootComponent;

	SpawnArea = CreateDefaultSubobject<UBoxComponent>(TEXT("SpawnArea"));
	SpawnArea->SetupAttachment(RootComponent);
	TriggerArea = CreateDefaultSubobject<UBoxComponent>(TEXT("TriggerArea"));
	TriggerArea->SetupAttachment(RootComponent);

	InitialSpawnAmout = 6;
	SpawnSpacing = 300.0f;
}

// Called when the game starts or when spawned
void ACloudSpawner::BeginPlay()
{
	Super::BeginPlay();
	Reset();
}

void ACloudSpawner::SpawnCloud()
{
	// 获取spawncloud的中心位置和区域
	FVector SpawnOrigin = SpawnArea->Bounds.Origin;
	FVector SpawnExtent = SpawnArea->Bounds.BoxExtent;

	// 获取Y的位置
	float YLocation = UKismetMathLibrary::RandomPointInBoundingBox(SpawnOrigin, SpawnExtent).Y;

	// 生成的位置
	FVector SpawnLocation = FVector(SpawnArea->GetComponentLocation().X, YLocation, SpawnArea->GetComponentLocation().Z);

	//
	FActorSpawnParameters SpawnParams;

	GetWorld()->SpawnActor<ACloud>(Cloud, SpawnLocation, FRotator::ZeroRotator, SpawnParams);

	AddActorWorldOffset(FVector(0, 0, SpawnSpacing));
}

void ACloudSpawner::Reset()
{
	InitialSpawnAmout = 6; // 重置6
	SetActorLocation(FVector::ZeroVector); // 重置位置

	TArray<AActor*> FoundClouds;
	UGameplayStatics::GetAllActorsOfClass(GetWorld(), ACloud::StaticClass(), FoundClouds); // 找到所有的云彩

	for (AActor* TActor: FoundClouds)
	{
		ACloud* _Cloud=	Cast<ACloud>(TActor);
		if (_Cloud != nullptr)
		{
			_Cloud->Destroy();
		}
	}

	while (InitialSpawnAmout > 0)
	{
		SpawnCloud();
		InitialSpawnAmout--;
	}

}

// Called every frame
void ACloudSpawner::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

}

void ACloudSpawner::NotifyActorBeginOverlap(AActor* OtherActor)
{
	Super::NotifyActorBeginOverlap(OtherActor);

	MuffinCharacter = Cast<AMuffinCharacter>(OtherActor);
	if (MuffinCharacter) {
		SpawnCloud();
	}
}