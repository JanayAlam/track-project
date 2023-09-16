# Track Project

This application is a user-friendly and scalable tool created to help users manage their software projects successfully from start to finish. This platform's robust features enable smooth activity tracking, progress monitoring, team management, and task delegation to developers. The intended audience for this tool is both individuals and smaller teams working on software development projects.

Technology Stack: **React JS**, **Laravel**, **PostgresQL/MySQL**.

## How to Run
`Composer`, `Node JS`, and `PostgresQL` or `MySQL` is required to run this project. To install composer go to this [link](https://getcomposer.org) and download it. To download Node JS just visit this [link](https://nodejs.org/en). You can use [XAMPP](https://www.apachefriends.org/download.html) for MySQL. PostgresQL can be downloaded from this [link](https://www.postgresql.org/download). Following installation of all of this, run the following commands-

```shell
git clone https://github.com/JanayAlam/track-project.git
cd track-project
cp .env.example .env
```

Now open the `.env` file and edit the database configurations. Like-

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```

There a database connection has been established with **MySQL** on the local machine. The initial database name is **laravel**, but you can change it to a different name. Change the database username and password with your username and password.

To install all require packages, run-

```shell
composer install --no-scripts
php artisan optimize
```

Now to create JWT Token Secret run the following command.

```shell
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
```

To migrate the database just run-

```shell
php artisan migrate:fresh
```

Note: If you want to migrate the database with some default values then just run `php artisan migrate:fresh --seed` instead of the previous command. All of the user have same password `123456`.


### Create Super Admin
To create super admin just run the following command-

```shell
php artisan create-admin <username> <email> <password>
```

There replace the `<...>` portion with your inputs. Note that, from console at most 1 super admin can be created.
