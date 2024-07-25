# pull official base image
FROM python:3.11.3-slim-buster

# set work directory
WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install system dependencies
RUN apt-get update && apt-get install -y netcat

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /app/requirements.txt

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

RUN pip install --no-cache-dir -r requirements.txt
# copy project
COPY . /app/

# run entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]
