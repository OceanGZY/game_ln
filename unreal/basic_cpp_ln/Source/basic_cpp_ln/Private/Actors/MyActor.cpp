// Fill out your copyright notice in the Description page of Project Settings.


#include "Actors/MyActor.h"

#include "Components/StaticMeshComponent.h"

// Sets default values
AMyActor::AMyActor()
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

	StaticMesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("StaticMesh"));

	TickLocationOffset = FVector(0.0f);
	InitLocation = FVector(0.0f);
	PlacedLocation = FVector(0.0f);
	WorldOriginLocation = FVector(0.0f);
	TickLocationOffset = FVector(0.0f);

	bGoToInitLocation = false;
	bShouldMove = false;

	InitForece = FVector(0.0f);
	InitTorque = FVector(0.0f);
}

// Called when the game starts or when spawned
void AMyActor::BeginPlay()
{
	Super::BeginPlay();

	PlacedLocation = GetActorLocation();
	if (bGoToInitLocation)
	{
		SetActorLocation(InitLocation);
	}

	//StaticMesh->AddForce(InitForece, "NAME_None", false);
	//UE_LOG(LogTemp, Log, TEXT("add force "));

	//StaticMesh->AddTorqueInDegrees(InitTorque, "NAME_None", false);
	//UE_LOG(LogTemp, Log, TEXT("add torque"));
	
}

// Called every frame
void AMyActor::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
	if (bShouldMove)
	{
		FHitResult HitResult; // save hit result
		AddActorLocalOffset(TickLocationOffset, true, &HitResult); //when hit somebody ,HitResult will have value
		UE_LOG(LogTemp, Log, TEXT("X: %f,Y: %f,Z:%f"), HitResult.Location.X, HitResult.Location.Y, HitResult.Location.Z);
	}

}

