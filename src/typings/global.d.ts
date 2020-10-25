import Inunjucks from "nunjucks"

declare global {
  interface Window {
    nunjucks: typeof Inunjucks
  }
}