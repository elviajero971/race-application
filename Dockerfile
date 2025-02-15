# Stage 1: Builder
FROM ruby:3.2.0-slim-bullseye AS builder

# Set the working directory
WORKDIR /app

# Install system dependencies, Node.js, Yarn, and build tools
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

# Set CHROME_BIN for headless browser testing
ENV CHROME_BIN=/usr/bin/chromium

# Copy only dependency files for Ruby so that bundle install can be cached
COPY Gemfile Gemfile.lock ./
# Install gems (using parallel jobs and retries for reliability)
RUN bundle install --jobs=4 --retry=3

# Copy JavaScript dependency files to cache yarn install
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build JavaScript assets
RUN yarn build

# Build CSS assets with Tailwind CSS (dummy secret to satisfy rails)
RUN SECRET_KEY_BASE_DUMMY=1 ./bin/rails tailwindcss:build

# Precompile Rails assets
RUN SECRET_KEY_BASE_DUMMY=1 ./bin/rails assets:precompile

# Stage 2: Production Runtime
FROM ruby:3.2.0-slim-bullseye

WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app /app

# Set environment variables for production
ENV RAILS_ENV=production
ENV RAILS_SERVE_STATIC_FILES=true
ENV RAILS_LOG_TO_STDOUT=true

# Pass secrets as build arguments and set them as environment variables
ARG SECRET_KEY_BASE
ARG RAILS_MASTER_KEY
ENV SECRET_KEY_BASE=$SECRET_KEY_BASE
ENV RAILS_MASTER_KEY=$RAILS_MASTER_KEY

# Expose the Rails port
EXPOSE 3005

# Start the Rails server
CMD ["bundle", "exec", "rails", "s", "-b", "0.0.0.0", "-p", "3005"]
