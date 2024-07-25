from flask.cli import FlaskGroup

from project import create_app, db
from project.models import User  # Import your models here

app = create_app()
cli = FlaskGroup(create_app)


@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command("seed_db")
def seed_db():
    user = User(email="amco@refrontier.com")
    user.set_password("tacos123")
    db.session.add(user)
    db.session.commit()


if __name__ == "__main__":
    cli()
