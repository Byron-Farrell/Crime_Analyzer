<p align="center">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTroD3q1B2TwnZQ7BR785ZHvEQUZg2loGzJTQmjCsoFOYX0obwz">
</p>

# Project White Wolf

## Description

## Setup

### Debian dependencies

- postgresql
- libpq-dev
- python3
- pip3 (installing python modules)

### Installing latest version of node on ubuntu

> $ sudo apt-get install curl

> $ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

> $ sudo apt install nodejs

### Setting up virtual enviroment

#### From the root folder

> $ cd django

> $ python3 -m venv .venv


> $ source .venv/bin/activate


### Install python modules

> $ pip3 install -r requirements.txt

### Setting up django

> $ python manage.py makemigrations

> $ python manage.py migrate

> $ python manage.py shell

once in the shell type in the following code

> $ from apps.ETL import load

> $ load.setup()

### Install Javascript libraries

#### From the root folder

> $ cd frontend

> $ npm install

## Build

### Development Build

#### From the root folder

> $ cd frontend

> $ sudo npm run build:dev
