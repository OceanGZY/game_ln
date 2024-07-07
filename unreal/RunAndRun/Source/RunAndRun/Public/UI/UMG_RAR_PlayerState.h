// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Blueprint/UserWidget.h"
#include "Components/TextBlock.h"
#include "UMG_RAR_PlayerState.generated.h"


/**
 * 
 */
UCLASS()
class RUNANDRUN_API UUMG_RAR_PlayerState : public UUserWidget
{
	GENERATED_BODY()
	

public:
	UPROPERTY(BlueprintReadWrite, meta = (BindWidget))
	UTextBlock* MTextBlock;

	UPROPERTY(BlueprintReadWrite, meta = (BindWidget))
	UTextBlock* CoinTextBlock;

public:
	UFUNCTION()
	void SetDisplayMText();

	UFUNCTION()
	void SetDisplayCoinText();

protected:
	virtual void NativeConstruct() override;
};
