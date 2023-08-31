// Fill out your copyright notice in the Description page of Project Settings.


#include "SpaceShip.h"
#include "Components/StaticMeshComponent.h"
#include "Components/SphereComponent.h"
#include "Components/SceneComponent.h"
#include "Camera/CameraComponent.h"
#include "GameFramework/PlayerController.h"
#include "GameFramework/SpringArmComponent.h"
#include "Kismet/KismetMathLibrary.h"
#include "Bullet.h"
#include "Enemy.h"
#include "TimerManager.h"
#include "Engine/BlockingVolume.h"
#include "Kismet/GameplayStatics.h"
#include "TimerManager.h"
#include "Sound/SoundCue.h"
#include "Particles/ParticleSystemComponent.h"
#include "Particles/ParticleSystem.h"

// Sets default values
ASpaceShip::ASpaceShip()
{
 	// Set this pawn to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

	
	SphereCollisionComp = CreateDefaultSubobject<USphereComponent>(TEXT("SphereCollisionComp"));
	RootComponent = SphereCollisionComp;

	ShipStaticMeshComp = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("ShipStaticMeshComp"));
	ShipStaticMeshComp->SetupAttachment(RootComponent);

	SpringArmComp = CreateDefaultSubobject<USpringArmComponent>(TEXT("SpringArmComp"));
	SpringArmComp->SetupAttachment(RootComponent);


	CameraComp = CreateDefaultSubobject<UCameraComponent>(TEXT("CameraComp"));
	CameraComp->SetupAttachment(SpringArmComp);

	SpawnPoint = CreateDefaultSubobject<USceneComponent>(TEXT("SpawnPoint"));
	SpawnPoint->SetupAttachment(ShipStaticMeshComp);


	ThrusterParticleComp = CreateDefaultSubobject<UParticleSystemComponent>(TEXT("ThrusterParticleComp"));
	ThrusterParticleComp->SetupAttachment(RootComponent);

	Speed = 2500.0f;

	TimeBetweenShot = 0.2f;

	bDead = false;

	bUpDownMove =false;

	bLeftRightMove = false;
}

// Called when the game starts or when spawned
void ASpaceShip::BeginPlay()
{
	Super::BeginPlay();
	Pc =Cast<APlayerController>(GetController()); // ��ȡplayer controller
	Pc->bShowMouseCursor = true; // ��ʾ���
	
}

void ASpaceShip::LookAtCousor()
{
	FVector MouseLocation,MouseDirection;  // ���λ��, ��귽��
	Pc->DeprojectMousePositionToWorld(MouseLocation,MouseDirection);
	FVector TargetLocation = FVector(MouseLocation.X, MouseLocation.Y, GetActorLocation().Z);
	FRotator Rotator = UKismetMathLibrary::FindLookAtRotation(GetActorLocation(), TargetLocation); // �ɻ�λ�� �� ���λ�õķ���
	SetActorRotation(Rotator); // ʹ�ɻ�ת��

}

void ASpaceShip::MoveUpDown(float Value)
{
	if (Value != 0) {
		bUpDownMove = true;
	}
	else {
		bUpDownMove = false;
	}
	// FVector(1, 0, 0);  //FVector::ForwardVector;  ��ǰ�ƶ�
	AddMovementInput(FVector::ForwardVector,Value);
}

void ASpaceShip::MoveLeftRight(float Value)
{
	if (Value != 0) {
		bLeftRightMove = true;
	}else{
		bLeftRightMove = false;
	}
	AddMovementInput(FVector::RightVector, Value);
}

void ASpaceShip::Move(float DeltaTime)
{
	AddActorWorldOffset(ConsumeMovementInputVector()*Speed*DeltaTime,false); // ��ȡ������ƶ������仯��������Ϊactor����������
}

void ASpaceShip::Fire()
{
	if (Bullet && !bDead) {
		FActorSpawnParameters SpawnParams;
		GetWorld()->SpawnActor<ABullet>(Bullet, SpawnPoint->GetComponentLocation(), SpawnPoint->GetComponentRotation(), SpawnParams);
		if (ShotCue) {
			UGameplayStatics::PlaySoundAtLocation(this, ShotCue, GetActorLocation());
		}
	}
}

void ASpaceShip::StartFire() // 开火
{
	GetWorldTimerManager().SetTimer(TimerHandle_BetweenShot, this, &ASpaceShip::Fire, TimeBetweenShot, true, 0.0f);

}

void ASpaceShip::EndFire()
{
	GetWorldTimerManager().ClearTimer(TimerHandle_BetweenShot);
}

void ASpaceShip::ReStartLevel()
{
	UGameplayStatics::OpenLevel(this, "MainGame");
}

void ASpaceShip::OnDead()
{
	bDead = true;
	SphereCollisionComp->SetVisibility(false,true); // 父亲组件不显示，子组件也受影响
	if (GameOverCue) {
		UGameplayStatics::PlaySoundAtLocation(this, GameOverCue, GetActorLocation());
	}
	if(ExploseParticle){
		UGameplayStatics::SpawnEmitterAtLocation(GetWorld(), ExploseParticle, GetActorLocation(), FRotator::ZeroRotator, true); // 触发爆炸粒子
	}
	GetWorldTimerManager().SetTimer(TimerHandle_ReStart,this,&ASpaceShip::ReStartLevel,2.0f,false);
}

// Called every frame
void ASpaceShip::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
	if (!bDead) {
		if (bUpDownMove || bLeftRightMove)
		{
			ThrusterParticleComp->Activate();
		}
		else {
			ThrusterParticleComp->Deactivate();
		}
		LookAtCousor();
		Move(DeltaTime);
	}
	else {
		ThrusterParticleComp->Deactivate();
	}
}

// Called to bind functionality to input
void ASpaceShip::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	Super::SetupPlayerInputComponent(PlayerInputComponent);

	PlayerInputComponent->BindAxis("MoveUpDown", this, &ASpaceShip::MoveUpDown);
	PlayerInputComponent->BindAxis("MoveLeftRight", this, &ASpaceShip::MoveLeftRight);
	PlayerInputComponent->BindAction("Fire",IE_Pressed ,this, &ASpaceShip::StartFire);
	PlayerInputComponent->BindAction("Fire", IE_Released, this, &ASpaceShip::EndFire);
}

void ASpaceShip::NotifyActorBeginOverlap(AActor* OtherActor)
{
	Super::NotifyActorBeginOverlap(OtherActor);

	AEnemy* Enemy = Cast<AEnemy>(OtherActor); // 转换为敌人
	if (Enemy) {
		Enemy->Destroy(); //敌人销毁
		UE_LOG(LogTemp, Warning, TEXT("Player is dead"));
		//Destroy();
		OnDead();
	}
	else if (Cast<ABlockingVolume>(OtherActor)) {
		UE_LOG(LogTemp, Warning, TEXT("Player 到边界了"));
		OnDead();
	}
}

