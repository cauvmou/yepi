FROM "denoland/deno"

USER deno

WORKDIR /application/yepi

COPY ./app/ .
COPY ./data/ ./data/

CMD [ "/application/yepi/start.sh" ]