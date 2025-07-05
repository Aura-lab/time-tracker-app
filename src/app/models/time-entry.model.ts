import { Person } from "./person.model";
import { TaskItem } from "./task-item.model";

export interface TimeEntry {
  id: number;
  personId: number | null;
  person?: Person;
  taskItemId: number | null;
  taskItem?: TaskItem;
  date: string;
  hoursWorked: number;
}