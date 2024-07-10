// Fill out your copyright notice in the Description page of Project Settings.


#include "Blocks/RAR_Block.h"
#include "Character/RAR_Character.h"
#include "Utils/RAR_LegacyCameraShake.h"
#include "GameMode/RAR_GameMode.h"
#include "Components/StaticMeshComponent.h"
#include "Components/BoxComponent.h"
#include "Kismet/KismetMathLibrary.h"
#include "Kismet/KismetSystemLibrary.h"
#include "Kismet/GameplayStatics.h"
#include "Sound/SoundCue.h"


// Sets default values
ARAR_Block::ARAR_Block()
{
	PrimaryActorTick.bCanEverTick = true;

	bLine2CanSpawnCar = true;
	bLine3CanSpawnCar = true;
 
	BoxComponent = CreateDefaultSubobject<UBoxComponent>(TEXT("BoxComponent"));
	SetRootComponent(BoxComponent);
	 
	Lane1 = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Lane1"));
	Lane1->SetupAttachment(BoxComponent);

	Lane2 = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Lane2"));
	Lane2->SetupAttachment(BoxComponent);

	Lane3 = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Lane3"));
	Lane3->SetupAttachment(BoxComponent);

	Lane4 = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Lane4"));
	Lane4->SetupAttachment(BoxComponent);

	SpawnNextBlockBoxComponent = CreateDefaultSubobject<UBoxComponent>(TEXT("SpawnNextBlockBoxComponent"));
	SpawnNextBlockBoxComponent->SetupAttachment(BoxComponent);
	SpawnNextBlockBoxComponent->SetBoxExtent(FVector(800, 35, 400));
	SpawnNextBlockBoxComponent->SetRelativeLocation(FVector(800, -800, 370));

	SpawnNextBlockBoxComponent->SetGenerateOverlapEvents(true);
	SpawnNextBlockBoxComponent->BodyInstance.SetCollisionProfileName(TEXT("OverlapAll"));
	SpawnNextBlockBoxComponent->SetCollisionEnabled(ECollisionEnabled::QueryOnly);

	Obstacle01 = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Obstacle01"));
	Obstacle01->SetupAttachment(BoxComponent);
	Obstacle01->SetRelativeLocation(FVector(200, -440, 0));
	Obstacle01->SetRelativeRotation(FRotator(0,90,0));
	Obstacle01->BodyInstance.SetCollisionProfileName(TEXT("OverlapAllDynamic"));
	Obstacle01->SetCollisionEnabled(ECollisionEnabled::QueryOnly);

	Obstacle02 = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Obstacle02"));
	Obstacle02->SetupAttachment(BoxComponent);
	Obstacle02->SetRelativeLocation(FVector(600, -440, 0));
	Obstacle02->SetRelativeRotation(FRotator(0, 90, 0));
	Obstacle02->BodyInstance.SetCollisionProfileName(TEXT("OverlapAllDynamic"));
	Obstacle02->SetCollisionEnabled(ECollisionEnabled::QueryOnly);

	Obstacle03 = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Obstacle03"));
	Obstacle03->SetupAttachment(BoxComponent);
	Obstacle03->SetRelativeLocation(FVector(1000, -440, 0));
	Obstacle03->SetRelativeRotation(FRotator(0, 90, 0));
	Obstacle03->BodyInstance.SetCollisionProfileName(TEXT("OverlapAllDynamic"));
	Obstacle03->SetCollisionEnabled(ECollisionEnabled::QueryOnly);

	Obstacle04 = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Obstacle04"));
	Obstacle04->SetupAttachment(BoxComponent);
	Obstacle04->SetRelativeLocation(FVector(1400, -440, 0));
	Obstacle04->SetRelativeRotation(FRotator(0, 90, 0));
	Obstacle04->BodyInstance.SetCollisionProfileName(TEXT("OverlapAllDynamic"));
	Obstacle04->SetCollisionEnabled(ECollisionEnabled::QueryOnly);


	Building01 = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Building01"));
	Building01->SetupAttachment(BoxComponent);
	Building01->SetRelativeLocation(FVector(-474, -280, 0));
	Building01->SetRelativeRotation(FRotator(0, 180, 0));
	Building01->BodyInstance.SetCollisionProfileName(TEXT("BlockAll"));
	Building01->SetCollisionEnabled(ECollisionEnabled::QueryOnly);


	Building02 = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Building02"));
	Building02->SetupAttachment(BoxComponent);
	Building02->SetRelativeLocation(FVector(2083, -520, 0));
	Building02->SetRelativeRotation(FRotator(0, 0, 0));
	Building02->BodyInstance.SetCollisionProfileName(TEXT("BlockAll"));
	Building02->SetCollisionEnabled(ECollisionEnabled::QueryOnly);


}

