// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "OC_GridNode.h"
#include "OC_GridMap.generated.h"

UCLASS()
class AOC_GridMap : public AActor
{
	GENERATED_BODY()
	
public:	
	// Sets default values for this actor's properties
	AOC_GridMap();

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

	// 初始化属性
	virtual void PostInitProperties() override;

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;


#if WITH_EDITOR
	// 在Editor中修改属性-覆盖
	virtual void PostEditChangeProperty(FPropertyChangedEvent& PropertyChangedEvent) override;
#endif

public:
	// 棋盘形状
	UPROPERTY(EditAnywhere,BlueprintReadWrite)
	EGridType MapType = EGridType::None;

	//棋盘大小
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	float Size;

	//棋盘行数
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	int Row;

	//棋盘列数
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	int Column;

	// 棋盘的棋格
	UPROPERTY()
	TMap<FGridVector, UOC_GridNode*> NodeMap;



	// 生成棋盘
	UFUNCTION(BlueprintCallable)
	void GenerateGridMap();

	// 生成棋格Spawn
	UFUNCTION()
	void GenerateNodes(float InSize,int InRow, int InColumn);

	// 生成六边形棋格Spawn
	UFUNCTION()
	void GenerateHexNodes(float InHexSize, int InRow, int InColumn);

	// 初始化棋格入口,初始化邻居
	UFUNCTION()
	void InitNodes();


	// 初始化六边形棋格,初始化邻居
	UFUNCTION()
	void InitHexNodes();





	// 获取坐标对应的棋格
	UFUNCTION(BlueprintCallable)
	UOC_GridNode* GetNode(FGridVector InCoord) const;

	// 寻路-A*寻找路径
	UFUNCTION(BlueprintCallable)
	bool FindPath(TArray<UOC_GridNode*>&Path, AActor* InActor, UOC_GridNode*FromNode, UOC_GridNode* ToNode, int StopSteps=0);


	// 是否存在路径
	UFUNCTION(BlueprintCallable)
	bool IsPathExist(AActor* InActor, UOC_GridNode* FromNode, UOC_GridNode* ToNode, int StopSteps = 0);

	// 获取目标点范围内-多少步幅 InStep的棋格
	UFUNCTION()
	TArray<UOC_GridNode*> GetNodeNeighbors(UOC_GridNode* InNode, int InStep = 0) const;

};
