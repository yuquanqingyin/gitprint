run:
	docker-compose up api -d --build
	PORT=9702 npm run --prefix ui dev
