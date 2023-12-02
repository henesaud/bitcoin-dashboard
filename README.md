(In development)

![ezgif-4-a40d540533](https://github.com/henesaud/bitcoin-dashboard/assets/69599070/51cb21c7-e770-4e79-9702-5440bf58d7ba)


This is a project to improve my Django, DRF, and React skills. It may have some flaws (mainly security ones).
The main objective is to develop tools for Bitcoin users, including price dashboards, Mayer multiple, Xpub, conversion tools, indicators, wallet visualization, etc. 

# Running this project
First, clone this repository and enter in the 'bitcoin-dashboard' folder.
## Running  with Docker
Build the images and run the containers:
```
docker-compose up -d --build
```
Then, run the Django migrations and create a superuser:
```
docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
```

The application should be accessible at http://localhost:3000. Test it by logging in with the superuser that you just created. 
