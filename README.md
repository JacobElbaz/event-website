
# Event Website

This is a site where you can find all the information about an event (such as a wedding). Thus the guests will be able to inform themselves and respond to the invitation. The organizers will be able to access the list of guests who have responded and manage it.


## Features

As guest:
- Countdown to the event
- Waze link to the place of the event
- Whatsapp link to contact the organizer
- Answer form

As organizer (password: 12345):
- Access the guests list 
- Search guest by name/phone
- Add new guest 
- Edit/remove guest
- Import/Export guest list (new)

## Tech Stack

**Client:** ReactJS

**Server:** Node, Express, MongoDB

## Deployment

I used Heroku for deployment. 

This is a link to my deployed website: https://event-website-app.herokuapp.com/ 

## Run Locally

Clone the project

```bash
  git clone https://github.com/JacobElbaz/event-website.git
```

Go to the project directory

```bash
  cd event-website
```

Go to the client directory

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

If you want to run locally with the backend, you have to create your own cluster on MongoDB with a database named 'event-website' and a collection named 'guests'. Add a .env file to the backend directory with the MONGO_URI='<your MongoDB login url>'. Finaly go to the backend directory

```bash
  npm cd backend
```

Install dependencies

```bash
  npm install
```

Start the server 

```bash
  npm start
```
## Authors

- [@JacobElbaz](https://github.com/JacobElbaz)

