// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "OC_GridNode.h"
#include "OC_HexNode.generated.h"

/**
 * 
 */
UCLASS()
class UOC_HexNode : public UOC_GridNode
{
	GENERATED_BODY()
	

public:

	UOC_HexNode();


	// 右上棋格
	UPROPERTY(EditAnywhere,BlueprintReadWrite)
	UOC_HexNode* RightUpNode;

	// 右棋格
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	UOC_HexNode* RightNode;

	// 右下棋格
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	UOC_HexNode* RightDownNode;

	// 左下棋格
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	UOC_HexNode* LeftDownNode;

	// 左棋格
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	UOC_HexNode* LeftNode;

	// 左上棋格
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	UOC_HexNode* LeftUpNode;


	// 获取相邻棋格-覆盖父类方法
	virtual TArray<UOC_GridNode*> GetNeighbors() override;


private:
protected:

};
