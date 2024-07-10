// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Blueprint/UserWidget.h"
#include "Components/TextBlock.h"
#include "Components/Button.h"

#include "UMR_RAR_GameOver.generated.h"

/**
 * 
 */
UCLASS()
class RUNANDRUN_API UUMR_RAR_GameOver : public UUserWidget
{
	GENERATED_BODY()

public:
	UPROPERTY(BlueprintReadWrite, meta = (BindWidget))
	UTextBlock* GameOverTextBlock;

	UPROPERTY(BlueprintReadWrite, meta = (BindWidget))
	UButton* RestartBtn;

	UPROPERTY(BlueprintReadWrite, meta = (BindWidget))
	UButton* GameOverBtn;


public:
	UFUNCTION()
	void RestartGame();

	UFUNCTION()
	void QuitGame();

protected:

	virtual void NativeConstruct() override;
	
};
