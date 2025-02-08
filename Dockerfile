# Base image: Official Ruby image
FROM ruby:3.2.0-slim-bullseye

WORKDIR /app

# Install system dependencies, Node.js, Yarn, and required build tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    git \
    libvips \
    sqlite3 \
    libsqlite3-dev \
    pkg-config \
    chromium \
    chromium-driver \
    && curl -sL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g yarn \
    && rm -rf /var/lib/apt/lists/*


# Set CHROME_BIN to point to Chromium
ENV CHROME_BIN=/usr/bin/chromium

# Copy Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

ARG RAILS_ENV=development
ENV RAILS_ENV=${RAILS_ENV}
ENV RAILS_SERVE_STATIC_FILES=true
ENV RAILS_LOG_TO_STDOUT=true

ARG SECRET_KEY_BASE
ENV SECRET_KEY_BASE=$SECRET_KEY_BASE

ARG RAILS_MASTER_KEY
ENV RAILS_MASTER_KEY=$RAILS_MASTER_KEY

# Install Bundler and the required gems
RUN bundle install

# Copy the entire Rails application into the container
COPY . .

# Install JavaScript dependencies
RUN yarn install

# Build JavaScript assets
RUN yarn build

RUN SECRET_KEY_BASE_DUMMY=1 ./bin/rails tailwindcss:build

# Precompile Rails assets
RUN SECRET_KEY_BASE_DUMMY=1 ./bin/rails assets:precompile

EXPOSE 3005

CMD ["bundle", "exec", "rails", "s", "-b", "0.0.0.0", "-p", "3005"]
