import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosError } from 'axios';
import { TimeEntry } from '../models/time-entry.model';
import { Person } from '../models/person.model';
import { TaskItem } from '../models/task-item.model';

// Unified API response interface
export interface ApiResponse<T> {
  data: T;
  message?: string;
  code?: number;
  errors?: Record<string, string[]>;
}

@Injectable({ providedIn: 'root' })
export class TimeEntriesApi {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
        baseURL: '/api',
        timeout: 10000
      });
  }

  private async request<T>(cb: () => Promise<{ data: ApiResponse<T> }>): Promise<T> {
    const res = await cb();
    return res.data.data;
  }

  // Get all people
  async getPeople(): Promise<Person[]> {
    return this.request(() => this.axios.get<ApiResponse<Person[]>>('/People'));
  }

  // Get all tasks
  async getTasks(): Promise<TaskItem[]> {
    return this.request(() => this.axios.get<ApiResponse<TaskItem[]>>('/Tasks'));
  }

  // Get all time entries
  async getTimeEntries(): Promise<TimeEntry[]> {
    return this.request(() => this.axios.get<ApiResponse<TimeEntry[]>>('/TimeEntries'));
  }

  // Add a new time entry
  async addTimeEntry(entry: TimeEntry): Promise<void> {
    await this.axios.post<ApiResponse<void>>('/TimeEntries', entry);
  }

  // Update an existing time entry
  async updateTimeEntry(entry: TimeEntry): Promise<void> {
    await this.axios.put<ApiResponse<void>>(`/TimeEntries/${entry.id}`, entry);
  }

  // Delete a time entry
  async deleteTimeEntry(id: number): Promise<void> {
    await this.axios.delete<ApiResponse<void>>(`/TimeEntries/${id}`);
  }

  // Unified error handler
  handleAxiosError(error: unknown): string {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiResponse<unknown>>;
      if (axiosError.response?.data?.message) {
        return axiosError.response.data.message;
      }
      if (axiosError.message) return axiosError.message;
      return `HTTP Error: ${axiosError.response?.status ?? ''}`;
    }
    if (error instanceof Error) return error.message;
    return 'Unknown error';
  }
}