// Called when the game starts or when spawned
void ARAR_Block::BeginPlay()
{
	Super::BeginPlay();

	SpawnNextBlockBoxComponent->OnComponentBeginOverlap.AddDynamic(this, &ARAR_Block::OnSpwanNextBoxOverlap);

	Obstacle01->OnComponentBeginOverlap.AddDynamic(this, &ARAR_Block::OnObstacleBeginOverlap);
	Obstacle02->OnComponentBeginOverlap.AddDynamic(this, &ARAR_Block::OnObstacleBeginOverlap);
	Obstacle03->OnComponentBeginOverlap.AddDynamic(this, &ARAR_Block::OnObstacleBeginOverlap);
	Obstacle04->OnComponentBeginOverlap.AddDynamic(this, &ARAR_Block::OnObstacleBeginOverlap);

	ARAR_Block* TempBlock = CheckFrontBlock();
	if (TempBlock != nullptr) {
		UE_LOG(LogTemp, Log, TEXT(" TempBlock != nullptr"));
		ARAR_GameMode* RAR_GameMode = Cast<ARAR_GameMode>(GetWorld()->GetAuthGameMode());
		UE_LOG(LogTemp, Log, TEXT("Obstacle02->GetStaticMesh().GetName() %s"), *TempBlock->Obstacle02->GetStaticMesh().GetName());
		if (TempBlock->Obstacle02->GetStaticMesh() == RAR_GameMode->TruckTrailer) {
			UE_LOG(LogTemp, Log, TEXT(" TempBlock->Obstacle02->GetStaticMesh() == TruckTrailer"));
			bLine2CanSpawnCar = false;
		}

		if (TempBlock->Obstacle03->GetStaticMesh() == RAR_GameMode->TruckTrailer) {
			UE_LOG(LogTemp, Log, TEXT(" TempBlock->Obstacle03->GetStaticMesh() == TruckTrailer"));
			bLine3CanSpawnCar = false;
		}
	}
	
	SpawnObstacle();
	SpawnBuilding();

	const FLatentActionInfo LatentInfo(0, FMath::Rand(), TEXT("DelayToDestroy"), this);
	UKismetSystemLibrary::Delay(this, 25.f, LatentInfo);
}

// Called every frame
void ARAR_Block::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

	// 汽车障碍的移动
	FVector Obstacle02_OldVec =UKismetMathLibrary::TransformLocation(GetActorTransform(), Obstacle02->GetRelativeLocation());
	FVector Obstacle03_OldVec = UKismetMathLibrary::TransformLocation(GetActorTransform(), Obstacle03->GetRelativeLocation());

	Obstacle02->SetWorldLocation(FVector(Obstacle02_OldVec.X, Obstacle02_OldVec.Y - 6, Obstacle02_OldVec.Z));
	Obstacle03->SetWorldLocation(FVector(Obstacle03_OldVec.X, Obstacle03_OldVec.Y - 6, Obstacle03_OldVec.Z));

}

void ARAR_Block::OnSpwanNextBoxOverlap(UPrimitiveComponent* OverlappedComponent, AActor* OtherActor, UPrimitiveComponent* OterComp, int32 OtherBodyIndex, bool bFromSweep,
	const FHitResult& SweepResult)
{
	//UE_LOG(LogTemp,Log, TEXT("OnSpwanNextBoxOverlap"));

	ARAR_Character* RAR_Character = Cast<ARAR_Character>(OtherActor);

	if (RAR_Character == nullptr) {
		return;
	}

	ARAR_GameMode* RAR_GameMode = Cast<ARAR_GameMode>(GetWorld()->GetAuthGameMode());
	RAR_GameMode->AddBlock(false);

	

}

void ARAR_Block::OnObstacleBeginOverlap(UPrimitiveComponent* OverlappedComponent, AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult& SweepResult)
{
	ARAR_Character* RAR_Character = Cast<ARAR_Character>(OtherActor);

	if (RAR_Character == nullptr) {
		return;
	}
	HitPlayer(RAR_Character);
}

void ARAR_Block::DelayToDestroy()
{
	this->Destroy();
}

void ARAR_Block::SpawnObstacle()
{
	SpawnStreetObstacle(Obstacle01);
	if (bLine2CanSpawnCar) {
		SpawnStreetCarObstacle(Obstacle02);
	}

	if (bLine3CanSpawnCar) {
		SpawnStreetCarObstacle(Obstacle03);
	}
	SpawnStreetObstacle(Obstacle04);


}

