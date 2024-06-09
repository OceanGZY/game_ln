// Fill out your copyright notice in the Description page of Project Settings.


#include "MultiplayerSubsystem.h"
#include "OnlineSubsystem.h"
#include "OnlineSessionSettings.h"
#include "Online/OnlineSessionNames.h"

UMultiplayerSubsystem::UMultiplayerSubsystem():
	//bind callback to delegate
	CreateSessionCompleteDelegate(FOnCreateSessionCompleteDelegate::CreateUObject(this,&UMultiplayerSubsystem::OnCreateSessionComplete))
	,FindSessionsCompleteDelegate(FOnFindSessionsCompleteDelegate::CreateUObject(this,&UMultiplayerSubsystem::OnFindSessionsComplete))
	,JoinSessionCompleteDelegate(FOnJoinSessionCompleteDelegate::CreateUObject(this,&UMultiplayerSubsystem::OnJoinSessionComplete))
	,DestroySessionCompleteDelegate(FOnDestroySessionCompleteDelegate::CreateUObject(this,&UMultiplayerSubsystem::OnDestroySessionComplete))
	,StartSessionCompleteDelegate(FOnStartSessionCompleteDelegate::CreateUObject(this,&UMultiplayerSubsystem::OnStartSessionComplete))
	
{
	IOnlineSubsystem* Subsystem = IOnlineSubsystem::Get();

	if (Subsystem) {
		SessionInterface = Subsystem->GetSessionInterface();
	}
}

void UMultiplayerSubsystem::CreateSession(int32 NumPublicConnections, FString MatchType)
{
	if (!SessionInterface) {
		return;
	}

	auto ExistingSession = SessionInterface->GetNamedSession(NAME_GameSession);
	if (ExistingSession != nullptr) {

		bCreateSessionOnDestroy = true;
		LastNumPublicConnections = NumPublicConnections;
		LastMatchType = MatchType;

		DestroySession();

		SessionInterface->DestroySession(NAME_GameSession);
	}

	// save handle
	CreateSessionCompleteDelegateHandle =  SessionInterface->AddOnCreateSessionCompleteDelegate_Handle(CreateSessionCompleteDelegate);

	LastSessionSettings = MakeShareable(new FOnlineSessionSettings());
	LastSessionSettings->bIsLANMatch = IOnlineSubsystem::Get()->GetSubsystemName() == "NULL" ? true : false;
	LastSessionSettings->NumPublicConnections = NumPublicConnections;
	LastSessionSettings->bAllowJoinInProgress = true;
	LastSessionSettings->bShouldAdvertise = true;
	LastSessionSettings->bUsesPresence = true;
	LastSessionSettings->bUseLobbiesIfAvailable = true;

	LastSessionSettings->Set(FName("MatchType"), MatchType, EOnlineDataAdvertisementType::ViaOnlineServiceAndPing);


	const ULocalPlayer* LocalPlayer = GetWorld()->GetFirstLocalPlayerFromController();
	if (!SessionInterface->CreateSession(*LocalPlayer->GetPreferredUniqueNetId(), NAME_GameSession, *LastSessionSettings)) {
		SessionInterface->ClearOnCreateSessionCompleteDelegate_Handle(CreateSessionCompleteDelegateHandle);
	
		// broadcast our own custom delegate
		MultiplayerOnCreateSessionComplete.Broadcast(false);
	}
}

void UMultiplayerSubsystem::FindSeesions(int32 MaxSearchResults) 
{
	if (!SessionInterface.IsValid()) {
		return;
	}
	FindSessionsCompleteDelegateHandle = SessionInterface->AddOnFindSessionsCompleteDelegate_Handle(FindSessionsCompleteDelegate);

	LastSessionSearch = MakeShareable(new FOnlineSessionSearch());
	LastSessionSearch->MaxSearchResults = MaxSearchResults;
	LastSessionSearch->bIsLanQuery = IOnlineSubsystem::Get()->GetSubsystemName()=="NULL"?true:false;
	LastSessionSearch->QuerySettings.Set(SEARCH_PRESENCE, true, EOnlineComparisonOp::Equals);

	const ULocalPlayer* LocalPlayer = GetWorld()->GetFirstLocalPlayerFromController();
	if (!SessionInterface->FindSessions(*LocalPlayer->GetPreferredUniqueNetId(), LastSessionSearch.ToSharedRef())) {
		SessionInterface->ClearOnFindSessionsCompleteDelegate_Handle(FindSessionsCompleteDelegateHandle);
		
		MultiPlayerOnFindSessionsComplete.Broadcast(TArray<FOnlineSessionSearchResult>(), false);
	}
}

