// Fill out your copyright notice in the Description page of Project Settings.


#include "OC_GridNode.h"


/// <summary>
/// 初始化函数
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
/// 获取相邻棋格
/// </summary>
/// <returns></returns>
TArray<UOC_GridNode*> UOC_GridNode::GetNeighbors()
{
	return TArray<UOC_GridNode*>();
}


/// <summary>
/// 判断棋格是否能通行
/// </summary>
/// <param name="InActor"></param>
/// <returns></returns>
bool UOC_GridNode::CanPass(AActor* InActor) const
{
	if (PassFlag >= ENodePassFlag::Block) {
		return false;
	}

	// 判断是否有其他棋子站在当前棋格上
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
