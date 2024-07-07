// Fill out your copyright notice in the Description page of Project Settings.


#include "UI/RAR_PlayerHud.h"
#include "UI/UMG_RAR_PlayerState.h"
#include "Blueprint/UserWidget.h"
#include "Blueprint/WidgetBlueprintLibrary.h"

void ARAR_PlayerHud::BeginPlay()
{
	Super::BeginPlay();
	UE_LOG(LogTemp, Warning, TEXT("Fast UMG"));
	
	FString UMG_RAR_PlayerStatePath = FString(TEXT("Blueprint'/Game/Blueprints/HUD/UI/BP_UMG_PlayerState.BP_UMG_PlayerState_C'"));
	UClass* UMG_RAR_PlayerStateClass = LoadClass<UUMG_RAR_PlayerState>(nullptr, *UMG_RAR_PlayerStatePath);
	if (UMG_RAR_PlayerStateClass != nullptr) {
		UMG_RAR_PlayerState = Cast<UUMG_RAR_PlayerState>(UWidgetBlueprintLibrary::Create(GetWorld(), UMG_RAR_PlayerStateClass, nullptr));
		if (UMG_RAR_PlayerState != nullptr) {
			UMG_RAR_PlayerState->AddToViewport();
		}
	}
}

void ARAR_PlayerHud::Tick(float DeltaTime)
{
	UMG_RAR_PlayerState->SetDisplayMText();
	UMG_RAR_PlayerState->SetDisplayCoinText();
}
