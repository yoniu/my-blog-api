import { Router, Status } from "./enum"
export interface returnType {
  status: Status,
  message: string
}
export interface myMetadata {
  content: string,
  date: number,
  title: string
}