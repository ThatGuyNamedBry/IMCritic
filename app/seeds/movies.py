from app.models import db, environment, SCHEMA, Movie
from sqlalchemy.sql import text


def seed_movies():
    movie1 = Movie(
        title="John Wick 1",
        release_year="2014",
        genre="Action",
        director="Chad Stahelski",
        writer="Derek Kolstad",
        description="John Wick is a 2014 American action thriller film directed by Chad Stahelski and written by Derek Kolstad. Keanu Reeves stars as John Wick, a legendary hitman who comes out of retirement to seek revenge against the men who killed his puppy, a final gift from his recently deceased wife.",
        trailer="https://www.youtube.com/embed/2AUmvWm5ZDQ",
        img_url='https://upload.wikimedia.org/wikipedia/en/thumb/9/98/John_Wick_TeaserPoster.jpg/220px-John_Wick_TeaserPoster.jpg'
    )
    movie2 = Movie(
        title="John Wick 2",
        release_year="2017",
        genre="Action",
        director="Chad Stahelski",
        writer="Derek Kolstad",
        description="John Wick: Chapter 2 is a 2017 American action thriller film directed by Chad Stahelski and written by Derek Kolstad. The film is sequel to John Wick (2014) and the second installment in the John Wick franchise. In the film, retired hitman John Wick is forced back into his old life to fulfill a blood oath to crime lord Santino D'Antonio (Scamarcio).",
        trailer="https://www.youtube.com/embed/ChpLV9AMqm4",
        img_url='https://m.media-amazon.com/images/M/MV5BNTZiMGM5MjItY2VjMi00NmE0LWFlMDItYjA4MzEzMjI4Y2Y2XkEyXkFqcGdeQXVyODA1NjQ0OTY@._V1_.jpg'
    )
    movie3 = Movie(
        title="John Wick 3",
        release_year="2019",
        genre="Action",
        director="Chad Stahelski",
        writer="Derek Kolstad",
        description="John Wick: Chapter 3 - Parabellum (or simply John Wick: Chapter 3) is a 2019 American action thriller film directed by Chad Stahelski. The film is the sequel to John Wick: Chapter 2 (2017) and the third installment in the John Wick franchise. It stars Keanu Reeves as the eponymous character, alongside an ensemble supporting cast including Halle Berry, Laurence Fishburne, Mark Dacascos, Asia Kate Dillon, Lance Reddick, Anjelica Huston, and Ian McShane. The film centers on John Wick going on the run from a legion of hitmen after a bounty is placed for his murder.",
        trailer="https://www.youtube.com/embed/M7XM597XO94",
        img_url='https://m.media-amazon.com/images/M/MV5BMDg2YzI0ODctYjliMy00NTU0LTkxODYtYTNkNjQwMzVmOTcxXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg'
    )
    movie4 = Movie(
        title="John Wick 4",
        release_year="2023",
        genre="Action",
        director="Chad Stahelski",
        writer="Shay Hatten, Michael Finch",
        description="John Wick: Chapter 4 is a 2023 American action thriller film directed and co-produced by Chad Stahelski and written by Shay Hatten and Michael Finch. The sequel to John Wick: Chapter 3 - Parabellum (2019) and the fourth installment in the John Wick franchise. In the film, John Wick sets out to get revenge on the High Table and those who left him for dead.",
        trailer="https://www.youtube.com/embed/qEVUtrk8_B4",
        img_url='https://www.thevillagesentertainment.com/wp-content/uploads/2023/03/John-wick-4-poster-scaled.jpg'
    )

    db.session.add_all([movie1, movie2, movie3, movie4])
    db.session.commit()


def undo_movies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.movies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM movies"))

    db.session.commit()
