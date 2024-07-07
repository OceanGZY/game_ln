// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Character.h"
#include "Components/TimelineComponent.h"
#include "RAR_Character.generated.h"

class USpringArmComponent;
class UCameraComponent;
class UInputMappingContext;
class UInputAction;
struct FInputActionValue;
class USkeletalMeshComponent;


UCLASS(config = Game)
class RUNANDRUN_API ARAR_Character : public ACharacter
{
	GENERATED_BODY()


public:
	// Sets default values for this character's properties
	ARAR_Character();


private:
	/** Camera boom positioning the camera behind the character */
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = Camera, meta = (AllowPrivateAccess = "true"))
	USpringArmComponent* CameraBoom;

	/** Follow camera */
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = Camera, meta = (AllowPrivateAccess = "true"))
	UCameraComponent* FollowCamera;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "FollowAI", meta = (AllowPrivateAccess = "true"))
	USpringArmComponent* FollowAiArm;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "FollowAI", meta = (AllowPrivateAccess = "true"))
	USkeletalMeshComponent* FollowAi;


	/** MappingContext */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = Input, meta = (AllowPrivateAccess = "true"))
	UInputMappingContext* DefaultMappingContext;

	/** Jump Input Action */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = Input, meta = (AllowPrivateAccess = "true"))
	UInputAction* JumpAction;


	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = Input, meta = (AllowPrivateAccess = "true"))
	UInputAction* LeftMoveAction;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = Input, meta = (AllowPrivateAccess = "true"))
	UInputAction* RightMoveAction;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = Input, meta = (AllowPrivateAccess = "true"))
	UInputAction* SlideMoveAction;




	float TargetX;
	float FollowX;
	float FollowZ;

	FVector StartLocation;
	float FollowAIArmSpeed;

	float CapsuleHeight;

	bool bCanScaleCapsule;



protected:
	/** Called for movement input */
	void MoveRight(const FInputActionValue& Value);

	/** Called for looking input */
	void MoveLeft(const FInputActionValue& Value);

	void SlideMove(const FInputActionValue& Value);

	void DoJump();

	// �������߶��� (**)
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	UCurveFloat* SlideCurver;
	
	// ����Timeline����
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	UTimelineComponent* SlideTimeline;

	//ί�н�����������¼��ĺ�����ǩ����
	FOnTimelineEvent SlideTimelineFinishedEvent;

	UFUNCTION()
	void SlideTimelineFinishedFunction();

	//ί�н������¼����еĺ�����ǩ����
	FOnTimelineFloat SlideTimelineClickEvent;

	UFUNCTION()
	void SlideTimelineClickedFunction(float value);
	

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

public:
	// Called every frame
	virtual void Tick(float DeltaTime) override;

	// Called to bind functionality to input
	virtual void SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent) override;

	UFUNCTION()
	bool UpdateFollowAIArmLength(float DeltaTime);

	UFUNCTION()
	void RemoveHit();

	UFUNCTION()
	void ChangeCapsuleCollision();



	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Move")
	bool bIsSlide;

	int32 HitCounts;



};
