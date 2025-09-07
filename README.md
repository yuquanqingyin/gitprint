# gitprint

## Local Development

Run:

```
make run
```

Test:

```
make test
```

Lint:

```
make lint
```

## Deployment

1. Set environment variables in `.env` file:

```
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NEXT_PUBLIC_API_ADDR=https://api.gitprint.me
```

2. Run:

```
docker-compose up --build -d
```
