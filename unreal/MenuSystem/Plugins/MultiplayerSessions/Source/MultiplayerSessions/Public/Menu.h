// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Blueprint/UserWidget.h"
#include "Interfaces/OnlineSessionInterface.h"
#include "Menu.generated.h"
/**
 * 
 */
UCLASS()
class MULTIPLAYERSESSIONS_API UMenu : public UUserWidget
{
	GENERATED_BODY()

public:
	
	UFUNCTION(BlueprintCallable)
	void MenuSetup(int32 NumOfPublicConnections =4,FString TypeOfMatch= FString(TEXT("FreeForAll")));
	
protected:
	virtual bool Initialize() override; 
	virtual void NativeDestruct() override ;

	// 在MultiplayerSessionsSubsystem上 触发的  自定义代理 的回调

	UFUNCTION()
	void OncreateSession(bool bWasUseful);
	void OnFindSessions(const TArray<FOnlineSessionSearchResult>& SessionResults, bool bWasSuccessful);
	void OnJoinSession(EOnJoinSessionCompleteResult::Type Result);
	UFUNCTION()
	void OnDestroySession(bool bWasSuccessful);
	UFUNCTION()
	void OnStartSession(bool bWasSuccessful);

private:

	UPROPERTY(meta = (BindWidget))
	class UButton* HostBtn;

	UPROPERTY(meta = (BindWidget))
	UButton* JoinBtn;

	UFUNCTION(BlueprintCallable)
	void HostBtnClicked();

	UFUNCTION(BlueprintCallable)
	void JoinBtnClicked();

	void MenuTearDown();

	// 自制的MultiplayerSessionsSubsystem
	class UMultiplayerSessionsSubsystem* MultiplayerSessionsSubsystem;

	int32 NumPublicConnections;
	FString MatchType{ TEXT("FreeForAll") };
};
