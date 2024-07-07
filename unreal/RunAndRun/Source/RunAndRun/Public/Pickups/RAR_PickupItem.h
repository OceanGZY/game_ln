// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "RAR_PickupItem.generated.h"

UCLASS()
class RUNANDRUN_API ARAR_PickupItem : public AActor
{
	GENERATED_BODY()
	
public:	
	// Sets default values for this actor's properties
	ARAR_PickupItem();

	UPROPERTY(EditAnywhere)
	class USceneComponent* DefaultSceneRoot;

	UPROPERTY(EditAnywhere)
	class USphereComponent* SphereComponent;

	UPROPERTY(EditAnywhere)
	class UStaticMeshComponent* StaticMesh;

	UPROPERTY(EditAnywhere)
	class URotatingMovementComponent* RotatingMovementComponent;


protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;


	UFUNCTION()
	void OnPickupItemBeginOverlap(
		UPrimitiveComponent* OverlappedComponent,
		AActor* OtherActor,
		UPrimitiveComponent* OtherComp,
		int32 OtherBodyIndex,
		bool bFromSweep,
		const FHitResult& SweepResult
	);

};
