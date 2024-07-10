// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/HUD.h"
#include "UI/UMR_RAR_GameOver.h"
#include "RAR_PlayerHud.generated.h"

/**
 * 
 */
UCLASS()
class RUNANDRUN_API ARAR_PlayerHud : public AHUD
{
	GENERATED_BODY()

public:

	virtual void BeginPlay() override;

	virtual void Tick(float DeltaTime) override;

	UPROPERTY()
	class UUMG_RAR_PlayerState* UMG_RAR_PlayerState;

	UPROPERTY()
	UUMR_RAR_GameOver* UMR_RAR_GameOver;

};