void ARAR_Block::SpawnStreetObstacle(UStaticMeshComponent* Obstacle)
{
	int temp = FMath::RandRange(0, 4);
	ARAR_GameMode* RAR_GameMode = Cast<ARAR_GameMode>(GetWorld()->GetAuthGameMode());
	if (temp == 0) {
		// 读取static mesh资源
		int i = FMath::RandRange(0, RAR_GameMode->ObstacleMeshes.Num()-1);
		UStaticMesh* MeshObj = RAR_GameMode->ObstacleMeshes[i];
		if (MeshObj) {
			Obstacle->SetStaticMesh(MeshObj);
		}
	}
	else if(temp == 1) {
		RAR_GameMode->SpawnCoin(Obstacle->GetComponentLocation() + FVector(0, 0, 100), FRotator(0, 180, 0));
	}
}

void ARAR_Block::SpawnStreetCarObstacle(UStaticMeshComponent* Obstacle)
{
	int temp = FMath::RandRange(0, 4);
	ARAR_GameMode* RAR_GameMode = Cast<ARAR_GameMode>(GetWorld()->GetAuthGameMode());
	if (temp == 0) {
		
		// 读取static mesh资源
		//UE_LOG(LogTemp, Log, TEXT("%d RAR_GameMode->ObstacleCarMeshes.Num()"), RAR_GameMode->ObstacleCarMeshes.Num());
		int i = FMath::RandRange(0, RAR_GameMode->ObstacleCarMeshes.Num() - 1);
		UStaticMesh* MeshObj = RAR_GameMode->ObstacleCarMeshes[i];
		if (MeshObj) {
			Obstacle->SetRelativeScale3D(FVector(0.8, 0.8, 0.8));
			Obstacle->SetStaticMesh(MeshObj);
		}
	}
	else if (temp == 1) {
		RAR_GameMode->SpawnCoin(Obstacle->GetComponentLocation() + FVector(0, 0, 100), FRotator(0, 180, 0));
	}
}

void ARAR_Block::SpawnBuilding()
{
	SpawnStreetBuilding(Building01);
	SpawnStreetBuilding(Building02);
}

void ARAR_Block::SpawnStreetBuilding(UStaticMeshComponent* Building)
{
	ARAR_GameMode* RAR_GameMode = Cast<ARAR_GameMode>(GetWorld()->GetAuthGameMode());
	int i = FMath::RandRange(0, RAR_GameMode->BuildingMeshes.Num() - 1);
	UStaticMesh* MeshObj = RAR_GameMode->BuildingMeshes[i];
	if (MeshObj) {
		Building->SetRelativeScale3D(FVector(0.5, 0.44, 0.5));
		Building->SetStaticMesh(MeshObj);
	}
}

ARAR_Block* ARAR_Block::CheckFrontBlock()
{
	// 要忽略的物体
	TArray<AActor*> IgnoreActors;
	FHitResult HitResult;	
	ARAR_Block* TempBlock = nullptr;

	UKismetSystemLibrary::LineTraceSingle(
		GetWorld(),
		GetActorLocation(),
		FVector(GetActorLocation().X-400 + GetActorRightVector().X * (800.0), GetActorLocation().Y + GetActorRightVector().Y * (800.0), GetActorLocation().Z + GetActorRightVector().Z * (800.0)),
		TraceTypeQuery1,
		false,
		IgnoreActors,
		EDrawDebugTrace::ForDuration,
		HitResult,
		true
		);

	UE_LOG(LogTemp, Log, TEXT("GetActorLocation %f %f %f"), GetActorLocation().X, GetActorLocation().Y, GetActorLocation().Z);
	UE_LOG(LogTemp, Log, TEXT("GetActorRightVector %f %f %f"), GetActorRightVector().X, GetActorRightVector().Y, GetActorRightVector().Z);
	UE_LOG(LogTemp, Log, TEXT("End %f %f %f"), GetActorLocation().X + GetActorRightVector().X * (-400.0), GetActorLocation().Y + GetActorRightVector().Y * (-400.0), GetActorLocation().Z + GetActorRightVector().Z * (-400.0));


	TempBlock = Cast<ARAR_Block>(HitResult.GetActor());

	return TempBlock;
	
}

void ARAR_Block::HitPlayer(ARAR_Character* Player)
{
	PlayerHited = Player;
	Player->HitCounts++;
	FString BPCameramShakekPath = FString(TEXT("Blueprint'/Game/Blueprints/Utils/BP_RAR_CameraShake.BP_RAR_CameraShake_C'"));
	UClass* BPCameramShakekClass = LoadClass<URAR_LegacyCameraShake>(nullptr, *BPCameramShakekPath);
	GetWorld()->GetFirstPlayerController()->ClientStartCameraShake(BPCameramShakekClass);
	USoundCue* HitSound = LoadObject<USoundCue>(this, TEXT("SoundCue'/Game/Sounds/hitobstacle_Cue.hitobstacle_Cue'"));
	UGameplayStatics::PlaySoundAtLocation(this, HitSound, GetActorLocation());
}