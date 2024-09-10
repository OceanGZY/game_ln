// Fill out your copyright notice in the Description page of Project Settings.


#include "OC_HexNode.h"

/// <summary>
/// 初始化函数
/// </summary>
UOC_HexNode::UOC_HexNode()
{
	NodeType = EGridType::Hex;
}

/// <summary>
/// 获取相邻棋格
/// </summary>
/// <returns></returns>
TArray<UOC_GridNode*> UOC_HexNode::GetNeighbors()
{
	TArray<UOC_GridNode*> nearNodes;
	if (RightUpNode) {
		nearNodes.Add(RightUpNode);
	}
	if (RightNode) {
		nearNodes.Add(RightNode);
	}
	if (RightDownNode) {
		nearNodes.Add(RightDownNode);
	}
	if (LeftUpNode) {
		nearNodes.Add(LeftUpNode);
	}
	if (LeftNode) {
		nearNodes.Add(LeftNode);
	}
	if (LeftDownNode) {
		nearNodes.Add(LeftDownNode);
	}

	return nearNodes;
}
