// Fill out your copyright notice in the Description page of Project Settings.


#include "Pickups/RAR_PickupItem.h"
#include "Character/RAR_Character.h"
#include "GameMode/RAR_GameMode.h"
#include "Components/SphereComponent.h"
#include "Components/SceneComponent.h"
#include "Components/StaticMeshComponent.h"
#include "GameFramework/RotatingMovementComponent.h"

// Sets default values
ARAR_PickupItem::ARAR_PickupItem()
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;


	 DefaultSceneRoot= CreateDefaultSubobject<USceneComponent>(TEXT("DefaultSceneRoot"));
	 SetRootComponent(DefaultSceneRoot);

	 SphereComponent = CreateDefaultSubobject<USphereComponent>(TEXT("SphereComponent"));
	 SphereComponent->SetupAttachment(DefaultSceneRoot);

	 StaticMesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("StaticMesh"));
	 StaticMesh->SetupAttachment(SphereComponent);

	 RotatingMovementComponent = CreateDefaultSubobject<URotatingMovementComponent>(TEXT("RotatingMovementComponent"));
	 RotatingMovementComponent->RotationRate = FRotator(0, 180, 0);
}

// Called when the game starts or when spawned
void ARAR_PickupItem::BeginPlay()
{
	Super::BeginPlay();
	
	SphereComponent->OnComponentBeginOverlap.AddDynamic(this, &ARAR_PickupItem::OnPickupItemBeginOverlap);
}

// Called every frame
void ARAR_PickupItem::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

}

void ARAR_PickupItem::OnPickupItemBeginOverlap(UPrimitiveComponent* OverlappedComponent, AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult& SweepResult)
{
	ARAR_Character* RAR_Character = Cast<ARAR_Character>(OtherActor);
	if (RAR_Character == nullptr) {
		return;
	}

	ARAR_GameMode* GameMode = Cast<ARAR_GameMode>(GetWorld()->GetAuthGameMode());
	GameMode->CoinCount++;

	this->Destroy();
}

