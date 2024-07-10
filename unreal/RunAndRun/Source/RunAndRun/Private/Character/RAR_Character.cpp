// Fill out your copyright notice in the Description page of Project Settings.


#include "Character/RAR_Character.h"
#include "GameMode/RAR_GameMode.h"
#include "Engine/LocalPlayer.h"
#include "Camera/CameraComponent.h"
#include "Components/CapsuleComponent.h"
#include "GameFramework/CharacterMovementComponent.h"
#include "GameFramework/SpringArmComponent.h"
#include "GameFramework/Controller.h"
#include "Components/SkeletalMeshComponent.h"
#include "EnhancedInputComponent.h"
#include "EnhancedInputSubsystems.h"
#include "InputActionValue.h"
#include "Kismet/KismetSystemLibrary.h"
#include "Kismet/GameplayStatics.h"
#include "UI/RAR_PlayerHud.h"


// Sets default values
ARAR_Character::ARAR_Character()
{
	GetCapsuleComponent()->InitCapsuleSize(34.f, 70.0f);

	GetCharacterMovement()->bOrientRotationToMovement = false; // 不转向 左右换道

	GetCharacterMovement()->JumpZVelocity = 700.f;
	GetCharacterMovement()->AirControl = 0.35f;
	GetCharacterMovement()->MaxWalkSpeed = 500.f;
	GetCharacterMovement()->MinAnalogWalkSpeed = 20.f;
	GetCharacterMovement()->BrakingDecelerationWalking = 2000.f;
	GetCharacterMovement()->BrakingDecelerationFalling = 1500.0f;

	CameraBoom = CreateDefaultSubobject<USpringArmComponent>(TEXT("CameraBoom"));
	CameraBoom->SetupAttachment(RootComponent);
	CameraBoom->TargetArmLength = 600.0f;
	CameraBoom->bUsePawnControlRotation = true;


	FollowCamera = CreateDefaultSubobject<UCameraComponent>(TEXT("FollowCamera"));
	FollowCamera->SetupAttachment(CameraBoom, USpringArmComponent::SocketName);
	FollowCamera->bUsePawnControlRotation = false;


	FollowAiArm = CreateDefaultSubobject<USpringArmComponent>(TEXT("FollowAiArm"));
	FollowAiArm->SetupAttachment(RootComponent);
	FollowAiArm->SetRelativeLocation(FVector(0, 0, -96));
	FollowAiArm->TargetArmLength = 150.f;
	FollowAiArm->bDoCollisionTest = false;


	FollowAi = CreateDefaultSubobject<USkeletalMeshComponent>(TEXT("FollowAi"));
	FollowAi->SetupAttachment(FollowAiArm, USpringArmComponent::SocketName);
	FollowAi->SetRelativeRotation(FRotator(0, -90, 0));

	static ConstructorHelpers::FObjectFinder<UCurveFloat> Curve(TEXT("/Game/Blueprints/CBP_SlideCurve"));
	check(Curve.Succeeded());
	SlideCurver = Curve.Object;

	
}

void ARAR_Character::MoveLeft(const FInputActionValue& Value)
{

	if (Controller != nullptr)
	{
		//// find out which way is forward
		//const FRotator Rotation = Controller->GetControlRotation();a
		//const FRotator YawRotation(0, Rotation.Yaw, 0);
		//// get right vector 
		//const FVector RightDirection = FRotationMatrix(YawRotation).GetUnitAxis(EAxis::Y);

		//AddMovementInput(RightDirection, -1);

		FVector OldLoc = GetActorLocation();
		if (TargetX <= -210) {
			//FVector NewLoc = FVector(OldLoc.X + 120, OldLoc.Y, OldLoc.Z);
			//SetActorLocation(NewLoc);
			TargetX += 400;
		}
	}
}

void ARAR_Character::SlideMove(const FInputActionValue& Value)
{
	bCanScaleCapsule = false;
	bIsSlide = true;
	if (SlideCurver) {
		SlideTimeline->Play();
	}

}

void ARAR_Character::DoJump()
{
	UE_LOG(LogTemp, Log, TEXT("do jump bCanScaleCapsule： %hs"), bCanScaleCapsule == false ? "false" : "true");
	if (!bCanScaleCapsule) {
		ChangeCapsuleCollision();
	}

	ARAR_Character::Jump();


}

void ARAR_Character::MoveRight(const FInputActionValue& Value)
{
	if (Controller != nullptr)
	{
		//// find out which way is forward
		//const FRotator Rotation = Controller->GetControlRotation();
		//const FRotator YawRotation(0, Rotation.Yaw, 0);
		//// get right vector 
		//const FVector RightDirection = FRotationMatrix(YawRotation).GetUnitAxis(EAxis::Y);

		//AddMovementInput(RightDirection, 1);

		FVector OldLoc = GetActorLocation();
		UE_LOG(LogTemp, Log, TEXT("right move '%f'  '%f' '%f'"), OldLoc.X, OldLoc.Y, OldLoc.Z);
		if (TargetX >= -1390) {
			TargetX -= 400;
		}

	}
}

