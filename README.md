# How to run
Run local DB with Docker:
```
docker run --name ts-puzzle \
  -e POSTGRES_DB=ts-puzzle \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -p 6432:5432 \
  -d postgres
```
