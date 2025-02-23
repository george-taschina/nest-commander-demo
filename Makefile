setup:
	./setup.sh

start:
	./start.sh

stop:
	docker compose down

start-app-a-dev:
	docker exec -ti app-a yarn app-a:start:dev

app-b-connect:
	docker exec -ti app-b /bin/zsh
