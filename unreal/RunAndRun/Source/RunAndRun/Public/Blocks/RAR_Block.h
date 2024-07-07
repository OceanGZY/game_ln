// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "RAR_Block.generated.h"

class UBoxComponent;
class UStaticMeshComponent;
class ARAR_Character;

UCLASS()
class RUNANDRUN_API ARAR_Block : public AActor
{
	GENERATED_BODY()
	

public:	
	// Sets default values for this actor's properties
	ARAR_Block();


	UPROPERTY(VisibleAnywhere,  Category = "Block")
	UBoxComponent* BoxComponent;

	UPROPERTY(VisibleAnywhere, Category = "Block")
	UStaticMeshComponent* Lane1;

	UPROPERTY(VisibleAnywhere, Category = "Block")
	UStaticMeshComponent* Lane2;

	UPROPERTY(VisibleAnywhere, Category = "Block")
	UStaticMeshComponent* Lane3;

	UPROPERTY(VisibleAnywhere,Category = "Block")
	UStaticMeshComponent* Lane4;

	UPROPERTY(VisibleAnywhere, Category = "Spawn Block")
	UBoxComponent* SpawnNextBlockBoxComponent;

	UPROPERTY(VisibleAnywhere, Category = "Obstacle")
	UStaticMeshComponent* Obstacle01;

	UPROPERTY(VisibleAnywhere, Category = "Obstacle")
	UStaticMeshComponent* Obstacle02;

	UPROPERTY(VisibleAnywhere, Category = "Obstacle")
	UStaticMeshComponent* Obstacle03;

	UPROPERTY(VisibleAnywhere, Category = "Obstacle")
	UStaticMeshComponent* Obstacle04;

	UPROPERTY(EditAnywhere, Category = "Obstacle Car")
	bool bLine2CanSpawnCar;

	UPROPERTY(EditAnywhere, Category = "Obstacle Car")
	bool bLine3CanSpawnCar;

	UPROPERTY(EditAnywhere, Category = "Building")
	UStaticMeshComponent* Building01;

	UPROPERTY(EditAnywhere, Category = "Building")
	UStaticMeshComponent* Building02;
	

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;

	UFUNCTION()
	void OnSpwanNextBoxOverlap(UPrimitiveComponent* OverlappedComponent,
		AActor* OtherActor,    //触发时间的主体，通常是控制的人
		UPrimitiveComponent* OterComp,
		int32 OtherBodyIndex,
		bool bFromSweep, 
		const FHitResult& SweepResult);

	UFUNCTION()
	void OnObstacleBeginOverlap(UPrimitiveComponent* OverlappedComponent,
		AActor* OtherActor,
		UPrimitiveComponent* OtherComp,
		int32 OtherBodyIndex,
		bool bFromSweep,
		const FHitResult& SweepResult
	);



	UFUNCTION()
	void DelayToDestroy();


	UFUNCTION()
	void SpawnObstacle();

	UFUNCTION()
	void SpawnStreetObstacle(UStaticMeshComponent * Obstacle);


	UFUNCTION()
	void SpawnStreetCarObstacle(UStaticMeshComponent* Obstacle);


	UFUNCTION()
	void SpawnBuilding();


	UFUNCTION()
	void SpawnStreetBuilding(UStaticMeshComponent* Building);

	UFUNCTION()
	ARAR_Block* CheckFrontBlock();

	UFUNCTION()
	void HitPlayer(ARAR_Character* Player);


private:
	ARAR_Character* PlayerHited;
};
