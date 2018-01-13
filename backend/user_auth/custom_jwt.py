from user_auth.serializers import AccountSerializer

def jwt_response_payload_handler(token, user=None, request=None):
    """ Custom response payload handler.
    This function controlls the custom payload after login or token refresh. This data is returned through the web API.
    """
    return {
        'token': token,
        'user': AccountSerializer(user, context={'request': request}).data
    }
