from model_mommy.recipe import Recipe, seq
from .models import Account

account_recipe = Recipe(Account,email = seq('teste@teste.com', increment_by=3),
                                first_name = seq('Name', increment_by=3),
                                last_name = seq('Last Name', increment_by=3),
                                password=seq('password', increment_by=3),
                                )