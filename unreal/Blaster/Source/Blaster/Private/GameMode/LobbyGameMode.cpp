// Fill out your copyright notice in the Description page of Project Settings.


#include "GameMode/LobbyGameMode.h"
#include "GameFramework/GameStateBase.h"
void ALobbyGameMode::PostLogin(APlayerController* NewPlayer)
{
	Super::PostLogin(NewPlayer);

	int32 NumberOfPlayers = GameState.Get()->PlayerArray.Num();
	if (GEngine) {
		GEngine->AddOnScreenDebugMessage(
			-1,
			15.f,
			FColor::Blue,
			FString::FromInt(NumberOfPlayers)
		);
	}
	if (NumberOfPlayers == 1)  // 如果玩家超过2个，则跳转到游戏内
	{
		UWorld* World = GetWorld();
		if (World) {
			GEngine->AddOnScreenDebugMessage(
				-1,
				15.f,
				FColor::Blue,
				FString::Printf(TEXT("create world"))
			);
			bUseSeamlessTravel = true;
			bool bIsTravel = World->ServerTravel("/Game/Maps/Map_Blaster?listen");
			
			if (bIsTravel==true) {
				GEngine->AddOnScreenDebugMessage(
					-1,
					15.f,
					FColor::Red,
					FString::Printf(TEXT("tiaozhuan"))
				);
			}
			else if(bIsTravel == false){
				GEngine->AddOnScreenDebugMessage(
					-1,
					15.f,
					FColor::Red,
					FString::Printf(TEXT("bu tiaozhuan"))
				);
			}
			else {
				GEngine->AddOnScreenDebugMessage(
					-1,
					15.f,
					FColor::Red,
					FString::Printf(TEXT("chu xian error"))
				);
			}
		}
	}
}
