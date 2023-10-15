// Fill out your copyright notice in the Description page of Project Settings.


#include "Character/BlasterCharacter.h"
#include "GameFramework/SpringArmComponent.h"
#include "Camera/CameraComponent.h"
#include "InputMappingContext.h"
#include "EnhancedInputSubsystems.h"
#include "EnhancedInput/Public/EnhancedInputComponent.h"
#include "GameFramework/CharacterMovementComponent.h"
// Sets default values
ABlasterCharacter::ABlasterCharacter()
{
 	// Set this character to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

	CameraBoom = CreateDefaultSubobject<USpringArmComponent>(TEXT("CameraBoom"));
	CameraBoom->SetupAttachment(GetMesh());
	CameraBoom->TargetArmLength = 600.f;
	CameraBoom->bUsePawnControlRotation = true;

	FollowCamera = CreateDefaultSubobject<UCameraComponent>(TEXT("FollowCamera"));
	FollowCamera->SetupAttachment(CameraBoom, USpringArmComponent::SocketName);
	FollowCamera->bUsePawnControlRotation = false;

	bUseControllerRotationYaw = false; // 控制玩家摇头
	GetCharacterMovement()->bOrientRotationToMovement = true; // 朝向自己的移动方向

}

// Called when the game starts or when spawned
void ABlasterCharacter::BeginPlay()
{
	Super::BeginPlay();
	
}

// Called every frame
void ABlasterCharacter::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

}

// Called to bind functionality to input
void ABlasterCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	Super::SetupPlayerInputComponent(PlayerInputComponent);

	APlayerController* PC = Cast<APlayerController>(GetController()); //获取player controller

	if (PC) {
		// 获取local player subsystem
		UEnhancedInputLocalPlayerSubsystem* Subsystem = ULocalPlayer::GetSubsystem<UEnhancedInputLocalPlayerSubsystem>(PC->GetLocalPlayer());
		if (Subsystem) {

		}
		// 清除已有的maping， 添加角色的maping
		Subsystem->ClearAllMappings();
		Subsystem->AddMappingContext(DefaultInputMaping, 0);
	}

	UEnhancedInputComponent* PEI = Cast<UEnhancedInputComponent>(PlayerInputComponent);
	if (PEI) {
		PEI->BindAction(InputMove, ETriggerEvent::Triggered, this, &ABlasterCharacter::Move);
		PEI->BindAction(InputLook, ETriggerEvent::Triggered, this, &ABlasterCharacter::Look);
		PEI->BindAction(InputJump, ETriggerEvent::Triggered, this, &ABlasterCharacter::Jump);
		PEI->BindAction(InputJump, ETriggerEvent::Completed, this, &ABlasterCharacter::StopJumping);
		PEI->BindAction(InputAttack, ETriggerEvent::Triggered, this, &ABlasterCharacter::Attack);
	}
	
}

void ABlasterCharacter::Move(const FInputActionValue& Value)
{
	if (Controller != nullptr) {
		const FVector2D MoveVector = Value.Get<FVector2D>();
		const FRotator MovementRotation(0,Controller->GetControlRotation().Yaw,0);

		// 前后 方向
		if (MoveVector.Y != 0.f) {
			// 获取前 向量
			const FVector Direction = MovementRotation.RotateVector(FVector::ForwardVector);
			AddMovementInput(Direction, MoveVector.Y);
		}
		// 左右 方向
		if (MoveVector.X != 0.f) {
			// 获取右向量
			const FVector Direction = MovementRotation.RotateVector(FVector::RightVector);
			AddMovementInput(Direction, MoveVector.X);
		}
	}
}

void ABlasterCharacter::Look(const FInputActionValue& Value)
{
	if (Controller != nullptr) {
		const FVector2D LookVector = Value.Get<FVector2D>();
		if (LookVector.X != 0.f) {
			AddControllerYawInput(LookVector.X);
		}

		if (LookVector.Y != 0.f) {
			AddControllerPitchInput(LookVector.Y);
		}
	}
}

void ABlasterCharacter::Attack(const FInputActionValue& Value)
{
}

void ABlasterCharacter::Jump()
{
	Super::Jump();
}

void ABlasterCharacter::StopJumping()
{
	Super::StopJumping();
}


