// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/GameModeBase.h"
#include "ShapeGameModeBase.generated.h"

/**
 * 
 */
UCLASS()
class AIRCRAFT_BATTLE_API AShapeGameModeBase : public AGameModeBase
{
	GENERATED_BODY()
	
protected:
	AShapeGameModeBase();

	UPROPERTY(BlueprintReadOnly)
	int Score;

public:
	void IncreaseScore();
};
