// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "GameCamera.generated.h"

UCLASS()
class MUFFIN_API AGameCamera : public AActor
{
	GENERATED_BODY()
	
public:	
	// Sets default values for this actor's properties
	AGameCamera();

protected:
	UPROPERTY(VisibleAnyWhere, Category = "Componenets");
	class UCameraComponent* CameraComp;

	UPROPERTY(VisibleAnywhere, Category = "Componenets")
	class UBoxComponent* DestroyArea;

	APlayerController* Pc;

	class AMuffinCharacter* MuffinCharacter;

	// Called when the game starts or when spawned
	virtual void BeginPlay() override;


	void MoveCamera();

	UPROPERTY(BlueprintReadWrite, Category = "Componenets")
	bool bFollowPlayer;

	void CheckIfFalling(); // 检查是否在下落

	UFUNCTION(BlueprintImplementableEvent)
	void UpdateTimer(); // 更新时间轴

	UFUNCTION(BlueprintImplementableEvent)
	void ResetTimer(); // 重置时间轴

	UFUNCTION(BlueprintCallable)
	void OnSureFalling(); // 确认在持续下落

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;

	virtual void NotifyActorBeginOverlap(AActor* OtherActor) override;

};
