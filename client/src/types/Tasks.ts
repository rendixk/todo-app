export interface Task {
   id: number
   owner: string
   title: string
   subtitle: string
   note: string
   isCompleted: boolean
   createdAt: string
   updatedAt: string
 }
 
 export interface NewTaskPayload {
   title: string
   subtitle: string
   note: string
   updatedAt?: string
 }