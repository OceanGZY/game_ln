// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "OC_GridNode.generated.h"


class AOC_GridMap;
class AActor;

// 棋格坐标
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

	// 重载运算符==， 实现TMap中key的规范
	FORCEINLINE friend bool operator==(const FGridVector& Lhs, const FGridVector& Rhs) {
		return (Lhs.X == Rhs.Y) && (Lhs.Y == Rhs.Y);
	}
	
	// 重载运算符+， 满足基本加法运算
	FGridVector operator+ (const FGridVector& F) {
		return FGridVector(this->X + F.X, this->Y + F.Y);
	}
};

// GetTypeHash, 满足TMap中key的规范
FORCEINLINE uint32 GetTypeHash(const FGridVector& Key) {
	return HashCombine(GetTypeHash(Key.X), GetTypeHash(Key.Y));
}


// 棋格形状
UENUM(BlueprintType)
enum class EGridType : uint8 {
	None,
	Hex,
	Square,
	Circle,
};

// 棋格的通行状态
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
	// 棋格大小
	UPROPERTY(EditAnywhere,BlueprintReadWrite)
	float Size;

	// 世界空间坐标
	UPROPERTY(EditAnywhere,BlueprintReadWrite)
	FVector Location;

	// 棋盘空间坐标
	UPROPERTY(EditAnywhere,BlueprintReadWrite)
	FGridVector Coordinate;

	// 棋格形状
	UPROPERTY(EditAnywhere,BlueprintReadWrite)
	EGridType NodeType = EGridType::None;

	// 所属棋盘
	UPROPERTY(BlueprintReadWrite)
	AOC_GridMap* GridMap;

	
	/// <summary>
	/// 初始化函数
	/// </summary>
	/// <param name="InGridMap"></param> 
	/// <param name="InLocation"></param>   世界坐标
	/// <param name="InCoordinate"></param> 棋盘坐标
	/// <param name="InSize"></param>       大小
	UFUNCTION(BlueprintCallable)
	virtual void InitNode(AOC_GridMap* InGridMap, FVector InLocation, FGridVector InCoordinate, float InSize);

	// 获取相邻棋格
	UFUNCTION(BlueprintCallable)
	virtual TArray<UOC_GridNode*> GetNeighbors();

	// 寻路-寻路缓存
	UOC_GridNode* PreNode;

	// 寻路-通行状态
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Navigation")
	ENodePassFlag PassFlag = ENodePassFlag::Pass;
	
	// 判断棋格是否能通行
	UFUNCTION(BlueprintCallable, Category = "Navigation")
	virtual bool CanPass(AActor* InActor) const;

	// 寻路-在棋格中的单位
	UPROPERTY(BlueprintReadWrite, Category = "Navigation")
	TArray<AActor*> NodeActors;


private:

protected:

};
