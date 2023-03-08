APP	= Ok_Voiture 

all: $(APP)

$(APP):
	docker-compose up --build

db:
	docker-compose up --build db

down:
	docker-compose down

reset-db: down db

re: down all