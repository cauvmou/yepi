FROM "denoland/deno"

USER deno

WORKDIR /application/yepi

COPY ./app/ .

CMD [ "/application/yepi/start.sh" ]