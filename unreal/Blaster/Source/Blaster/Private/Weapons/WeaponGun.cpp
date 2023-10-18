// Fill out your copyright notice in the Description page of Project Settings.


#include "Weapons/WeaponGun.h"
#include "Components/SphereComponent.h"
// Sets default values
AWeaponGun::AWeaponGun()
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = false;
	bReplicates = true;

	WeaponGunMesh = CreateDefaultSubobject<USkeletalMeshComponent>(TEXT("WeaponGun"));
	WeaponGunMesh->SetupAttachment(RootComponent);
	SetRootComponent(WeaponGunMesh);

	WeaponGunMesh->SetCollisionResponseToAllChannels(ECollisionResponse::ECR_Block);
	WeaponGunMesh->SetCollisionResponseToChannel(ECollisionChannel::ECC_Pawn, ECollisionResponse::ECR_Ignore);
	WeaponGunMesh->SetCollisionEnabled(ECollisionEnabled::NoCollision);


	AreaSphere = CreateDefaultSubobject<USphereComponent>(TEXT("AreaSphere"));
	AreaSphere->SetupAttachment(RootComponent);
	AreaSphere->SetCollisionResponseToAllChannels(ECollisionResponse::ECR_Ignore);
	AreaSphere->SetCollisionEnabled(ECollisionEnabled::NoCollision);

}

// Called when the game starts or when spawned
void AWeaponGun::BeginPlay()
{
	Super::BeginPlay();
	if ( HasAuthority()
		//GetLocalRole() == ENetRole::ROLE_Authority
		) {
		AreaSphere->SetCollisionEnabled(ECollisionEnabled::QueryAndPhysics);
		AreaSphere->SetCollisionResponseToChannel(ECollisionChannel::ECC_Pawn, ECollisionResponse::ECR_Overlap);
	}
}

// Called every frame
void AWeaponGun::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

}

