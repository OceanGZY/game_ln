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


	// �������
	UPROPERTY(EditAnywhere,BlueprintReadWrite)
	UOC_HexNode* RightUpNode;

	// �����
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	UOC_HexNode* RightNode;

	// �������
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	UOC_HexNode* RightDownNode;

	// �������
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	UOC_HexNode* LeftDownNode;

	// �����
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	UOC_HexNode* LeftNode;

	// �������
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	UOC_HexNode* LeftUpNode;


	// ��ȡ�������-���Ǹ��෽��
	virtual TArray<UOC_GridNode*> GetNeighbors() override;


private:
protected:

};
