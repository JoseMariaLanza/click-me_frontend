# Click Me (Frontend)

This project was created with [React](https://es.reactjs.org/docs/getting-started.html)

## Package used: react-bootstrap

### Use `npm install` to install packages

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Project Requirements

This application presents a single button with label 'Click Me!', a counter and a table with click history.
These are centered in screen. When the user clicks the button, the counter increments as many times as clicked,
after a certain time in wich the user did not make any more clicks, the counter value it is sends to store and
the button blocks until the backend send a response, then the table updates.
The counter will increment until midnight today. Past midnight, if the user clicks the button, the counter will
be 0 again and increment from there on.

### Click Me! (Backend)

This project was created with [Laravel 6](https://laravel.com/docs/6.x), a [Docker](https://docs.docker.com/get-started/) image
with `php:7.2-apache` and [PostgreSQL](https://www.postgresql.org/docs/current/index.html) latest image for DataBase.
Backend is ready for run Github Actions at push changes

## You can see the github repo here: https://github.com/JoseMariaLanza/click-me_backend

**Note: Instructions for run project in repository Readme.**

Or if you prefer you can download image from
## Docker repo here: https://hub.docker.com/r/josemarialanza/click-me_backend_app
**Note: Instructions are in project repository Readme.**