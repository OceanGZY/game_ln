// Fill out your copyright notice in the Description page of Project Settings.


#include "OC_GridMap.h"
#include "OC_HexNode.h"

#include "Engine/Engine.h"
//#include "Math/UnrealMathUtility.h"

// Sets default values
AOC_GridMap::AOC_GridMap()
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

}

// Called when the game starts or when spawned
void AOC_GridMap::BeginPlay()
{
	Super::BeginPlay();

	// 重新生成棋盘
	GenerateGridMap();
	
}

void AOC_GridMap::PostInitProperties() {
	Super::PostInitProperties();

	GenerateGridMap();
}

// Called every frame
void AOC_GridMap::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

}

// 编辑器中改变属性时调用
#if WITH_EDITOR
void AOC_GridMap::PostEditChangeProperty(FPropertyChangedEvent& PropertyChangedEvent)
{
	Super::PostEditChangeProperty(PropertyChangedEvent);

	// 当行、列、大小改变时， 重新生成棋盘
	if (PropertyChangedEvent.Property->GetName() == "Row" ||
		PropertyChangedEvent.Property->GetName() == "Column" ||
		PropertyChangedEvent.Property->GetName() == "Size") 
	{
		// 重新生成棋盘
		GenerateGridMap();
	}
}
#endif

/// <summary>
/// 生成棋盘
/// </summary>
void AOC_GridMap::GenerateGridMap()
{
	for (auto node : NodeMap) {
		// 标记垃圾回收
		if (node.Value) {
			node.Value->MarkAsGarbage();
		}
	}
	// 重置map
	NodeMap.Reset();

	// 重新生成棋格
	GenerateNodes(Size, Row, Column);
	
}

/// <summary>
/// 生成棋格
/// </summary>
/// <param name="InSize"></param>
/// <param name="InRow"></param>
/// <param name="InColumn"></param>
void AOC_GridMap::GenerateNodes(float InSize, int InRow, int InColumn)
{
	switch (MapType)
	{
	case EGridType::None:
		break;
	case EGridType::Hex: // 六边形
		GenerateHexNodes(InSize, InRow, InColumn);
		break;
	case EGridType::Square:
		break;
	case EGridType::Circle:
		break;
	default:
		break;
	}
	// 初始化棋格
	InitNodes();
}

/// <summary>
/// 生成6边形棋格
/// </summary>
/// <param name="InSize"></param>
/// <param name="InRow"></param>
/// <param name="InColumn"></param>
void AOC_GridMap::GenerateHexNodes(float InHexSize, int InRow, int InColumn)
{
	FVector tHexLocation;
	for (int i = 0; i < InRow; i++)
	{
		for (int j = 0; j < InColumn; j++)
		{
			// UE中，横向坐标轴是Y轴， 纵向坐标轴是X轴，需调换在二维坐标系中的XY值
			FGridVector tHexVector = FGridVector(j,i);
			tHexLocation.X = 1.5 * InHexSize * i;
			tHexLocation.Y = i % 2 == 0 ? (FMath::Sqrt(3.0) * InHexSize * j) : (FMath::Sqrt(3.0) * InHexSize * j + FMath::Sqrt(3.0) * 0.5 * InHexSize);
			tHexLocation.Z = 0;
			tHexLocation += GetActorLocation();

			// 棋格初始化
			UOC_HexNode* tNode = NewObject<UOC_HexNode>(this);
			tNode->InitNode(this, tHexLocation, tHexVector, InHexSize);
			NodeMap.Add(tHexVector, tNode);

			//GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, "UOC_HexNode init ");
		
		}
	}
	GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, FString::FromInt(NodeMap.Num()));
}

/// <summary>
/// 初始化棋格
/// </summary>
void AOC_GridMap::InitNodes()
{
	switch (MapType)
	{
	case EGridType::None:
		break;
	case EGridType::Hex: // 六边形棋格
		InitHexNodes();
		break;
	case EGridType::Square:
		break;
	case EGridType::Circle:
		break;
	default:
		break;
	}
}

