// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Character.h"
#include "OTPSCharacter.generated.h"

UCLASS()
class OCEANTPS_API AOTPSCharacter : public ACharacter
{
	GENERATED_BODY()


public:
	// Sets default values for this character's properties
	AOTPSCharacter();


	UPROPERTY(EditAnywhere, Category = Input)
	class UInputMappingContext* DefaultMappingContext;

	UPROPERTY(EditAnywhere, Category = Input)
	class UInputAction* MoveAction;

	UPROPERTY(EditAnywhere, Category = Input)
	class UInputAction* LookAction;

	UPROPERTY(EditAnywhere, Category = Input)
	class UInputAction* JumpAction;


	UPROPERTY(EditAnywhere, Category = Input)
	class UInputAction* FireAction;


	UPROPERTY(BlueprintReadOnly, Category = Movement, meta = (AllowPrivateAccess = "true"))
	bool bCrouchBtnDown;

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

	void Move(const struct FInputActionValue& Value);

	void Look(const struct FInputActionValue& Value);

	void Fire(const struct FInputActionValue& Value);




public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;

	// Called to bind functionality to input
	virtual void SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent) override;


private:
	UPROPERTY(VisibleAnywhere, Category = Camera)
	class USpringArmComponent* CameraArm;

	UPROPERTY(VisibleAnywhere, Category = Camera)
	class UCameraComponent* FollowCarmera;

};
