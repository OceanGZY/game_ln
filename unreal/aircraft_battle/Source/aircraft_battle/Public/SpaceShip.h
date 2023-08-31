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
class USoundCue;

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

	void ReStartLevel();

	void OnDead(); // 主角死亡


	APlayerController* Pc;

	bool bDead;

	bool bUpDownMove;

	bool bLeftRightMove;


	UPROPERTY(EditAnywhere, Category = "Sound")
	USoundCue* GameOverCue;
	UPROPERTY(EditAnywhere, Category = "Sound")
	USoundCue* ShotCue;


	UPROPERTY(EditAnywhere, Category = "Fire")
	FTimerHandle TimerHandle_BetweenShot;


	UPROPERTY(EditAnywhere, Category = "GameState")
	FTimerHandle TimerHandle_ReStart;


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

	UPROPERTY(VisibleAnywhere, Category = "Component")
	UParticleSystemComponent* ThrusterParticleComp;

	UPROPERTY(EditAnywhere, Category = "Particle")
	UParticleSystem* ExploseParticle;

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;

	// Called to bind functionality to input
	virtual void SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent) override;

	virtual void NotifyActorBeginOverlap(AActor* OtherActor) override;

	FORCEINLINE bool GetBDead() {
		return bDead;
	}

};
