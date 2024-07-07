// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/GameMode.h"
#include "RAR_GameMode.generated.h"

/**
 * 
 */
UCLASS()
class RUNANDRUN_API ARAR_GameMode : public AGameMode
{
	GENERATED_BODY()

public:

	ARAR_GameMode();

	UFUNCTION(BlueprintCallable)
	virtual void AddBlock(bool bInit=true);

	UPROPERTY(EditAnywhere, BlueprintReadOnly)
	int LastBlock;

	UPROPERTY(VisibleAnywhere, Category = "ObstacleMesh")
	TArray<UStaticMesh*> ObstacleMeshes;

	UPROPERTY(VisibleAnywhere, Category = "ObstaclCarMesh")
	TArray<UStaticMesh*> ObstacleCarMeshes;

	TArray<UStaticMesh*> BuildingMeshes;

	UStaticMesh* TruckTrailer;

	float RunDistance;
	int32 CoinCount;
	
protected:
	virtual void BeginPlay();

public:
	void SpawnCoin(FVector Location,FRotator Rotator);

	UFUNCTION()
	void DoSaveGame();

	UFUNCTION()
	void SaveGameData();
};
