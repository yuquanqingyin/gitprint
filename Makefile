run:
	docker-compose up api -d --build
	docker-compose up gotenberg -d --build
	PORT=9702 npm run --prefix ui dev

lint:
	npm run --prefix ui lint
	cd api; golangci-lint run

test:
	cd api; go test -v -bench=. -race ./pkg/...
