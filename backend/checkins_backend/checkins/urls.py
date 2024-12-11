from django.urls import path
from . import views

urlpatterns = [
    path('qr-code-scan/', views.ScanQRCodeView.as_view(), name="scan_qr_code"),
]
