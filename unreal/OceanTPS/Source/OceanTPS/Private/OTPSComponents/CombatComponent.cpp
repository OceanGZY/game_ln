// Fill out your copyright notice in the Description page of Project Settings.


#include "OTPSComponents/CombatComponent.h"
#include "Weapon/Weapon.h"
#include "Character/OTPSCharacter.h"
#include "Engine/SkeletalMeshSocket.h"
#include "Components/SphereComponent.h"

// Sets default values for this component's properties
UCombatComponent::UCombatComponent()
{
	PrimaryComponentTick.bCanEverTick = false;

}

void UCombatComponent::EquipWeapon(AWeapon* WeaponToEquip)
{
	if (OTPSCharacter == nullptr || WeaponToEquip ==nullptr) {
		return;
	}

	EquippedWeapon = WeaponToEquip;
	EquippedWeapon->SetWeaponState(EWeaponState::EWS_Equipped);
	
	const USkeletalMeshSocket* HandSocket = OTPSCharacter->GetMesh()->GetSocketByName(FName("RightHandSocket"));
	if (HandSocket) {
		HandSocket->AttachActor(EquippedWeapon, OTPSCharacter->GetMesh());
	}
	EquippedWeapon->SetOwner(OTPSCharacter);
}


// Called when the game starts
void UCombatComponent::BeginPlay()
{
	Super::BeginPlay();

	
}


// Called every frame
void UCombatComponent::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction)
{
	Super::TickComponent(DeltaTime, TickType, ThisTickFunction);

	// ...
}

