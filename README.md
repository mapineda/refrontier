# Refrontier #

Fitness App for the American Hero

##  Tech Used ##

- Python
- Flask
- React
- Docker
- Flake8
- Gnuicorn
- NGINX

## Getting Started ##

### Backend ###
- clone the repo
- run `docker-compose up --build`
- `docker-compose exec backend python manage.py create_db` 
- `docker-compose exec backend python manage.py seed_db` 
- navigate to `http://127.0.0.1:5001/`

#### Routes

`http://127.0.0.1:5001/api/check_db`
`http://127.0.0.1:5001/auth/signup`


#### Docker Commands

- local
```
docker-compose exec db psql --username=hello_flask --dbname=refrontier  
```

- production
```
 docker-compose -f docker-compose.prod.yml up -d --build
 docker-compose.prod.yml exec backend python manage.py create_db
```
### Frontend ###

TBD



## Resources
Docker:
https://testdriven.io/blog/dockerizing-flask-with-postgres-gunicorn-and-nginx/

## Contact ##
support@refrontier.com