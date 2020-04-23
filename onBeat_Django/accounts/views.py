from django.shortcuts import render
from rest_framework import viewsets, permissions, generics, status
from rest_auth.registration.views import SocialConnectView
from allauth.socialaccount.providers.spotify.views import SpotifyOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.models import SocialAccount, SocialToken, SocialApp

import datetime
import json
import requests

# Linked Account Views


class SpotifyConnect(SocialConnectView):
    """ Logs already authenticated user into Spotify account """
    adapter_class = SpotifyOAuth2Adapter
    callback_url = 'onbeat://callback'
    client_class = OAuth2Client

    def get_response(self):
        """
            This method overrides the get_response method in the LoginView class
            located in rest_auth/views.py. This method is responsible for returning a response
            and in this case we want to return a user's spotify access token ad refresh token.
        """
        serializer_class = self.get_response_serializer()
        if getattr(settings, 'REST_USE_JWT', False):
            data = {'user': self.user, 'token': self.token}
            serializer = serializer_class(instance=data, context={
                                          'request': self.request})
        else:
            serializer = serializer_class(instance=self.token, context={
                                          'request': self.request})
        social_account = SocialAccount.objects.get(
            user=self.user, provider="spotify")
        spotify_token = SocialToken.objects.get(account=social_account)
        return Response({'access_token': spotify_token.token, 'refresh_token': spotify_token.token_secret, "expires_in": 3600}, status=status.HTTP_200_OK)


class SpotifyRefresh(generics.GenericAPIView):
    permission_classes = (TokenOrSessionAuthentication)
    serializer_class = RefreshTokenSerializer

    def post(self, request, *args, **kwargs):
        # should spotify refresh token be verified against user?
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        refresh_token = serializer.validated_data['refresh_token']
        if SocialToken.objects.filter(token_secret=refresh_token).exists():
            token = SocialToken.objects.get(token_secret=refresh_token)
            spotify = SocialApp.objects.get(name="Spotify")
            try:
                spotifyurl = "https://accounts.spotify.com/api/token"
                spotifydata = {'grant_type': 'refresh_token',
                               'refresh_token': token.token_secret}
                response = requests.post(spotifyurl, data=spotifydata, auth=(
                    spotify.client_id, spotify.secret))
                response = json.loads(response.text)
                token.token = response['access_token']
                token.save()
                return Response({'access_token': response['access_token'], 'refresh_token': token.token_secret, "expires_in": 3600}, status=status.HTTP_200_OK)
            except:
                return Response({'access_token': token.token, 'refresh_token': token.token_secret}, status=status.HTTP_200_OK)

        # should probably return current tokens
        return Response({"error": "Social Token does not exist."}, status=status.HTTP_400_BAD_REQUEST)


class SpotifyLogout(generics.GenericAPIView):
    permission_classes = (TokenOrSessionAuthentication)

    def post(self, request, *args, **kwargs):
        if SocialAccount.objects.filter(user=request.user, provider="spotify").exists():
            social_account = SocialAccount.objects.get(
                user=request.user, provider="spotify")
            social_account.delete()
            return Response({'message': 'Spotify logout successful.'}, status=status.HTTP_200_OK)
        # should probably return current tokens
        return Response({"error": "User has not logged into Spotify."}, status=status.HTTP_400_BAD_REQUEST)