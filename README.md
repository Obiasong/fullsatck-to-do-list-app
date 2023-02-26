# Fullsatck To-do List App

## Table of contents
* [General info](#general-info)
* [Setup](#setup)
* [Notice](#notice--to-do)
* [License](#license)

## General info 
A Laravel 9 (check requirements for your local environment <a href='https://laravel.com/docs/9.x/releases'>requirements</a>) based backend and React.js based frontend application to manage items on a to-do list. An item has a title, description, status and a photo.

### Features
<li>Add an item</li>
<li>View the details of an item (click on the title of the item)</li>
<li>Being able to edit an item</li>
<li>A photo uploaded with the item</li>
<li>The option to mark an item as active (in progress)</li>
<li>The option to mark an item as complete</li>
<li>Remove an item from the list</li>
<li>View status of the item (completed or pending)</li>

## Setup
```
Git clone the repo
cd to your project root from the console
```
### Backend setup

Error checking is implemented at various levels mainly through input validations and the code includes 100% test coverage of the controllers.<br/>

```
cd to /backend
copy the .env.example file to .env (cp .env.example .env).

#Setup database 
Create your local database
Enter your database information in the .env file as required

Run composer install or php composer.phar install
Run php artisan key:generate
Run php artisan migrate
Run php artisan serve to start the backend server

#Seeding 
Run the command below to create 10 fake items (This is optional) 
php artisan migrate:refresh --seed

```

```
You can access the app via localhos:8000 or any port specified when running serve command
```
### Testing and code coverage
```
php artisan test or vendor/bin/phpunit
```

```
vendor/bin/phpunit --coverage-text
```

### Frontend setup

```
The frontend is a ReactJs application built using JavaScript, react.js, nodejs, jsx, html, and CSS. 
```

Once in the project root.

```
cd to /frontend
Run npm install to install the project dependencies
Run npm start to start your local server 
```
## Notice / to do
- I will be adding security and user management using Laravel Sanctum for the API Authentication and Token management.
- Users can create multiple to-do lists
- Search list and list items.
- Allow user to view list items based on the status of the items.
- Share a to do list with friends.
- Add active (in progress) as a status.

## License

The To-do list app is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
