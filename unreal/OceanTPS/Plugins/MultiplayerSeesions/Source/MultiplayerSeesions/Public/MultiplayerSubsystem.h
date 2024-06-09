// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Subsystems/GameInstanceSubsystem.h"
#include "Interfaces/OnlineSessionInterface.h"
#include "MultiplayerSubsystem.generated.h"


// Declare own custom delegate
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FMultiPlayerOnCreateSessionComplete, bool, bWasSuccessful);
DECLARE_MULTICAST_DELEGATE_TwoParams(FMultiPlayerOnFindSessionsComplete,const TArray<FOnlineSessionSearchResult>& SessionResults,bool bWasSuccessful);
DECLARE_MULTICAST_DELEGATE_OneParam(FMultiPlayerOnJoinSessionComplete, EOnJoinSessionCompleteResult::Type Result);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FMultiPlayerOnDestroySessionComplete, bool, bWasSuccessful);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FMultiPlayerOnStartSessionComplete, bool, bWasSuccessful);


/**
 * 
 */
UCLASS()
class MULTIPLAYERSEESIONS_API UMultiplayerSubsystem : public UGameInstanceSubsystem
{
	GENERATED_BODY()

public:
	UMultiplayerSubsystem();

	/*
	* handle sesiion function
	*/
	void CreateSession(int32 NumPublicConnections,FString MatchType);
	void FindSeesions(int32 MaxSearchResults);
	void JoinSession(const FOnlineSessionSearchResult& SessionResult);
	void DestroySession();
	void StartSession();


	/*
	* our own delegates for menu bind callbacks to 
	*/
	FMultiPlayerOnCreateSessionComplete MultiplayerOnCreateSessionComplete;
	FMultiPlayerOnFindSessionsComplete MultiPlayerOnFindSessionsComplete;
	FMultiPlayerOnJoinSessionComplete MultiPlayerOnJoinSessionComplete;
	FMultiPlayerOnDestroySessionComplete MultiPlayerOnDestroySessionComplete;
	FMultiPlayerOnStartSessionComplete MultiPlayerOnStartSessionComplete;


protected:

	/* 
	* callback function for delegate
	*/
	void OnCreateSessionComplete(FName SessionName,bool bWasSuccessful);
	void OnFindSessionsComplete(bool bWasSuccessful);
	void OnJoinSessionComplete(FName SessionName, EOnJoinSessionCompleteResult::Type Result);
	void OnDestroySessionComplete(FName SessionName, bool bWasSuccessful);
	void OnStartSessionComplete(FName SessionName, bool bWasSuccessful);

private:
	IOnlineSessionPtr SessionInterface;

	TSharedPtr<class FOnlineSessionSettings, ESPMode::ThreadSafe> LastSessionSettings;
	TSharedPtr<class FOnlineSessionSearch, ESPMode::ThreadSafe> LastSessionSearch;

	/*
	* online session interface delegate
	*/
	FOnCreateSessionCompleteDelegate CreateSessionCompleteDelegate;
	FDelegateHandle CreateSessionCompleteDelegateHandle;

	FOnFindSessionsCompleteDelegate FindSessionsCompleteDelegate;
	FDelegateHandle FindSessionsCompleteDelegateHandle;

	FOnJoinSessionCompleteDelegate JoinSessionCompleteDelegate;
	FDelegateHandle JoinSessionCompleteDelegateHandle;

	FOnDestroySessionCompleteDelegate DestroySessionCompleteDelegate;
	FDelegateHandle DestroySessionCompleteDelegateHandle;

	FOnStartSessionCompleteDelegate StartSessionCompleteDelegate;
	FDelegateHandle StartSessionCompleteDelegateHandle;


	bool bCreateSessionOnDestroy{ false };
	int32 LastNumPublicConnections;
	FString LastMatchType;

};
