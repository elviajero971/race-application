# -----------------------
# Stage 1: Builder
# -----------------------
FROM ruby:3.2.0-slim-bullseye AS builder

# Set working directory
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

# Ensure gem executables are available by updating PATH
ENV PATH="/usr/local/bundle/bin:$PATH"

# Copy dependency files and install gems (caching these layers)
COPY Gemfile Gemfile.lock ./
RUN bundle install --jobs=4 --retry=3

# Copy JS dependency files and install (cache these too)
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build JavaScript assets
RUN yarn build

# Build CSS assets with Tailwind CSS (using dummy secret to satisfy Rails)
RUN SECRET_KEY_BASE_DUMMY=1 ./bin/rails tailwindcss:build

# Precompile Rails assets
RUN SECRET_KEY_BASE_DUMMY=1 ./bin/rails assets:precompile

# -----------------------
# Stage 2: Production Runtime
# -----------------------
FROM ruby:3.2.0-slim-bullseye

WORKDIR /app

# Install OS-level dependencies needed for Selenium tests (chromium and chromium-driver)
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    chromium-driver \
  && rm -rf /var/lib/apt/lists/*

# Install Node.js and Yarn in production
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && curl -sL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g yarn \
    && rm -rf /var/lib/apt/lists/*

# Verify Node.js and Yarn versions (for debugging)
RUN node --version && yarn --version

# Make sure Yarn is in the PATH (typically it gets installed in /root/.yarn/bin)
ENV PATH="/root/.yarn/bin:/usr/local/bin:$PATH"

# Copy installed gems from builder stage
COPY --from=builder /usr/local/bundle /usr/local/bundle

# Copy built application code from builder stage
COPY --from=builder /app /app

# Ensure gem executables are available in production
ENV PATH="/usr/local/bundle/bin:$PATH"

# Set production environment variables
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
