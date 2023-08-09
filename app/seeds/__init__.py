from flask.cli import AppGroup
from .users import seed_users, undo_users
from .movies import seed_movies, undo_movies
from .reviews import seed_reviews, undo_reviews
from .actors import seed_actors, undo_actors
from .watchlists import seed_watchlists, undo_watchlists
from .moviewatchlists import seed_movie_watchlists, undo_movie_watchlists

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_movie_watchlists()
        undo_watchlists()
        undo_actors()
        undo_reviews()
        undo_movies()
        undo_users()
    seed_users()
    seed_movies()
    seed_reviews()
    seed_actors()
    seed_watchlists()
    seed_movie_watchlists()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_movie_watchlists()
    undo_watchlists()
    undo_actors()
    undo_reviews()
    undo_movies()
    undo_users()
