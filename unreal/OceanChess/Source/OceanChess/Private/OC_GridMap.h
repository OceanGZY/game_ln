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

	// ��ʼ������
	virtual void PostInitProperties() override;

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;


#if WITH_EDITOR
	// ��Editor���޸�����-����
	virtual void PostEditChangeProperty(FPropertyChangedEvent& PropertyChangedEvent) override;
#endif

public:
	// ������״
	UPROPERTY(EditAnywhere,BlueprintReadWrite)
	EGridType MapType = EGridType::None;

	//���̴�С
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	float Size;

	//��������
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	int Row;

	//��������
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	int Column;

	// ���̵����
	UPROPERTY()
	TMap<FGridVector, UOC_GridNode*> NodeMap;



	// ��������
	UFUNCTION(BlueprintCallable)
	void GenerateGridMap();

	// �������Spawn
	UFUNCTION()
	void GenerateNodes(float InSize,int InRow, int InColumn);

	// �������������Spawn
	UFUNCTION()
	void GenerateHexNodes(float InHexSize, int InRow, int InColumn);

	// ��ʼ��������,��ʼ���ھ�
	UFUNCTION()
	void InitNodes();


	// ��ʼ�����������,��ʼ���ھ�
	UFUNCTION()
	void InitHexNodes();





	// ��ȡ�����Ӧ�����
	UFUNCTION(BlueprintCallable)
	UOC_GridNode* GetNode(FGridVector InCoord) const;

	// Ѱ·-A*Ѱ��·��
	UFUNCTION(BlueprintCallable)
	bool FindPath(TArray<UOC_GridNode*>&Path, AActor* InActor, UOC_GridNode*FromNode, UOC_GridNode* ToNode, int StopSteps=0);


	// �Ƿ����·��
	UFUNCTION(BlueprintCallable)
	bool IsPathExist(AActor* InActor, UOC_GridNode* FromNode, UOC_GridNode* ToNode, int StopSteps = 0);

	// ��ȡĿ��㷶Χ��-���ٲ��� InStep�����
	UFUNCTION()
	TArray<UOC_GridNode*> GetNodeNeighbors(UOC_GridNode* InNode, int InStep = 0) const;

};
