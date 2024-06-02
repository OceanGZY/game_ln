// Fill out your copyright notice in the Description page of Project Settings.


#include "MyObject.h"

UMyObject::UMyObject()
{
	MyFloat = 0.0f;
}

void UMyObject::MyFuction()
{
	UE_LOG(LogTemp, Log, TEXT("Hello GZY"));

	UE_LOG(LogTemp, Warning, TEXT("Hello GZY"));

	UE_LOG(LogTemp, Error, TEXT("Hello GZY"));
}
