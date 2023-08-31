// Fill out your copyright notice in the Description page of Project Settings.


#include "ShapeGameModeBase.h"

AShapeGameModeBase::AShapeGameModeBase()
{
	Score = 0;
}

void AShapeGameModeBase::IncreaseScore()
{
	Score++;
}
