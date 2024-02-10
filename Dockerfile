ARG build_env

FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV APP_ROOT /src
ENV CI_ENV=${build_env}

RUN corepack enable
RUN pnpm add pm2 -g

ADD . ${APP_ROOT}
WORKDIR ${APP_ROOT}

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
ENV CI_ENV=${build_env}
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base AS base-build-env
ENV APP_ROOT /src
ENV HOST 0.0.0.0
USER node
EXPOSE 3000

COPY --from=prod-deps --chown=node:node ${APP_ROOT}/node_modules ${APP_ROOT}/node_modules
COPY --from=prod-deps --chown=node:node ${APP_ROOT}/.nuxt ${APP_ROOT}/.nuxt

FROM base-build-env AS base-build-env-production
COPY --from=build --chown=node:node ${APP_ROOT}/.output ${APP_ROOT}/.output
CMD ["pm2-runtime", "ecosystem.config.cjs", "--env", "production"]

FROM base-build-env AS base-build-env-production-robots
COPY --from=build --chown=node:node ${APP_ROOT}/.output ${APP_ROOT}/.output
CMD ["pm2-runtime", "ecosystem.config.cjs", "--env", "production"]

FROM base-build-env AS base-build-env-development
COPY --from=build --chown=node:node ${APP_ROOT}/.output ${APP_ROOT}/.output
CMD ["pm2-runtime", "ecosystem.config.cjs", "--env", "development"]

FROM base-build-env AS base-build-env-local
ENTRYPOINT ["pnpm", "run"]
CMD ["dev"]

FROM base-build-env-${build_env} AS final
