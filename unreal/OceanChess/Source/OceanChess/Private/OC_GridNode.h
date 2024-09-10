// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "OC_GridNode.generated.h"


class AOC_GridMap;
class AActor;

// �������
USTRUCT(BlueprintType)
struct FGridVector {
public:
	GENERATED_USTRUCT_BODY()

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	int X = 0;

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	int Y = 0;

	FGridVector(){}

	FGridVector(int InX, int InY) {
		this->X = InX;
		this->Y = InY;
	}

	// ���������==�� ʵ��TMap��key�Ĺ淶
	FORCEINLINE friend bool operator==(const FGridVector& Lhs, const FGridVector& Rhs) {
		return (Lhs.X == Rhs.Y) && (Lhs.Y == Rhs.Y);
	}
	
	// ���������+�� ��������ӷ�����
	FGridVector operator+ (const FGridVector& F) {
		return FGridVector(this->X + F.X, this->Y + F.Y);
	}
};

// GetTypeHash, ����TMap��key�Ĺ淶
FORCEINLINE uint32 GetTypeHash(const FGridVector& Key) {
	return HashCombine(GetTypeHash(Key.X), GetTypeHash(Key.Y));
}


// �����״
UENUM(BlueprintType)
enum class EGridType : uint8 {
	None,
	Hex,
	Square,
	Circle,
};

// ����ͨ��״̬
UENUM(BlueprintType)
enum class ENodePassFlag : uint8 {
	Pass,
	Block,
};



/**
 * 
 */
UCLASS()
class UOC_GridNode : public UObject
{
	GENERATED_BODY()
	
public:
	// ����С
	UPROPERTY(EditAnywhere,BlueprintReadWrite)
	float Size;

	// ����ռ�����
	UPROPERTY(EditAnywhere,BlueprintReadWrite)
	FVector Location;

	// ���̿ռ�����
	UPROPERTY(EditAnywhere,BlueprintReadWrite)
	FGridVector Coordinate;

	// �����״
	UPROPERTY(EditAnywhere,BlueprintReadWrite)
	EGridType NodeType = EGridType::None;

	// ��������
	UPROPERTY(BlueprintReadWrite)
	AOC_GridMap* GridMap;

	
	/// <summary>
	/// ��ʼ������
	/// </summary>
	/// <param name="InGridMap"></param> 
	/// <param name="InLocation"></param>   ��������
	/// <param name="InCoordinate"></param> ��������
	/// <param name="InSize"></param>       ��С
	UFUNCTION(BlueprintCallable)
	virtual void InitNode(AOC_GridMap* InGridMap, FVector InLocation, FGridVector InCoordinate, float InSize);

	// ��ȡ�������
	UFUNCTION(BlueprintCallable)
	virtual TArray<UOC_GridNode*> GetNeighbors();

	// Ѱ·-Ѱ·����
	UOC_GridNode* PreNode;

	// Ѱ·-ͨ��״̬
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Navigation")
	ENodePassFlag PassFlag = ENodePassFlag::Pass;
	
	// �ж�����Ƿ���ͨ��
	UFUNCTION(BlueprintCallable, Category = "Navigation")
	virtual bool CanPass(AActor* InActor) const;

	// Ѱ·-������еĵ�λ
	UPROPERTY(BlueprintReadWrite, Category = "Navigation")
	TArray<AActor*> NodeActors;


private:

protected:

};
