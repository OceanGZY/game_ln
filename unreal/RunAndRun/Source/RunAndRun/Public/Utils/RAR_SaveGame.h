// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/SaveGame.h"
#include "RAR_SaveGame.generated.h"

/**
 * 
 */
UCLASS()
class RUNANDRUN_API URAR_SaveGame : public USaveGame
{
	GENERATED_BODY()

public:
	URAR_SaveGame();

public:
	UPROPERTY(VisibleAnywhere, Category = "SaveGameData")
	float HighScore;
	
};
