ARG BUILD_FROM=amd64-base
FROM $BUILD_FROM

RUN \
    apk add --no-cache \
    python3 \
    py3-pip \
    nodejs

ENV APP_SECRET = $(head -c 32 /dev/urandom | base64)

COPY . /app
WORKDIR /app

RUN pip3 install --no-cache-dir -r requirements.txt
RUN npm install
RUN npm run build

CMD = ["gunicorn"]