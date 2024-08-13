Task Manager MM

Инструкция по развертке
1. Скачать проект
2. Скачать пакеты - npm ci / npm install
3. Запустить базу данных
4. Создать config/config.json
5. Заполнить данный файл по образцу
```json
{
  "development": {
    "username": "db_user_name",
    "password": "db_user_password",
    "database": "db_name",
    "host": "db_host",
    "dialect": "postgres"
  },
  "test": {
    "username": "db_user_name",
    "password": "db_user_password",
    "database": "db_name",
    "host": "db_host",
    "dialect": "postgres"
  },
  "production": {
    "username": "db_user_name",
    "password": "db_user_password",
    "database": "db_name",
    "host": "db_host",
    "dialect": "postgres"
  }
}
```
6. Создать папку seeders
7. Накатить миграции через sequelize db:migrate
7. Запустить проект npm start

Сервер будет доступен по адресу host:3000