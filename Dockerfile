FROM node:16

LABEL \
  dockerfile="v0.1.0" \
  repo="git@github.com:lipinav/sb3000.git" \
  maintainer="lipinav"

ARG \
  NODE_ENV=development \
  CLIENT_ID='' \
  SECRET='' \
  REDIRECT_URI='https://localhost:3000'

ENV \
  NODE_ENV=$NODE_ENV \
  CLIENT_ID=$CLIENT_ID \
  SECRET=$SECRET \
  REDIRECT_URI=$REDIRECT_URI

RUN useradd -s /bin/false -md /app appuser
WORKDIR /app
COPY . .
RUN \
  chown -R appuser:appuser /app

EXPOSE 3000
USER appuser:appuser
ENTRYPOINT ["npm"]
CMD ["run", "dev"]
