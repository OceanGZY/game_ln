// Fill out your copyright notice in the Description page of Project Settings.


#include "Character/OTPSCharacterAnimInstance.h"
#include "Character/OTPSCharacter.h"
#include "GameFramework/CharacterMovementComponent.h"


void UOTPSCharacterAnimInstance::NativeInitializeAnimation()
{
	Super::NativeInitializeAnimation();

	OTPSCharacter = Cast<AOTPSCharacter>(TryGetPawnOwner());

}

void UOTPSCharacterAnimInstance::NativeUpdateAnimation(float DeltaTime)
{
	Super::NativeUpdateAnimation(DeltaTime);

	if (OTPSCharacter == nullptr) {
		OTPSCharacter = Cast<AOTPSCharacter>(TryGetPawnOwner());
	}

	if (OTPSCharacter == nullptr) return;

	FVector Velocity = OTPSCharacter->GetVelocity();
	FRotator Rotation = OTPSCharacter->GetActorRotation();

	Speed = Velocity.Length();
	Direction = CalculateDirection(Velocity, Rotation);

	if (OTPSCharacter->bPressedJump && !bEnableJump) {
		bEnableJump = true;
	}

	/*if (fabs(Velocity.Z)!=0) {
		bEnableJump = false;
	}*/

	bIsCrouching = OTPSCharacter->bCrouchBtnDown;
}
