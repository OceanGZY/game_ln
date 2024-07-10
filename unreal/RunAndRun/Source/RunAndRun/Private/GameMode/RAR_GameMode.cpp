// Fill out your copyright notice in the Description page of Project Settings.


#include "GameMode/RAR_GameMode.h"
#include "Blocks/RAR_Block.h"
#include "Pickups/RAR_PickupItem.h"
#include "Kismet/GameplayStatics.h"
#include "Utils/RAR_SaveGame.h"

ARAR_GameMode::ARAR_GameMode()
{
	LastBlock = 10;
	RunDistance = 0;
	HighScore = 0;
	CoinCount = 0;
	SaveGameSlotName = "HighScore";

	UStaticMesh* StreetBlock1 = LoadObject<UStaticMesh>(nullptr, TEXT("/Game/Thirds/AssetsvilleTown/Meshes/StreetProps/SM_road_block"));
	UStaticMesh* StreetBlock2 = LoadObject<UStaticMesh>(nullptr, TEXT("/Game/Thirds/AssetsvilleTown/Meshes/StreetProps/SM_road_block_2"));
	UStaticMesh* StreetBlock3 = LoadObject<UStaticMesh>(nullptr, TEXT("/Game/Thirds/AssetsvilleTown/Meshes/StreetProps/SM_road_block_3"));
	UStaticMesh* StreetBlock4 = LoadObject<UStaticMesh>(nullptr, TEXT("/Game/Thirds/AssetsvilleTown/Meshes/StreetProps/SM_road_block_concrete"));
	UStaticMesh* CartonBox1 = LoadObject<UStaticMesh>(nullptr, TEXT("/Game/Thirds/AssetsvilleTown/Meshes/StreetProps/SM_carton_box_2"));
	UStaticMesh* SallBorard1 = LoadObject<UStaticMesh>(nullptr, TEXT("/Game/Thirds/AssetsvilleTown/Meshes/StreetProps/SM_billboard_forSale_standing"));
	UStaticMesh* Bench1 = LoadObject<UStaticMesh>(nullptr, TEXT("/Game/Thirds/AssetsvilleTown/Meshes/StreetProps/SM_bench"));
	UStaticMesh* Bench2 = LoadObject<UStaticMesh>(nullptr, TEXT("/Game/Thirds/AssetsvilleTown/Meshes/StreetProps/SM_bench_02"));
	UStaticMesh* JobBoard1 = LoadObject<UStaticMesh>(nullptr, TEXT("/Game/Thirds/AssetsvilleTown/Meshes/StreetProps/SM_billboard_jobOffers"));

	ObstacleMeshes.Add(StreetBlock1);
	ObstacleMeshes.Add(StreetBlock2);
	ObstacleMeshes.Add(StreetBlock3);
	ObstacleMeshes.Add(StreetBlock4);
	ObstacleMeshes.Add(CartonBox1);
	ObstacleMeshes.Add(SallBorard1);
	ObstacleMeshes.Add(Bench1);
	ObstacleMeshes.Add(Bench2);
	ObstacleMeshes.Add(JobBoard1);


	UStaticMesh* CargoTruckOldCar = LoadObject<UStaticMesh>(nullptr, TEXT("/Game/StaticMesh/Car/SM_CargoTruchOld"));
	UStaticMesh* HearseCar = LoadObject<UStaticMesh>(nullptr, TEXT("/Game/StaticMesh/Car/SM_Hearse"));
	UStaticMesh* PoliceCar = LoadObject<UStaticMesh>(nullptr, TEXT("/Game/StaticMesh/Car/SM_PoliceCar"));
	UStaticMesh* SportClassicCar = LoadObject<UStaticMesh>(nullptr, TEXT("/Game/StaticMesh/Car/SM_SportClassic"));
	TruckTrailer = LoadObject<UStaticMesh>(nullptr, TEXT("/Game/StaticMesh/Car/SM_TruckTrailer"));

	ObstacleCarMeshes.Add(CargoTruckOldCar);
	ObstacleCarMeshes.Add(HearseCar);
	ObstacleCarMeshes.Add(PoliceCar);
	ObstacleCarMeshes.Add(SportClassicCar);
	ObstacleCarMeshes.Add(TruckTrailer);

	UStaticMesh* Building01 = LoadObject<UStaticMesh>(nullptr, TEXT("/Game/Thirds/AssetsvilleTown/Meshes/Buildings/SM_buildingBarn_01"));
	BuildingMeshes.Add(Building01);

}

