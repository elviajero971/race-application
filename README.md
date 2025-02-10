# 🏃 School Race Manager

A full-stack web application built with **Ruby on Rails** and **React** that empowers teachers to set up and manage race results effortlessly. Featuring a React frontend integrated within a Rails application, this project offers a streamlined experience for organizing races, assigning students to lanes, recording finishing positions (including ties), and viewing detailed results.

---

## 🚀 User Stories

- **Race Setup:**
   - As a teacher, I want to create, update, and delete any students in the school so that I can manage the list of participants.
   - As a teacher, I want to create a race with at least 2 students, ensuring that each student is assigned to a unique lane.
   - As a teacher, I want to prevent the same student from being assigned to more than one lane in the same race.

- **Recording Results:**
   - As a teacher, I want to record the final finishing positions for each student once a race is completed.
   - I want the final places to be entered without gaps (e.g. 1, 2, 3, 4 is valid; 1, 2, 4 is not).
   - In the event of a tie, the next available position should skip the number of tied athletes (e.g. (1, 1, 3) is valid; (1, 1, 1, 2) is invalid).

- **Viewing Results:**
   - As a teacher, I want to view the detailed results of each race so that I can quickly determine the winners and hand out medals.
   - As a teacher, I want to view the list of students

---

## 🚀 Live Demo

You can access the live demo of the app by visiting the following link:
[https://race.nomadev.online/](https://race.nomadev.online/)

### App Tech versions
- Ruby 3.2.0
- Rails 8.0.1
- Node.js 22.11.0
- Yarn 1.22.22
- SQLite 3.43.2
- Docker 27.4.0
## 🛠️ Getting Started



## Installation using docker

1. **Clone the repository**:
   ```bash
   git clone git@github.com:elviajero971/race-application.git
   cd race-application
    ```

2. **Build the docker image**:
    ```bash
    docker build -t race-app .
    ```

3. **Start the server using docker**:
   ```bash
    docker run -it --rm -p 3005:3005 race-app
   ```
   
4. **Find the container name**:
    ```bash
        docker ps
    ```

5. **Set up the database and data**:
    ```bash
       docker exec -it container_name bundle exec rails db:migrate db:seed
       docker exec -it container_name bundle exec rails db:migrate RAILS_ENV=test
    ```



**Access the app**:
- Open your browser and navigate to `http://localhost:3005/`

### Running tests
**Run the test suite**:
   ```bash
    docker exec -e RAILS_ENV=test -it container_name bundle exec rspec
   ```

---

## Installation locally

1. **Clone the repository**:
   ```bash
   git clone git@github.com:elviajero971/race-application.git
   cd race-application
    ```

2. **Install depencies**:
    ```bash
    bundle install
   yarn install
    ```

3. **Set up the database and data**:
    ```bash
   rails db:create db:migrate db:seed
    ```

### Running the app
**Start the server with foreman using the Procfile**:
   ```bash
    foreman start -f Procfile.dev
   ```

**Access the app**:
- Open your browser and navigate to `http://localhost:5000/`

### Running tests
**Run the test suite**:
   ```bash
    rspec .
   ```