/// <summary>
/// 初始化六边形棋格
/// </summary>
void AOC_GridMap::InitHexNodes()
{

	// 设置六边形棋格相邻棋格，  判断对应的坐标棋格是否存在，并赋值
	for (auto node : NodeMap) {
		UOC_HexNode* tHexNode = Cast<UOC_HexNode>(node.Value);
		if (!tHexNode) {
			continue;
		}
		FGridVector tRightUp = node.Key.Y % 2 == 0 ? node.Key + FGridVector(0, 1) : node.Key + FGridVector(1, 1);
		if (NodeMap.Contains(tRightUp) && NodeMap[tRightUp]->IsA(UOC_HexNode::StaticClass())) {
			tHexNode->RightUpNode = Cast<UOC_HexNode>(NodeMap[tRightUp]);
		}


		FGridVector tRight =node.Key + FGridVector(1, 0);
		if (NodeMap.Contains(tRight) && NodeMap[tRight]->IsA(UOC_HexNode::StaticClass())) {
			tHexNode->RightNode = Cast<UOC_HexNode>(NodeMap[tRight]);
		}


		FGridVector tRightDown = node.Key.Y % 2 == 0 ? node.Key + FGridVector(0, -1) : node.Key + FGridVector(1, -1);
		if (NodeMap.Contains(tRightDown) && NodeMap[tRightDown]->IsA(UOC_HexNode::StaticClass())) {
			tHexNode->RightDownNode = Cast<UOC_HexNode>(NodeMap[tRightDown]);
		}


		FGridVector tLeftDown = node.Key.Y % 2 == 0 ? node.Key + FGridVector(-1, -1) : node.Key + FGridVector(0, -1);
		if (NodeMap.Contains(tLeftDown) && NodeMap[tLeftDown]->IsA(UOC_HexNode::StaticClass())) {
			tHexNode->LeftDownNode = Cast<UOC_HexNode>(NodeMap[tLeftDown]);
		}


		FGridVector tLeft = node.Key + FGridVector(-1, 0);
		if (NodeMap.Contains(tLeft) && NodeMap[tLeft]->IsA(UOC_HexNode::StaticClass())) {
			tHexNode->LeftNode = Cast<UOC_HexNode>(NodeMap[tLeft]);
		}

		FGridVector tLeftUp = node.Key.Y % 2 == 0 ? node.Key + FGridVector(-1, 1) : node.Key + FGridVector(0, 1);
		if (NodeMap.Contains(tLeftUp) && NodeMap[tLeftUp]->IsA(UOC_HexNode::StaticClass())) {
			tHexNode->LeftUpNode = Cast<UOC_HexNode>(NodeMap[tLeftUp]);
		}
		
	}
}


/// <summary>
/// 根据棋盘坐标，获取棋格
/// </summary>
/// <param name="InCoord"></param> 棋盘坐标
/// <returns></returns>
UOC_GridNode* AOC_GridMap::GetNode(FGridVector InCoord) const
{
	if (NodeMap.Contains(InCoord)) {
		GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Green, "get node incoord");
		return NodeMap[InCoord];			
	}
	else {
		return nullptr;
	}
}

