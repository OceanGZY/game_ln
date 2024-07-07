// Copyright Epic Games, Inc. All Rights Reserved.

#include "RunAndRunGameMode.h"
#include "RunAndRunCharacter.h"
#include "UObject/ConstructorHelpers.h"

ARunAndRunGameMode::ARunAndRunGameMode()
{
	// set default pawn class to our Blueprinted character
	//static ConstructorHelpers::FClassFinder<APawn> PlayerPawnBPClass(TEXT("/Game/ThirdPerson/Blueprints/BP_ThirdPersonCharacter"));
	//if (PlayerPawnBPClass.Class != NULL)
	//{
	//	DefaultPawnClass = PlayerPawnBPClass.Class;
	//}
}
