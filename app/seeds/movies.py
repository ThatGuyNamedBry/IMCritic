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
    movie5 = Movie(
        title="The Other Guys",
        release_year="2010",
        genre="Comedy",
        director="Adam McKay",
        writer="Adam McKay",
        description="Misfit NYPD detectives Gamble and Hoitz (Will Ferrell and Mark Wahlberg) are sentenced to life behind the desk. They hate each other and the monotony of their meaningless jobs, as they’re forced to live in the shadow of the two biggest and most badass cops on the force (Samuel L. Jackson and Dwayne Johnson). But when those guys go down for the count, opportunity knocks for Gamble and Hoitz. Stumbling onto what could be one of the biggest crimes in years, can The Other Guys step up their game to solve the case without killing each other and destroying NYC in the process?",
        trailer="https://www.youtube.com/embed/D6WOoUG1eNo",
        img_url='https://m.media-amazon.com/images/M/MV5BMDlhZDQ5NDUtNDcwMi00MTQ5LTk1Y2UtYjNmMjgzNzNhNzU3XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg'
    )
    movie6 = Movie(
        title="Step Brothers",
        release_year="2008",
        genre="Comedy",
        director="Adam McKay",
        writer="Adam McKay, Will Ferrell",
        description="Brennan Huff, a sporadically employed thirty-nine-year-old who lives with his mother, Nancy. Dale Doback, a terminally unemployed forty-year-old who lives with his father, Robert. When Robert and Nancy marry and move in together, Brennan and Dale are forced to live with each other as step brothers. As their narcissism and downright aggressive laziness threaten to tear the family apart, these two middle-aged, immature, overgrown boys will orchestrate an insane, elaborate plan to bring their parents back together. To pull it off, they must form an unlikely bond that maybe, just maybe, will finally get them out of the house.",
        trailer="https://www.youtube.com/embed/CewglxElBK0",
        img_url='https://upload.wikimedia.org/wikipedia/en/d/d9/StepbrothersMP08.jpg'
    )
    movie7 = Movie(
        title="Talladega Nights: The Ballad of Ricky Bobby",
        release_year="2006",
        genre="Comedy",
        director="Adam McKay",
        writer="Adam McKay, Will Ferrell",
        description="In rural North Carolina, Ricky Bobby is born in the backseat of a speeding car when his father, Reese, accidentally misses the turnoff for the hospital. Ricky sees his father only once after that, at age 10, at school. During this encounter Reese tells Ricky, 'If you ain't first, you’re last', advice which Ricky takes to heart. Fifteen years later, Ricky works on the pit crew of Dennit Racing driver Terry Cheveaux. When Cheveaux decides to take a bathroom break because he's in last place, Ricky replaces him and finishes third. Larry Dennit Sr. gives Ricky a permanent seat and he quickly rises to be one of NASCAR's most successful drivers.",
        trailer="https://www.youtube.com/embed/YfGRg0FLxtE",
        img_url='https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/Talladega_nights.jpg/220px-Talladega_nights.jpg'
    )
    movie8 = Movie(
        title="Happy Gilmore",
        release_year="1996",
        genre="Comedy",
        director="Dennis Dugan",
        writer="Adam Sandler, Tim Herlihy",
        description="Happy Gilmore is a short-tempered, unsuccessful ice hockey player whose only skills are fighting and a powerful slapshot he learned from his late father. His inability to skate limits his professional prospects. After yet another failed tryout, Happy learns that his grandmother owes the IRS $270,000 in back taxes; she has 90 days to pay off the debt or face foreclosure on her house. Happy sends his grandmother to a retirement home, where residents are secretly mistreated, until he can pay the debt.",
        trailer="https://www.youtube.com/embed/y1emDAYCfVQ",
        img_url='https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Happygilmoreposter.jpg/220px-Happygilmoreposter.jpg'
    )

    db.session.add_all([movie1, movie2, movie3, movie4, movie5, movie6, movie7, movie8])
    db.session.commit()


def undo_movies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.movies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM movies"))

    db.session.commit()
