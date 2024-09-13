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

	// ������������
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

// �༭���иı�����ʱ����
#if WITH_EDITOR
void AOC_GridMap::PostEditChangeProperty(FPropertyChangedEvent& PropertyChangedEvent)
{
	Super::PostEditChangeProperty(PropertyChangedEvent);

	// ���С��С���С�ı�ʱ�� ������������
	if (PropertyChangedEvent.Property->GetName() == "Row" ||
		PropertyChangedEvent.Property->GetName() == "Column" ||
		PropertyChangedEvent.Property->GetName() == "Size") 
	{
		// ������������
		GenerateGridMap();
	}
}
#endif

/// <summary>
/// ��������
/// </summary>
void AOC_GridMap::GenerateGridMap()
{
	for (auto node : NodeMap) {
		// �����������
		if (node.Value) {
			node.Value->MarkAsGarbage();
		}
	}
	// ����map
	NodeMap.Reset();

	// �����������
	GenerateNodes(Size, Row, Column);
	
}

/// <summary>
/// �������
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
	case EGridType::Hex: // ������
		GenerateHexNodes(InSize, InRow, InColumn);
		break;
	case EGridType::Square:
		break;
	case EGridType::Circle:
		break;
	default:
		break;
	}
	// ��ʼ�����
	InitNodes();
}

/// <summary>
/// ����6�������
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
			// UE�У�������������Y�ᣬ ������������X�ᣬ������ڶ�ά����ϵ�е�XYֵ
			FGridVector tHexVector = FGridVector(j,i);
			tHexLocation.X = 1.5 * InHexSize * i;
			tHexLocation.Y = i % 2 == 0 ? (FMath::Sqrt(3.0) * InHexSize * j) : (FMath::Sqrt(3.0) * InHexSize * j + FMath::Sqrt(3.0) * 0.5 * InHexSize);
			tHexLocation.Z = 0;
			tHexLocation += GetActorLocation();

			// ����ʼ��
			UOC_HexNode* tNode = NewObject<UOC_HexNode>(this);
			tNode->InitNode(this, tHexLocation, tHexVector, InHexSize);
			NodeMap.Add(tHexVector, tNode);

			//GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, "UOC_HexNode init ");
		
		}
	}
	GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, FString::FromInt(NodeMap.Num()));
}

/// <summary>
/// ��ʼ�����
/// </summary>
void AOC_GridMap::InitNodes()
{
	switch (MapType)
	{
	case EGridType::None:
		break;
	case EGridType::Hex: // ���������
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
/// ��ʼ�����������
/// </summary>
void AOC_GridMap::InitHexNodes()
{

	// ��������������������  �ж϶�Ӧ����������Ƿ���ڣ�����ֵ
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
/// �����������꣬��ȡ���
/// </summary>
/// <param name="InCoord"></param> ��������
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
/// A*�㷨Ѱ·
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
	// ��ȫ�ж�
	if (!FromNode || !ToNode) {
		GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Green, "FromNode ||  ToNode is null");

		return false;
	}
	if (!NodeMap.FindKey(FromNode) || !NodeMap.FindKey(ToNode)) {
		GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Green, "FromNode ||  ToNode is not in nodemap");

		return false;
	}

	// ��ȡʵ�������յ�
	TArray<UOC_GridNode*> ToNodes = GetNodeNeighbors(ToNode, StopSteps);

	for (int i = ToNodes.Num() - 1; i >= 0; i--) {
		if (!ToNodes[i]->CanPass(InActor)) {
			ToNodes.RemoveAt(i);
		}
	}

	// �ж�����Ƿ����
	if (!FromNode->CanPass(InActor)) {
		return false;
	}

	if (ToNodes.Num() == 0) {
		return false;
	}

	// �ж��Ƿ��Ѿ������յ�
	if (ToNodes.Contains(FromNode)) {
		return true;
	}
	
	// ��Ҫ������·��
	TArray<UOC_GridNode*> openList;
	// �Ѿ�������ɵ�·��
	TArray<UOC_GridNode*> closeList;


	// ��ǰ����·��
	UOC_GridNode* nowNode;
	nowNode = FromNode;
	openList.Add(nowNode);

	bool bFinded = false;


	// A*Ѱ·
	while (!bFinded)
	{
		// �Ƴ�openList, ����closeList
		openList.Remove(nowNode);
		closeList.Add(nowNode);

		// ��ȡ�ھ�·��
		TArray<UOC_GridNode*> neighbors = nowNode->GetNeighbors();
		for (auto neighbor : neighbors) {
			if (!neighbor) {
				continue;
			}

			// �ж�����·�� �Ƿ�Ϊ�յ�
			if (ToNodes.Contains(neighbor)) {
				bFinded = true;
				ToNode = neighbor;
				neighbor->PreNode = nowNode;
			}

			// �����closeList ����ͨ��������
			if (closeList.Contains(neighbor) || !neighbor->CanPass(InActor)) {
				continue;
			}

			// �������openList �������openList�Ķ�β���Ա���
			if (!openList.Contains(neighbor)) {
				openList.Add(neighbor);
				neighbor->PreNode = nowNode;
			}
		}

		// ȡ�����׵�·�㣬 ����Ϊ�´�ѭ��������·��
		if (openList.Num() <= 0) {
			break;
		}
		else {
			nowNode = openList[0];
		}
	}
	openList.Empty();
	closeList.Empty();


	// �ҵ���·��
	if (bFinded) {
		UOC_GridNode* tNode = ToNode;
		while (tNode != FromNode)
		{
			Path.Add(tNode);
			tNode = Cast<UOC_GridNode>(tNode->PreNode);
		}

		// ��ȡ��·���� ���յ㵽����·������Ҫ��ת�� ����㵽�յ�
		Algo::Reverse(Path);
		return true;
	}

	return false;

	//https://github.com/TY1003/EZGame_AutoChess
}


/// <summary>
/// �ж�·���Ƿ����
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
/// ��ȡ���ڵ����
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


	// ʹ��While 
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

