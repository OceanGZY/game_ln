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



	UE_LOG(LogTemp, Warning, TEXT("Velocity value %s"), *Velocity.ToString());
	UE_LOG(LogTemp, Warning, TEXT("Rotation value %s"), *Rotation.ToString());

	UE_LOG(LogTemp, Warning, TEXT("Speed value %f"), Speed);

	UE_LOG(LogTemp, Warning, TEXT("OTPSCharacter->bPressedJump value %s"), (OTPSCharacter->bPressedJump ? TEXT("true") : TEXT("false")));
	UE_LOG(LogTemp, Warning, TEXT("bEnableJump  %s"), (bEnableJump ? TEXT("true") : TEXT("false")));



	if (OTPSCharacter->bJumpBtnDown && !bEnableJump) {
		bEnableJump = true;
	}
	

	UE_LOG(LogTemp, Warning, TEXT("now bEnableJump new  %s"), (bEnableJump ? TEXT("true") : TEXT("false")));

	if (!OTPSCharacter->bJumpBtnDown) {
		bEnableJump = false;
	}

	UE_LOG(LogTemp, Warning, TEXT("now new  bEnableJump new  %s"), (bEnableJump ? TEXT("true") : TEXT("false")));

	
	

	/*if (fabs(Velocity.Z)!=0) {
		bEnableJump = false;
	}*/

	bIsCrouching = OTPSCharacter->bCrouchBtnDown;
}
