from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
# fff




class LoginView(APIView):
    
    """
    Handles user login and returns a token.
    """

    def post(self, request, *args, **kwargs):
        
        if request.method == 'OPTIONS':  # Use request.method instead of APIView.method
            # Handle OPTIONS method
            pass
        
        
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"error": "Email and password are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(request, email=email, password=password)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {"message": "Logged in successfully!", "token": token.key,"is_admin": user.is_admin},
                status=status.HTTP_200_OK
            )
           
        else:
            return Response(
                {"error": "Invalid email or password."},
                status=status.HTTP_401_UNAUTHORIZED
            )


class LogoutView(APIView):
    """
    Handles user logout by deleting the token.
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        try:
            token = Token.objects.get(user=user)
            token.delete()
            return Response(
                {"message": "Logged out successfully!"},
                status=status.HTTP_200_OK
            )
        except Token.DoesNotExist:
            return Response(
                {"error": "Token not found."},
                status=status.HTTP_400_BAD_REQUEST
            )
