Project was created on default settings from LaravelStarteKit with React and xampp mysql database

What you need install:

1.xampp or docker
2.composer
3.laravel
4.npm

Set database settings in .env file:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1 <- your database adress
DB_PORT=3306 <- on which port your database is hosted
DB_DATABASE=memeplanet <- change this value if you already got database with this name
DB_USERNAME=root <- your database user name
DB_PASSWORD= <- your database user password

Install application:

1. composer install
2. npm install
3. php artisan migrate --seed

Run application:

1. php artisan serve
2. npm run dev
3. application should be run on: http://127.0.0.1:8000/
