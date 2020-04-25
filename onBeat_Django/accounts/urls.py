from django.urls import path, re_path, include
from . import views

urlpatterns = [
    re_path(r'^rest-auth/', include('rest_auth.urls')),
    re_path(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    re_path(r'^spotify-authentication/', views.SpotifyConnect.as_view()),
    re_path(r'^spotify-refresh/', views.SpotifyRefresh.as_view()),
    re_path(r'^spotify-logout/', views.SpotifyLogout.as_view()),
    path('allauth/', include("allauth.urls"))
    # path('profile/', views.get_profile),
]