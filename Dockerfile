FROM "denoland/deno"

USER deno

WORKDIR /application/yapi

COPY ./app/ .

CMD [ "/application/yapi/start.sh" ]