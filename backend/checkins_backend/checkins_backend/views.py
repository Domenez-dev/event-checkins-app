from django.shortcuts import render

def api_index(request):
    return render(request, 'index.html')

