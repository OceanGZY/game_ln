// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Pawn.h"
#include "Enemy.generated.h"
class UStaticMeshComponent;
class USphereComponent;
class ASpaceShip;

UCLASS()
class AIRCRAFT_BATTLE_API AEnemy : public APawn
{
	GENERATED_BODY()

public:
	// Sets default values for this pawn's properties
	AEnemy();

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

	void MoveTowardPlayer(float DeltaTime); // ³¯Ö÷½ÇÒÆ¶¯


	ASpaceShip* Player;

	float Speed;

	UPROPERTY(VisibleAnywhere, Category = "Component")
	UStaticMeshComponent* ShipStaticMeshComp;

	UPROPERTY(VisibleAnywhere, Category = "Component")
	USphereComponent* SphereCollisionComp;

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;

	// Called to bind functionality to input
	virtual void SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent) override;

};
