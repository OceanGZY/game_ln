// Fill out your copyright notice in the Description page of Project Settings.


#include "GameCamera.h"
#include "Camera/CameraComponent.h"
#include "Kismet/GameplayStatics.h"
#include "MuffinCharacter.h"
#include "Components/BoxComponent.h"
#include "Cloud.h"

// Sets default values
AGameCamera::AGameCamera()
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;


	CameraComp = CreateDefaultSubobject<UCameraComponent>(TEXT("CameraComponent"));
	RootComponent = CameraComp;

	DestroyArea = CreateDefaultSubobject<UBoxComponent>(TEXT("DestroyArea"));
	DestroyArea->SetupAttachment(RootComponent);

	bFollowPlayer = true;

}

// Called when the game starts or when spawned
void AGameCamera::BeginPlay()
{
	Super::BeginPlay();

	MuffinCharacter = Cast<AMuffinCharacter>(UGameplayStatics::GetPlayerPawn(this, 0));

	Pc = UGameplayStatics::GetPlayerController(this,0);
	Pc->SetViewTargetWithBlend(this,0);

}

void AGameCamera::MoveCamera() // 相机跟随角色运动
{
	FVector TargetPosition =FVector(GetActorLocation().X, GetActorLocation().Y, MuffinCharacter->GetActorLocation().Z);
	SetActorLocation(TargetPosition);
}


// Called every frame
void AGameCamera::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
	if (bFollowPlayer) {
		MoveCamera();
		CheckIfFalling();
	}
	
}

void AGameCamera::NotifyActorBeginOverlap(AActor* OtherActor)
{
	Super::NotifyActorBeginOverlap(OtherActor);
	
	ACloud * Cloud = Cast<ACloud>(OtherActor);
	if (Cloud)
	{
		Cloud->Destroy();
	}
}


void AGameCamera::CheckIfFalling()
{
	if (MuffinCharacter->GetVelocity().Z < 0) {
		UpdateTimer();
	}
	else {
		ResetTimer();
	}
}

void AGameCamera::OnSureFalling()
{
	// 回到地面的位置，只是竖直位置的变化
	bFollowPlayer = false;
	float OldCameraPosX = GetActorLocation().X;
	float OldCameraPosY = GetActorLocation().Y;
	SetActorLocation(FVector(OldCameraPosX,OldCameraPosY,-30));

	float OldMuffinCharacterPosX = MuffinCharacter->GetActorLocation().X;
	float OldMuffinCharacterPosY = MuffinCharacter->GetActorLocation().Y;

	MuffinCharacter->SetActorLocation(FVector(OldMuffinCharacterPosX,OldMuffinCharacterPosY,0));
	MuffinCharacter->DisableInput(Pc);

}
