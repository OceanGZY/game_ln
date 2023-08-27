// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Character.h"
#include "MuffinCharacter.generated.h"

UCLASS()
class MUFFIN_API AMuffinCharacter : public ACharacter
{
	GENERATED_BODY()

public:
	// Sets default values for this character's properties
	AMuffinCharacter();

protected:

	APlayerController* Pc;
	FVector LaunchVelocity;

	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
	
	void MoveTowardCursor(); // 朝向鼠标移动

	void LaunchOnAnyKeyPressed(); // 按任意键跳跃

	void SetSpeed(); // 设置速度

	void GameOver();

	UFUNCTION(BlueprintCallable)
	void ReStart();

	UFUNCTION(BlueprintImplementableEvent)
	void DisplayReStart();

	UPROPERTY(BlueprintReadOnly, Category = "Show")
	bool bDead;

	bool bGameStarted;

	UPROPERTY(EditAnywhere,Category="Speed")
	float AirSpeed;
	UPROPERTY(EditAnywhere, Category = "Speed")
	float GroundSpeed;

	int Score;

	

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;

	// Called to bind functionality to input
	virtual void SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent) override;

	void Launch(); // 碰到云彩跳跃

	void InCreaseScore(); // 加分

	int GetScore() const; // 获取分数
};
