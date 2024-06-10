// Fill out your copyright notice in the Description page of Project Settings.


#include "GameMode/OTPSLobbyGameMode.h"
#include "GameFramework/GameStateBase.h"

void AOTPSLobbyGameMode::PostLogin(APlayerController* NewPlayer)
{
	Super::PostLogin(NewPlayer);

	int32 NumberOfPlayers = GameState.Get()->PlayerArray.Num();

	if (NumberOfPlayers == 1) {
		UWorld* World = GetWorld();
		if (World) {
			bUseSeamlessTravel = true;
			World->ServerTravel(FString("/Game/Maps/OTPSMap?listen"));
		}
	}
}
