from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from user_auth import views
from todolist import views as todoViews

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'todolists', todoViews.TodoListViewSet)
router.register(r'tasks', todoViews.TasksViewSet)
urlpatterns = [
    # Core Routed URLs
    path('api/v1/', include(router.urls)),

    # JWT Auth
    path('api/v1/auth/obtain_token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    # Browsable API
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('admin/', admin.site.urls),
  
    
]
print(router.urls)