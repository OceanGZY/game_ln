// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Animation/AnimInstance.h"
#include "OTPSCharacterAnimInstance.generated.h"

/**
 * 
 */
UCLASS()
class OCEANTPS_API UOTPSCharacterAnimInstance : public UAnimInstance
{
	GENERATED_BODY()
	

public:
	virtual void NativeInitializeAnimation() override;
	virtual void NativeUpdateAnimation(float DeltaTime) override;


private:
	UPROPERTY(BlueprintReadOnly, Category = Character, meta = (AllowPrivateAccess = "true"))
	class AOTPSCharacter* OTPSCharacter;

	UPROPERTY(BlueprintReadOnly, Category = Movement, meta = (AllowPrivateAccess = "true"))
	float Speed;

	UPROPERTY(BlueprintReadOnly, Category = Movement, meta = (AllowPrivateAccess = "true"))
	float Direction;


	UPROPERTY(BlueprintReadOnly, Category = Movement, meta = (AllowPrivateAccess = "true"))
	bool bIsCrouching;


	UPROPERTY(BlueprintReadWrite, Category = Movement, meta = (AllowPrivateAccess = "true"))
	bool bEnableJump;
};
