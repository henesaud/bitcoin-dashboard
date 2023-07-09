This is a project to improve my Django, DRF, and React skills. It may have some flaws (mainly secure ones).
The main objective is to develop tools for Bitcoin users, including price dashboards, conversion tools, indicators, wallet visualization, etc. 

## Configuring Database
Postgres was used to run this project. However, for an easy run, go to backend > settings.py and substitute the DATABASES constant to: 

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```
So you can use the default sqlite3. 

If you want to run with Postgres, you can run the following Docker commands:


```
docker run --name ecommerce --network=postgres-network -e "POSTGRES_PASSWORD=mypass" -p 5432:5432 -v /home/hene/prjs/PostgreSQL:/var/lib/postgresql/data -d postgres
```

```
docker run --name ecommerce-pgadmin  --network=postgres-network -p 15432:80 -e "PGADMIN_DEFAULT_EMAIL=heness@protonmail.com" -e "PGADMIN_DEFAULT_PASSWORD=mypass" -d dpage/pgadmin4
```

Just create the Docker network and alter the user name in the local path  ('-v /home/<user_name>/...'). 



## Running this project

First, clone this repository and enter in the 'ecommerce' folder. Then, create a virtual env

```
python -m venv .venv
```

Activate the env

```
source .venv/bin/activate
```


Install the project dependencies with

```
pip install -r requirements.txt
```

Now you can run the project with this command

```
python manage.py runserver
```