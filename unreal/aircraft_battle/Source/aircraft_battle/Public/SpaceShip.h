// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Pawn.h"
#include "SpaceShip.generated.h"
class UStaticMeshComponent;
class USphereComponent;
class UCameraComponent;
class USpringArmComponent;
class ABullet;
class USceneComponent;

UCLASS()
class AIRCRAFT_BATTLE_API ASpaceShip : public APawn
{
	GENERATED_BODY()

public:
	// Sets default values for this pawn's properties
	ASpaceShip();

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

	void LookAtCousor();

	void MoveUpDown(float Value);

	void MoveLeftRight(float Value);

	void Move(float DeltaTime); // pawnû���ƶ��ķ�������Ҫʵ��

	void Fire();

	void StartFire();

	void EndFire();




	APlayerController* Pc;

	UPROPERTY(EditAnywhere, Category = "Fire")
	FTimerHandle TimerHandle_BetweenShot;

	float TimeBetweenShot;

	UPROPERTY(EditAnywhere, Category = "Fire")
	TSubclassOf<ABullet> Bullet;


	UPROPERTY(VisibleAnywhere, Category = "Component")
	USceneComponent* SpawnPoint;


	UPROPERTY(EditAnywhere, Category = "Move")
	float Speed;

	UPROPERTY(VisibleAnywhere,Category="Component")
	UStaticMeshComponent* ShipStaticMeshComp;

	UPROPERTY(VisibleAnywhere, Category = "Component")
	USphereComponent* SphereCollisionComp;

	UPROPERTY(VisibleAnywhere, Category = "Component")
	UCameraComponent* CameraComp;

	UPROPERTY(VisibleAnywhere, Category = "Component")
	USpringArmComponent* SpringArmComp;

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;

	// Called to bind functionality to input
	virtual void SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent) override;

};
