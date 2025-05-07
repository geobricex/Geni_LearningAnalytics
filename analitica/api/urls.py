from django.urls import path
from .views import (
    academic_summary,
    interaction_summary,
    socioeconomic_summary,
    engagement_summary,
)

urlpatterns = [
    path('level1/', academic_summary, name='academic_summary'),
    path('level2/', interaction_summary, name='interaction_summary'),
    path('level3/', socioeconomic_summary, name='socioeconomic_summary'),
    path('level4/', engagement_summary, name='engagement_summary'),
]
