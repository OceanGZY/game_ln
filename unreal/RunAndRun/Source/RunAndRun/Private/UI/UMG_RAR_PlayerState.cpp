// Fill out your copyright notice in the Description page of Project Settings.


#include "UI/UMG_RAR_PlayerState.h"
#include "GameMode/RAR_GameMode.h"

void UUMG_RAR_PlayerState::SetDisplayMText()
{
	ARAR_GameMode* GameMode = Cast<ARAR_GameMode>(GetWorld()->GetAuthGameMode());
	//UE_LOG(LogTemp, Log, TEXT("SetDisplayMText game mode run dist: %f"), GameMode->RunDistance);
	MTextBlock->SetText(FText::FromString(FString::FromInt((int32)GameMode->RunDistance)+" m"));
}

void UUMG_RAR_PlayerState::SetDisplayCoinText()
{
	ARAR_GameMode* GameMode = Cast<ARAR_GameMode>(GetWorld()->GetAuthGameMode());
	CoinTextBlock->SetText(FText::FromString(FString::FromInt(GameMode->CoinCount)+" Coin"));
}

void UUMG_RAR_PlayerState::SetDisplayHighScoreText()
{
	ARAR_GameMode* GameMode = Cast<ARAR_GameMode>(GetWorld()->GetAuthGameMode());
	HighScoreTextBlock->SetText(FText::FromString(FString::FromInt(GameMode->HighScore) + " m"));
}

void UUMG_RAR_PlayerState::NativeConstruct()
{
	Super::NativeConstruct();
}
