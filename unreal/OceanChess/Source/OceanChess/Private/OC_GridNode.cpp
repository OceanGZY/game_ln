// Fill out your copyright notice in the Description page of Project Settings.


#include "OC_GridNode.h"


/// <summary>
/// ��ʼ������
/// </summary>
/// <param name="InGridMap"></param>
/// <param name="InLocation"></param>
/// <param name="InCoordinate"></param>
/// <param name="InSize"></param>
void UOC_GridNode::InitNode(AOC_GridMap* InGridMap, FVector InLocation, FGridVector InCoordinate, float InSize)
{
	GridMap = InGridMap;
	Location = InLocation;
	Coordinate = InCoordinate;
	Size = InSize;
}


/// <summary>
/// ��ȡ�������
/// </summary>
/// <returns></returns>
TArray<UOC_GridNode*> UOC_GridNode::GetNeighbors()
{
	return TArray<UOC_GridNode*>();
}


/// <summary>
/// �ж�����Ƿ���ͨ��
/// </summary>
/// <param name="InActor"></param>
/// <returns></returns>
bool UOC_GridNode::CanPass(AActor* InActor) const
{
	if (PassFlag >= ENodePassFlag::Block) {
		return false;
	}

	// �ж��Ƿ�����������վ�ڵ�ǰ�����
	if (NodeActors.Num() > 0 && InActor) {
		if (NodeActors.Contains(InActor)) {
			return true;
		}
		else {
			return false;
		}
	}
	return true;
}
