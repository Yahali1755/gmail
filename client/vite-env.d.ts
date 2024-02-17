/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ENV_STALE_TIME: string
  readonly ENV_SERVER_URL: string
  readonly ENV_REFETCH_TIME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}