// Called when the game starts or when spawned
void ARAR_Character::BeginPlay()
{
	Super::BeginPlay();
	StartLocation = GetActorLocation();
	TargetX = GetActorLocation().X;
	FollowX = FollowAiArm->GetComponentLocation().X;
	FollowZ = FollowAiArm->GetComponentLocation().Z;
	HitCounts = 0;
	FollowAIArmSpeed = 2.5f;
	bCanScaleCapsule = true;
	bIsSlide = false;

	CapsuleHeight = 70.f;

	const FLatentActionInfo LatentInfo(0, FMath::Rand(), TEXT("RemoveHit"), this);
	UKismetSystemLibrary::Delay(this, 2.f, LatentInfo);

	if (SlideCurver) {
		SlideTimeline = NewObject<UTimelineComponent>(this, TEXT("SlideTimeline"));
		SlideTimelineFinishedEvent.BindUFunction(this, TEXT("SlideTimelineFinishedFunction"));
		SlideTimeline->SetTimelineFinishedFunc(SlideTimelineFinishedEvent);

		SlideTimelineClickEvent.BindDynamic(this,&ARAR_Character::SlideTimelineClickedFunction);
		SlideTimeline->AddInterpFloat(SlideCurver, SlideTimelineClickEvent);

		SlideTimeline->RegisterComponent();
	}
}



// Called every frame
void ARAR_Character::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
	SlideTimeline->TickComponent(DeltaTime, ELevelTick::LEVELTICK_TimeOnly, NULL);

	// 持续前进
	if (Controller != nullptr)
	{
		// find out which way is forward
		const FRotator Rotation = Controller->GetControlRotation();
		const FRotator YawRotation(0, Rotation.Yaw, 0);

		// get forward vector
		const FVector ForwardDirection = FRotationMatrix(YawRotation).GetUnitAxis(EAxis::X);
		AddMovementInput(ForwardDirection, 1);

		FVector OldLoc = GetActorLocation();

		float NewX = FMath::FInterpTo(OldLoc.X, TargetX, DeltaTime, 10);
		FVector NewLoc = FVector(NewX, OldLoc.Y, OldLoc.Z);

		SetActorLocation(NewLoc);

		ARAR_GameMode* GameMode = Cast<ARAR_GameMode>(GetWorld()->GetAuthGameMode());
		// 单位从cm转换为m
		GameMode->RunDistance = FVector::Distance(GetActorLocation(), FVector(GetActorLocation().X, StartLocation.Y, GetActorLocation().Z)) / 100;
		if (GameMode->RunDistance > GameMode->HighScore) {
			GameMode->HighScore = GameMode->RunDistance;
		}

		//UE_LOG(LogTemp, Log, TEXT("game mode run dist: %f"), GameMode->RunDistance);

		GetCharacterMovement()->MaxWalkSpeed = FMath::Clamp(GetCharacterMovement()->MaxWalkSpeed + 0.2, 0, 3000);


		FVector TempFollowAiLoc = FollowAi->GetComponentLocation();
		/*UE_LOG(LogTemp, Log, TEXT("TempFollowAiLoc: %f %f %f"), TempFollowAiLoc.X, TempFollowAiLoc.Y, TempFollowAiLoc.Z);
		UE_LOG(LogTemp, Log, TEXT("FollowAiArm->GetComponentLocation(): %f %f %f"), FollowAiArm->GetComponentLocation().X, FollowAiArm->GetComponentLocation().Y, FollowAiArm->GetComponentLocation().Z);
		*/

		FollowX = FMath::FInterpTo(FollowX, FollowAiArm->GetComponentLocation().X, DeltaTime, 8);
		FollowZ = FMath::FInterpTo(FollowZ, FollowAiArm->GetComponentLocation().Z, DeltaTime, 5);

		FollowAi->SetWorldLocation(FVector(FollowX, FollowAi->GetComponentLocation().Y, FollowZ));

		bool bIsGameOver = UpdateFollowAIArmLength(DeltaTime);
		if (bIsGameOver) {
			GameMode->DoSaveGame();
			ARAR_PlayerHud * RAR_PlayerHud = Cast<ARAR_PlayerHud>(UGameplayStatics::GetPlayerController(this, 0)->GetHUD());
			RAR_PlayerHud->UMR_RAR_GameOver->AddToViewport();
			UGameplayStatics::GetPlayerController(this, 0)->bShowMouseCursor = true; // 显示鼠标
			UGameplayStatics::GetPlayerController(this, 0)->SetIgnoreLookInput(true);//设置鼠标不控制转向
			FInputModeUIOnly InputMode;
			UGameplayStatics::GetPlayerController(this, 0)->SetInputMode(InputMode);
			UGameplayStatics::SetGamePaused(this,true);
		}
	}

}

