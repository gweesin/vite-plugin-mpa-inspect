export interface Options {
  /**
   * Enable the inspect plugin in dev mode (could be some performance overhead)
   *
   * @default true
   */
  dev?: boolean

  /**
   * Enable the inspect plugin in build mode, and output the report to `.vite-inspect`
   *
   * @default false
   */
  build?: boolean

  /**
   * Directory for build inspector UI output
   * Only work in build mode
   *
   * @default '.vite-inspect'
   */
  outputDir?: string

  /**
   * Base URL for inspector UI
   *
   * @default read from Vite's config
   */
  base?: string

  /**
   * Print URL output silently in the terminal
   *
   * @default false
   */
  silent?: boolean

  /**
   * Automatically open inspect page
   *
   * @default false
   */
  open?: boolean
}
