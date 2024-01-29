// Fill out your copyright notice in the Description page of Project Settings.


#include "Weapons/WeaponGun.h"
#include "Components/SphereComponent.h"
#include "Components/WidgetComponent.h"
#include "Character/BlasterCharacter.h"
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

	PickUpWidget = CreateDefaultSubobject<UWidgetComponent>(TEXT("PickUpWidget"));
	PickUpWidget->SetupAttachment(RootComponent);
}

// Called when the game starts or when spawned
void AWeaponGun::BeginPlay()
{
	Super::BeginPlay();

	AreaSphere->SetCollisionEnabled(ECollisionEnabled::QueryAndPhysics);
	AreaSphere->SetCollisionResponseToChannel(ECollisionChannel::ECC_Pawn, ECollisionResponse::ECR_Overlap);
	AreaSphere->OnComponentBeginOverlap.AddDynamic(this,&AWeaponGun::OnSphereOverlap);
	AreaSphere->OnComponentEndOverlap.AddDynamic(this,&AWeaponGun::OnSphereEndOverlap);

	if (PickUpWidget) {
		PickUpWidget->SetVisibility(false);
	}
}

void AWeaponGun::OnSphereOverlap(
	UPrimitiveComponent* OverlappedComponent,
	AActor* OtherActor, UPrimitiveComponent* OtherComp, 
	int32 OtherBodyIndex, 
	bool bFromSweep, 
	const FHitResult& SweepResult)
{
	ABlasterCharacter* BlasterCharacter = Cast<ABlasterCharacter>(OtherActor);
	if (BlasterCharacter) {
		BlasterCharacter->SetOverlappingWeapon(this);
	}
}

void AWeaponGun::OnSphereEndOverlap(
	UPrimitiveComponent* OverlappedComponent,
	AActor* OtherActor,
	UPrimitiveComponent* OtherComp,
	int32 OtherBodyIndex)
{
	ABlasterCharacter* BlasterCharacter = Cast<ABlasterCharacter>(OtherActor);
	if (BlasterCharacter) {
		BlasterCharacter->SetOverlappingWeapon(nullptr);
	}
}

// Called every frame
void AWeaponGun::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

}

void AWeaponGun::ShowPickupWidget(bool bShowWidget)
{
	if (PickUpWidget) {
		PickUpWidget->SetVisibility(bShowWidget);
	}
}

