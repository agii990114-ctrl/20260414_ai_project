from settings import settings

config = {
    "user": settings.user,
    "password": settings.password,
    "host": settings.host,
    "port": int(settings.port),
    "database": settings.database
}