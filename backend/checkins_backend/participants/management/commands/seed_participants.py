import requests
from django.core.management.base import BaseCommand
from django.test import Client

class Command(BaseCommand):
    help = "Seed the database with participants via the create view API"

    def handle(self, *args, **kwargs):
        # Sample data
        participants_data = [
            {"name": "Zakaria", "email": "bouzara.Zakaria.25@gmail.com", "event_id": 1},
            {"name": "Younes", "email": "zizoshtein07@gmail.com", "event_id": 1},
            {"name": "Abdou", "email": "abderrahmaneferhat93@gmail.com", "event_id": 1},
        ]

        # Base URL for the API
        base_url = "http://localhost:8000/participants/1/create/"

        client = Client()
        response = client.get('/auth/login')
        print(response)
        csrftoken = response.cookies['csrftoken'].value

        headers = {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
        }

        for data in participants_data:
            try:
                # Make POST request to the create participant API
                response = requests.post(base_url, data=data, headers=headers)
                print(response.json())
                if response.status_code == 201:
                    self.stdout.write(f"Successfully created participant: {data['name']}")
                else:
                    self.stderr.write(
                        f"Failed to create participant {data['name']}: {response.json()}"
                    )
            except requests.RequestException as e:
                self.stderr.write(f"Error while creating participant {data['name']}: {e}")