void ARAR_GameMode::AddBlock(bool bInit)
{
	// 加载蓝图类
	FString BPBockPath = FString(TEXT("Blueprint'/Game/Blueprints/Env/BP_RAR_Block.BP_RAR_Block_C'"));
	UWorld* World = GetWorld();
	UClass* BlockClass = LoadClass<ARAR_Block>(nullptr, *BPBockPath);

	if (World) {
		if (bInit) {
			for (int i = 0; i < LastBlock - 1; i++)
			{
				
					int y = i * 800;
					FVector Location = FVector(0, y, 0);
					FRotator  Rotator = FRotator(0, 180, 0);
					
					// 前两块板子不产生汽车碰撞
					if (i < 2) {
						FTransform Tranform;
						Tranform.SetLocation(Location);
						FQuat axisRot(FVector(0, 0, 1), -PI); // 效果与 设置FRotator  Rotator = FRotator(0, 180, 0);相同

						Tranform.SetRotation(axisRot);

						UE_LOG(LogTemp, Log, TEXT("Tranform Location %f %f %f"), Tranform.GetLocation().X, Tranform.GetLocation().Y, Tranform.GetLocation().Z);
						UE_LOG(LogTemp, Log, TEXT("Tranform GetRotation %f %f %f"), Tranform.GetRotation().X, Tranform.GetRotation().Y, Tranform.GetRotation().Z);
						UE_LOG(LogTemp, Log, TEXT("Tranform Rotator %f %f %f"), Tranform.Rotator().Pitch , Tranform.Rotator().Yaw, Tranform.Rotator().Roll);

						// 产生
						ARAR_Block* RoadBlock = Cast<ARAR_Block>(UGameplayStatics::BeginDeferredActorSpawnFromClass(this, BlockClass, Tranform));
						// 设置参数
						RoadBlock->bLine2CanSpawnCar = false;
						RoadBlock->bLine3CanSpawnCar = false;
						// 结束产生
						UGameplayStatics::FinishSpawningActor(RoadBlock, Tranform);
					}
					else {
						ARAR_Block* RoadBlock = World->SpawnActor<ARAR_Block>(BlockClass, Location, Rotator);
					}
			}
		}
		else {
			int y = (LastBlock - 1) * 800;
			FVector Location = FVector(0, y, 0);
			FRotator  Rotator = FRotator(0, 180, 0);
			ARAR_Block* RoadBlock = World->SpawnActor<ARAR_Block>(BlockClass, Location, Rotator);
			LastBlock++;
		}
	}

}

void ARAR_GameMode::BeginPlay()
{
	AddBlock();

	DoLoadGame();
}

void ARAR_GameMode::SpawnCoin(FVector Location, FRotator Rotator)
{
	UWorld* World = GetWorld();
	if (World) {
		FString BPCoinPath = FString(TEXT("Blueprint'/Game/Blueprints/PickUps/BP_Coin.BP_Coin_C'"));
		UClass* PickUpCoin = LoadClass<ARAR_PickupItem>(nullptr, *BPCoinPath);
		ARAR_PickupItem* RAR_PickupItem = World->SpawnActor<ARAR_PickupItem>(PickUpCoin, Location, Rotator);
	}
}

void ARAR_GameMode::DoSaveGame() const
{
	if (URAR_SaveGame* SaveGameInstance = Cast<URAR_SaveGame>(UGameplayStatics::CreateSaveGameObject(URAR_SaveGame::StaticClass()))) {
		SaveGameInstance->HighScore = HighScore;
		UGameplayStatics::SaveGameToSlot(SaveGameInstance, SaveGameSlotName, 0);
	}

}

void ARAR_GameMode::DoLoadGame()
{
	bool bIsSaveExist = UGameplayStatics::DoesSaveGameExist(SaveGameSlotName, 0);
	if (bIsSaveExist) {
		if (URAR_SaveGame* SaveGameInstance = Cast<URAR_SaveGame>(UGameplayStatics::LoadGameFromSlot(SaveGameSlotName, 0))) {
			HighScore = SaveGameInstance->HighScore;
		}
	}
}