void UMultiplayerSubsystem::JoinSession(const FOnlineSessionSearchResult& SessionResult)
{
	if (!SessionInterface.IsValid()) {
		MultiPlayerOnJoinSessionComplete.Broadcast(EOnJoinSessionCompleteResult::UnknownError);
		return;
	}

	JoinSessionCompleteDelegateHandle = SessionInterface->AddOnJoinSessionCompleteDelegate_Handle(JoinSessionCompleteDelegate);

	const ULocalPlayer* LocalPlayer = GetWorld()->GetFirstLocalPlayerFromController();
	if (!SessionInterface->JoinSession(*LocalPlayer->GetPreferredUniqueNetId(), NAME_GameSession, SessionResult)) {
		SessionInterface->ClearOnJoinSessionCompleteDelegate_Handle(JoinSessionCompleteDelegateHandle);
	
		MultiPlayerOnJoinSessionComplete.Broadcast(EOnJoinSessionCompleteResult::UnknownError);
	}
}

void UMultiplayerSubsystem::DestroySession()
{
	if (!SessionInterface.IsValid()) {
		MultiPlayerOnDestroySessionComplete.Broadcast(false);
		return;
	}

	DestroySessionCompleteDelegateHandle = SessionInterface->AddOnDestroySessionCompleteDelegate_Handle(DestroySessionCompleteDelegate);

	if (!SessionInterface->DestroySession(NAME_GameSession)) {
		SessionInterface->ClearOnDestroySessionCompleteDelegate_Handle(DestroySessionCompleteDelegateHandle);
		MultiPlayerOnDestroySessionComplete.Broadcast(false);
	}
}

void UMultiplayerSubsystem::StartSession()
{
}

void UMultiplayerSubsystem::OnCreateSessionComplete(FName SessionName, bool bWasSuccessful)
{
	if (SessionInterface) {
		SessionInterface->ClearOnCreateSessionCompleteDelegate_Handle(CreateSessionCompleteDelegateHandle);
	}
	  
	MultiplayerOnCreateSessionComplete.Broadcast(bWasSuccessful);
}

void UMultiplayerSubsystem::OnFindSessionsComplete(bool bWasSuccessful)
{
	if (SessionInterface) {
		SessionInterface->ClearOnFindSessionsCompleteDelegate_Handle(FindSessionsCompleteDelegateHandle);
	}

	if (LastSessionSearch->SearchResults.Num() <= 0) {
		MultiPlayerOnFindSessionsComplete.Broadcast(TArray<FOnlineSessionSearchResult>(), false);
	}

	MultiPlayerOnFindSessionsComplete.Broadcast(LastSessionSearch->SearchResults, bWasSuccessful);

}

void UMultiplayerSubsystem::OnJoinSessionComplete(FName SessionName, EOnJoinSessionCompleteResult::Type Result)
{
	if (SessionInterface) {
		SessionInterface->ClearOnJoinSessionCompleteDelegate_Handle(JoinSessionCompleteDelegateHandle);
	}

	MultiPlayerOnJoinSessionComplete.Broadcast(Result);
}

void UMultiplayerSubsystem::OnDestroySessionComplete(FName SessionName, bool bWasSuccessful)
{
	if (SessionInterface) {
		SessionInterface->ClearOnDestroySessionCompleteDelegate_Handle(DestroySessionCompleteDelegateHandle);
	}

	if (bWasSuccessful && bCreateSessionOnDestroy) {
		bCreateSessionOnDestroy = false;
		CreateSession(LastNumPublicConnections,LastMatchType);
	}

	MultiPlayerOnDestroySessionComplete.Broadcast(bWasSuccessful);
}

void UMultiplayerSubsystem::OnStartSessionComplete(FName SessionName, bool bWasSuccessful)
{
}
