// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "Cloud.generated.h"

UCLASS()
class MUFFIN_API ACloud : public AActor
{
	GENERATED_BODY()
	
public:	
	// Sets default values for this actor's properties
	ACloud();

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

	UPROPERTY(VisibleAnyWhere,Category="Collision")
	class UBoxComponent* BoxCollision;

	UPROPERTY(VisibleAnyWhere,BlueprintReadOnly, Category = "Components")
	class UTextRenderComponent* ScoreText;

	UPROPERTY(VisibleAnyWhere, BlueprintReadOnly, Category = "Show")
	UStaticMeshComponent* CloudPlane;

	UPROPERTY(VisibleAnyWhere, BlueprintReadOnly, Category = "Show")
	UStaticMeshComponent* RainPlane;

	UPROPERTY(EditAnyWhere, Category = "Show")
	TArray<UTexture*> Textures;

	UPROPERTY(BlueprintReadOnly, Category = "Show")
	UMaterialInstanceDynamic* MatInstance;

	UMaterialInterface* MatInterface;

	UPROPERTY(EditAnyWhere, Category = "Sound")
	class USoundCue* CloudSound;

	UPROPERTY(VisibleAnyWhere, Category = "Sound")
	class UAudioComponent* AudioComponent;

	void SetRandomCloudTexture();

	class AMuffinCharacter* MuffinCharacter;

	void DisplayScore(); // 显示分数

	// C++的函数在 blueprint里实现
	UFUNCTION(BlueprintImplementableEvent)
	void FadeOut(); // 淡出

	void EnableRain();

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;

	virtual void NotifyActorBeginOverlap(AActor *OtherActor) override;

};
