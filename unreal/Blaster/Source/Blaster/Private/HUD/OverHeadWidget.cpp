// Fill out your copyright notice in the Description page of Project Settings.


#include "HUD/OverHeadWidget.h"
#include "Components/TextBlock.h"

void UOverHeadWidget::SetDisplayText(FString TextToDisplay)
{
	if (DisplayText) {
		DisplayText->SetText(FText::FromString(TextToDisplay));
	}
}

void UOverHeadWidget::ShowPlayerNetRole(APawn* InPawn)
{
	ENetRole LocalRole = InPawn->GetLocalRole();
	FString Role; 
	switch (LocalRole)
	{
	case ROLE_None:
		break;
	case ROLE_SimulatedProxy:
		break;
	case ROLE_AutonomousProxy:
		break;
	case ROLE_Authority:
		break;
	case ROLE_MAX:
		break;
	default:
		break;
	}
}

void UOverHeadWidget::NativeDestruct()
{
	RemoveFromParent();
	Super::NativeDestruct();
}
