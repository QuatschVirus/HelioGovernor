FROM python:3.13-alpine

# Install system dependencies
RUN apk add --no-cache \
    nodejs \
    npm \
    bash

# Set working directory
WORKDIR /app

# Copy requirements and package files first to leverage Docker cache
COPY requirements.txt package.json package-lock.json* ./

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install Node.js dependencies
RUN npm ci || npm install

# Copy the rest of the application
COPY . .

# Generate a secure APP_SECRET during build
RUN APP_SECRET=$(head -c 32 /dev/urandom | base64) && \
    echo "APP_SECRET=$APP_SECRET" >> .env

ENV ALLOWED_IP="172.30.32.2"

# Build frontend assets
RUN npm run build

# Set the command to run when the container starts
CMD ["gunicorn", "--config", "gunicorn.conf.py", "app:app"]