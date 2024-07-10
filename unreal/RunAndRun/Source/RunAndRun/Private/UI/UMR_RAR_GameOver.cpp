// Fill out your copyright notice in the Description page of Project Settings.


#include "UI/UMR_RAR_GameOver.h"
#include "Kismet/GameplayStatics.h"
#include "Kismet/KismetSystemLibrary.h"

void UUMR_RAR_GameOver::RestartGame()
{
	FString Name = UGameplayStatics::GetCurrentLevelName(GetWorld());
	UGameplayStatics::OpenLevel(GetWorld(), FName(Name));
	UGameplayStatics::GetPlayerController(this, 0)->bShowMouseCursor = false; // ÏÔÊ¾Êó±ê
	FInputModeGameOnly InputMode;
	UGameplayStatics::GetPlayerController(this, 0)->SetInputMode(InputMode);
}

void UUMR_RAR_GameOver::QuitGame()
{
	UKismetSystemLibrary::QuitGame(this, nullptr, EQuitPreference::Quit, true);
}

void UUMR_RAR_GameOver::NativeConstruct()
{
	Super::NativeConstruct();

	RestartBtn->OnClicked.AddDynamic(this, &UUMR_RAR_GameOver::RestartGame);
	GameOverBtn->OnClicked.AddDynamic(this, &UUMR_RAR_GameOver::QuitGame);
}