/// <summary>
/// A*算法寻路
/// </summary>
/// <param name="Path"></param>
/// <param name="InActor"></param>
/// <param name="FromNode"></param>
/// <param name="ToNode"></param>
/// <param name="StopSteps"></param>
/// <returns></returns>
bool AOC_GridMap::FindPath(TArray<UOC_GridNode*>& Path, AActor* InActor, UOC_GridNode* FromNode, UOC_GridNode* ToNode, int StopSteps)
{
	Path.Empty();
	// 安全判断
	if (!FromNode || !ToNode) {
		GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Green, "FromNode ||  ToNode is null");

		return false;
	}
	if (!NodeMap.FindKey(FromNode) || !NodeMap.FindKey(ToNode)) {
		GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Green, "FromNode ||  ToNode is not in nodemap");

		return false;
	}

	// 获取实际所有终点
	TArray<UOC_GridNode*> ToNodes = GetNodeNeighbors(ToNode, StopSteps);

	for (int i = ToNodes.Num() - 1; i >= 0; i--) {
		if (!ToNodes[i]->CanPass(InActor)) {
			ToNodes.RemoveAt(i);
		}
	}

	// 判断起点是否存在
	if (!FromNode->CanPass(InActor)) {
		return false;
	}

	if (ToNodes.Num() == 0) {
		return false;
	}

	// 判断是否已经到达终点
	if (ToNodes.Contains(FromNode)) {
		return true;
	}
	
	// 将要遍历的路点
	TArray<UOC_GridNode*> openList;
	// 已经遍历完成的路点
	TArray<UOC_GridNode*> closeList;


	// 当前所在路点
	UOC_GridNode* nowNode;
	nowNode = FromNode;
	openList.Add(nowNode);

	bool bFinded = false;


	// A*寻路
	while (!bFinded)
	{
		// 移出openList, 加入closeList
		openList.Remove(nowNode);
		closeList.Add(nowNode);

		// 获取邻居路点
		TArray<UOC_GridNode*> neighbors = nowNode->GetNeighbors();
		for (auto neighbor : neighbors) {
			if (!neighbor) {
				continue;
			}

			// 判断相邻路点 是否为终点
			if (ToNodes.Contains(neighbor)) {
				bFinded = true;
				ToNode = neighbor;
				neighbor->PreNode = nowNode;
			}

			// 如果在closeList 或不能通行则跳过
			if (closeList.Contains(neighbor) || !neighbor->CanPass(InActor)) {
				continue;
			}

			// 如果不在openList ，则加入openList的队尾，以备用
			if (!openList.Contains(neighbor)) {
				openList.Add(neighbor);
				neighbor->PreNode = nowNode;
			}
		}

		// 取出队首的路点， 设置为下次循环遍历的路点
		if (openList.Num() <= 0) {
			break;
		}
		else {
			nowNode = openList[0];
		}
	}
	openList.Empty();
	closeList.Empty();


	// 找到了路径
	if (bFinded) {
		UOC_GridNode* tNode = ToNode;
		while (tNode != FromNode)
		{
			Path.Add(tNode);
			tNode = Cast<UOC_GridNode>(tNode->PreNode);
		}

		// 获取的路径是 从终点到起点的路径，需要反转成 从起点到终点
		Algo::Reverse(Path);
		return true;
	}

	return false;

	//https://github.com/TY1003/EZGame_AutoChess
}


/// <summary>
/// 判断路径是否存在
/// </summary>
/// <param name="InActor"></param>
/// <param name="FromNode"></param>
/// <param name="ToNode"></param>
/// <param name="StopSteps"></param>
/// <returns></returns>
bool AOC_GridMap::IsPathExist(AActor* InActor, UOC_GridNode* FromNode, UOC_GridNode* ToNode, int StopSteps)
{
	TArray<UOC_GridNode*> Path;

	return FindPath(Path, InActor, FromNode, ToNode, StopSteps);
}


/// <summary>
/// 获取相邻的棋格
/// </summary>
/// <param name="InNode"></param>
/// <param name="InStep"></param>
/// <returns></returns>
TArray<UOC_GridNode*> AOC_GridMap::GetNodeNeighbors(UOC_GridNode* InNode, int InStep) const
{
	int neighborSteps = InStep;
	TArray<UOC_GridNode*> nowCheckList;
	TArray<UOC_GridNode*> nextCheckList;
	TArray<UOC_GridNode*> findList;

	nextCheckList.AddUnique(InNode);
	findList.AddUnique(InNode);


	// 使用While 
	while (neighborSteps >0)
	{
		nowCheckList = nextCheckList;
		nextCheckList.Empty();

		for (UOC_GridNode* tempNode : nowCheckList)
		{
			if (!tempNode) {
				continue;
			}

			TArray<UOC_GridNode*> neighbors = tempNode->GetNeighbors();
			for (UOC_GridNode* temp :neighbors )
			{
				if (findList.Contains(temp)) {
					continue;
				}
				findList.AddUnique(temp);
				nextCheckList.AddUnique(temp);
			}
		}
		neighborSteps -= 1;
	}
	GEngine->AddOnScreenDebugMessage(-1, 5.0f, FColor::Green, FString::FromInt(findList.Num()));

	return findList;
}

