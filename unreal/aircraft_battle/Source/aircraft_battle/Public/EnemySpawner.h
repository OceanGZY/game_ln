// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "EnemySpawner.generated.h"
class AEnemy;
class UBoxComponent;
class ASpaceShip;

UCLASS()
class AIRCRAFT_BATTLE_API AEnemySpawner : public AActor
{
	GENERATED_BODY()
	
public:	
	// Sets default values for this actor's properties
	AEnemySpawner();

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

	FVector GetGenerateLocation();

	void SpawnEnemy(); // 生成敌人

	UPROPERTY(EditAnywhere, Category = "Enemy")
	TSubclassOf<AEnemy> Enemy;

	UPROPERTY(VisibleAnywhere, Category = "Component")
	UBoxComponent* SpawnArea;

	float MinimumDistanceToPlayer;

	ASpaceShip* SpaceShip;

	FTimerHandle TimerHandle_Spawn; // 定时器
	
	float SpawnInterval; // 时间间隔

	// 最大敌人生成数量
	UPROPERTY(EditAnywhere,Category="Spawn")
	int MaxEnemyNum;

	// 当前敌人生成数量
	UPROPERTY(EditAnywhere, Category = "Spawn")
	int CurrentEnemyCount;

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;
	
	void DecreaseEnemyCount(); // 减少敌人数量

};
