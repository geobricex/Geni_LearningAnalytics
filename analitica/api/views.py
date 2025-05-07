from rest_framework.decorators import api_view
from rest_framework.response import Response
from api import services

#Level 1
@api_view(["POST"])
def academic_summary(request):

    summary = services.academic_summary(request.data, language="en")

    return Response(summary)

#Level 2
@api_view(["POST"])
def interaction_summary(request):

    summary = services.interaction_summary(request.data, language="en")

    return Response(summary)

#Level 3
@api_view(["POST"])

def socioeconomic_summary(request):
    summary = services.socioeconomic_summary(request.data, language="en")

    return Response(summary)    

#Level 4
@api_view(["POST"])
def engagement_summary(request):

    summary = services.engagement_summary(request.data, language="en")

    return Response(summary)    