// Called to bind functionality to input
void ARAR_Character::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	Super::SetupPlayerInputComponent(PlayerInputComponent);

	// Add Input Mapping Context
	if (APlayerController* PlayerController = Cast<APlayerController>(GetController()))
	{
		if (UEnhancedInputLocalPlayerSubsystem* Subsystem = ULocalPlayer::GetSubsystem<UEnhancedInputLocalPlayerSubsystem>(PlayerController->GetLocalPlayer()))
		{
			Subsystem->AddMappingContext(DefaultMappingContext, 0);
		}
	}

	// Set up action bindings
	if (UEnhancedInputComponent* EnhancedInputComponent = Cast<UEnhancedInputComponent>(PlayerInputComponent)) {

		// Jumping
		EnhancedInputComponent->BindAction(JumpAction, ETriggerEvent::Started, this, &ARAR_Character::DoJump);
		EnhancedInputComponent->BindAction(JumpAction, ETriggerEvent::Completed, this, &ACharacter::StopJumping);

		// MoveRight
		EnhancedInputComponent->BindAction(RightMoveAction, ETriggerEvent::Started, this, &ARAR_Character::MoveRight);

		// MoveLeft
		EnhancedInputComponent->BindAction(LeftMoveAction, ETriggerEvent::Started, this, &ARAR_Character::MoveLeft);

		// SlideMove
		EnhancedInputComponent->BindAction(SlideMoveAction, ETriggerEvent::Started, this, &ARAR_Character::SlideMove);
	}
	else
	{
		UE_LOG(LogTemp, Error, TEXT("'%s' Failed to find an Enhanced Input component! This template is built to use the Enhanced Input system. If you intend to use the legacy system, then you will need to update this C++ file."), *GetNameSafe(this));
	}

}

bool ARAR_Character::UpdateFollowAIArmLength(float DeltaTime)
{
	switch (HitCounts)
	{
	case 0: {

		float TempLength = FMath::FInterpTo(FollowAiArm->TargetArmLength, 500, DeltaTime, FollowAIArmSpeed);
		FollowAiArm->TargetArmLength = TempLength;
		break;
	}
	case 1: {
		float TempLength = FMath::FInterpTo(FollowAiArm->TargetArmLength, 150, DeltaTime, FollowAIArmSpeed);
		FollowAiArm->TargetArmLength = TempLength;

		const FLatentActionInfo LatentInfo(0, FMath::Rand(), TEXT("RemoveHit"), this);
		UKismetSystemLibrary::Delay(this, 5.f, LatentInfo);
		break;
	}
	case 2: {
		float TempLength = FMath::FInterpTo(FollowAiArm->TargetArmLength, 0, DeltaTime, FollowAIArmSpeed);
		FollowAiArm->TargetArmLength = TempLength;
		break;
	}
	}

	//UE_LOG(LogTemp, Log, TEXT("HitCounts: %d"), HitCounts);

	if (FollowAiArm->TargetArmLength < 50) {
		return true;
	}
	return false;
}

void ARAR_Character::RemoveHit()
{
	if (HitCounts == 1) {
		HitCounts--;
		FollowAIArmSpeed = 0.5;
	}
}

void ARAR_Character::ChangeCapsuleCollision()
{
	if (SlideCurver) {
		bCanScaleCapsule = true;
		bIsSlide = false;
		SlideTimeline->Reverse();
	}
}

void ARAR_Character::SlideTimelineClickedFunction(float value)
{
	CapsuleHeight = FMath::Lerp(70, 6, value);
	GetCapsuleComponent()->SetCapsuleHalfHeight(CapsuleHeight, true);
}

void ARAR_Character::SlideTimelineFinishedFunction()
{
	// LatentInfo, 
	// Param1 : Linkage 默认给0
	// Param2 : UUID 给个独一无二的编码即可  FMath::Rand()  或者给时间戳转Fstring + 类名 也可保证唯一性
	// Param3 : ExecutionFunction 要执行的方法名  用TEXT宏转一下
	// Param4 : CallbackTarget  回调传入的UObject目标 传this
	const FLatentActionInfo LatentInfo(0, FMath::Rand(), TEXT("ChangeCapsuleCollision"), this);
	UKismetSystemLibrary::RetriggerableDelay(this, 1.5, LatentInfo);
}

