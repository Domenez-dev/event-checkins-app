from django.core.management.base import BaseCommand
from users.models import User

class Command(BaseCommand):
    help = "Seed users table"

    def handle(self, *args, **kwargs):
        users_data = [
            {"email": "organizer1@gdg.dz", "name": "Organizer One", "password": "password123"},
            {"email": "organizer2@gdg.dz", "name": "Organizer Two", "password": "password456"},
        ]
        for user_data in users_data:
            user = User.objects.create_user(
                email=user_data["email"],
                name=user_data["name"],
                password=user_data["password"]
            )
            self.stdout.write(f"User {user.email} created successfully!")
        
        super_user = User.objects.create_superuser(
            email = "superuser@gdg.dz",
            name = "Zakaria",
            password = "password777"
        )
        self.stdout.write(f"User {super_user.email} created successfully!")
