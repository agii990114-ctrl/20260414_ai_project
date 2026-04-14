from settings import settings

config = {
    "user": settings.db_user,
    "password": settings.db_password,
    "host": settings.db_host,
    "port": int(settings.db_port),
    "database": settings.db_database
}