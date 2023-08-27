// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "CloudSpawner.generated.h"

UCLASS()
class MUFFIN_API ACloudSpawner : public AActor
{
	GENERATED_BODY()
	
public:	
	// Sets default values for this actor's properties
	ACloudSpawner();

protected:
	UPROPERTY(VisibleAnywhere, Category = "SpawnComponent")
		class UBoxComponent* SpawnArea;

	UPROPERTY(VisibleAnywhere, Category = "SpawnComponent")
		class UBoxComponent* TriggerArea;

	UPROPERTY(VisibleAnywhere, Category = "Component")
		USceneComponent* DefaultRootComponent;

	UPROPERTY(EditAnywhere, Category = "Cloud")
		TSubclassOf<class ACloud> Cloud; // 限制 只能赋值 ACloud或其子类

	class AMuffinCharacter* MuffinCharacter;

	UPROPERTY(EditAnywhere, Category = "Cloud")
		int InitialSpawnAmout;

	UPROPERTY(EditAnywhere, Category = "Cloud")
		float SpawnSpacing;

	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

	void SpawnCloud();

	UFUNCTION(BlueprintCallable)
	void Reset();

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;

	virtual void NotifyActorBeginOverlap(AActor* OtherActor) override; // 碰撞检测

};
