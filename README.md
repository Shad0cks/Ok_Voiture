
# Ok voiture

A platform allowing individuals to rent their cars among themselves.


## Tech Stack

**Client:** React, TailwindCSS

**Server:** NestJS

**Database:** PostgreSQL


## Environment Variables

#### To run this project, you will need to add the following environment variables to your .env files



| location | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `./.env` | `POSTGRES_PASSWORD` | **Required**. Your Database Password |
| `./back/.env` | `POSTGRES_PASSWORD` | **Required**. Your Database password |
| `./back/.env` | `ADMIN_PASSWORD` | **Required**. Admin Panel Password |
| `./ui/.env` | `REACT_APP_SAS_TOKEN` | **Required**. Your Azure container API key |

## Deployment

To deploy this project run

```bash
  docker-compose up --build
```
or 
```bash
  make
```


## Running Tests

List of requests to quickly fill the database and test the different cases of the API 

```bash
  sh test.sh
```

