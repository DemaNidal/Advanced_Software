# EcoTrack: Environmental Monitoring and Reporting Platform

RESTful APIs designed for environmental monitoring and reporting, providing developers with a standardized interface to collect, analyze, and report on air quality, temperature, humidity, and other environmental parameters.

## Table of Contents

- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Configuration](#configuration)
- [Testing](#testing)
- [Contributing](#contributing)

## Installation

# Clone the repository
git clone https://github.com/your-username/your-project.git

# Navigate to the project directory
cd your-project

# Install dependencies
npm install axios ejs express firebase-admin mysql2
<!-- ............................................................... -->

## API Endpoints

### 1. `/api/Data`

**Description:**
This endpoint allows users to add data, view all data, view a specific data, edit data, delete data.

<!-- ............................................ -->
**Method:** `POST`
**Parameters:**
`user_id` (number, optional/required): the id of the user adding the data, its only optional if the source is a sensore.
`date_time` (datetime, required): date and time of the data.
`location` (string, required): location of the data.
`source` (string, optional/required): to indicate if the data is being recorded by a sensor or a user.
`air_quality` (number, required): air_quality value.
`temperature` (number, required): temperature value.
`humidity` (number, required): humidity value.
`water_quality` (number, required): water_quality value.
**Example:**
POST https://localhost:8080/api/Data \
  -H "Content-Type: application/json" \
  -d '{
    "user_id":"1",
    "date_time":"2023-12-15T10:30:00",
    "location":"japan",
    "source":"user",
    "air_quality":"1",
    "temperature":"1",
    "humidity":"1",
    "water_quality":"1"
}'
<!-- ............................................ -->

**Method:** `GET`
**Example:**
GET https://localhost:8080/api/Data
<!-- ............................................ -->

**Method:** `GET`
**Parameters:**
`id`: Data id to view the details of that data.
**Example:**
GET https://localhost:8080/api/Data/1
<!-- ............................................ -->

**Method:** `PUT`
**Parameters:**
`id`: Data id to edit the details of that data.
`user_id` (number, optional/required): the id of the user adding the data, its only optional if the source is a sensore.
`date_time` (datetime, required): date and time of the data.
`location` (string, required): location of the data.
`source` (string, optional/required): to indicate if the data is being recorded by a sensor or a user.
`air_quality` (number, required): air_quality value.
`temperature` (number, required): temperature value.
`humidity` (number, required): humidity value.
`water_quality` (number, required): water_quality value.
**Example:**
PUT https://localhost:8080/api/Data/1 \
  -H "Content-Type: application/json" \
  -d '{
    "user_id":"1",
    "date_time":"2023-12-15T10:30:00",
    "location":"japan",
    "source":"user",
    "air_quality":"1",
    "temperature":"1",
    "humidity":"1",
    "water_quality":"1"
}'
<!-- ............................................ -->

**Method:** `DELETE`
**Parameters:**
`id`: Data id to delete that data.
**Example:**
DELETE https://localhost:8080/api/Data/1
<!-- ............................................ -->

<!-- ............................................................... -->
### 2. `/api/Users`

**Description:**
This endpoint allows users to add user, view all users, view a specific user, edit user details, delete user.
<!-- ............................................ -->

**Method:** `POST`
**Parameters:**
`name` (string, required): name of user.
`air_quality_threshold` (number, required): air_quality threshold value.
`temperature_threshold` (number, required): temperature threshold value.
`humidity_threshold` (number, required): humidity threshold value.
`water_quality_threshold` (number, required): water_quality threshold value.
`location` (string, required): location of the user.
`sustainability_score` (number): score to measure a user's interactivity and helpfulness.
**Example:**
POST https://localhost:8080/api/Users \
  -H "Content-Type: application/json" \
  -d '{
    "name":"asma",
    "air_quality_threshold":"2",
    "temperature_threshold":"2",
    "humidity_threshold":"2",
    "water_quality_threshold":"2",
    "location":"japan",
    "sustainability_score":""
}'
<!-- ............................................ -->

**Method:** `GET`
**Example:**
GET https://localhost:8080/api/Users
<!-- ............................................ -->

**Method:** `GET`
**Parameters:**
`id`: user id to view the details of that user.
**Example:**
GET https://localhost:8080/api/Users/1
<!-- ............................................ -->


**Method:** `PUT`
**Parameters:**
`id`: user id to edit the details of that user.
`name` (string, required): name of user.
`air_quality_threshold` (number, required): air_quality threshold value.
`temperature_threshold` (number, required): temperature threshold value.
`humidity_threshold` (number, required): humidity threshold value.
`water_quality_threshold` (number, required): water_quality threshold value.
`location` (string, required): location of the user.
`sustainability_score` (number): score to measure a user's interactivity and helpfulness.
**Example:**
PUT https://localhost:8080/api/Users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name":"asma",
    "air_quality_threshold":"2",
    "temperature_threshold":"2",
    "humidity_threshold":"2",
    "water_quality_threshold":"2",
    "location":"japan",
    "sustainability_score":""
}'
<!-- ............................................ -->

**Method:** `DELETE`
**Parameters:**
`id`: user id to delete that user.
**Example:**
DELETE https://localhost:8080/api/Users/1
<!-- ............................................ -->

<!-- ............................................................... -->
### 3. `/api/Interest`

**Description:**
This endpoint allows users to specify their interests, enabling a more personalized experience and data filtering based on their preferences.
<!-- ............................................ -->

**Method:** `POST`
**Parameters:**
`user_id` (number, required): the id of the user adding the interest.
`interest_name` (string, required): name of the interest such as humidity, water_quality_threshold and so.

**Example:**
POST https://localhost:8080/api/Interest \
  -H "Content-Type: application/json" \
  -d '{
    "user_id":"2", 
    "interest_name":"humidity"
}'
<!-- ............................................ -->

**Method:** `DELETE`
**Parameters:**
`id`: interest id to be deleted.
**Example:**
DELETE https://localhost:8080/api/Interest/1
<!-- ............................................ -->

<!-- ............................................................... -->

### 4. `/api/Resources`

**Description:**
This endpoint allows users to add Resources, view all Resources, edit Resources details, delete Resources.
<!-- ............................................ -->




## Database

...

## Configuration

...

## Testing

...

## Contributing

...

