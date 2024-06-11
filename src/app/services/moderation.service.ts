import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { IModeration } from 'src/app/interfaces/moderation.interface';

@Injectable({
  providedIn: 'root'
})
export class ModerationService {

  constructor(private http: HttpClient) {}

  private url: string = environment.apiModeration;

  listAll() {
    return this.http.get(this.url);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.url}/delete/${id}`);
  }

  reactivate(id: number) {
    return this.http.put<void>(`${this.url}/reactivate/${id}`, {});
  }

  crear(moderationResult: IModeration) {
    return this.http.post<IModeration>(`${this.url}/crear`, moderationResult);
  }

  update(moderationResult: IModeration) {
    return this.http.put<IModeration>(`${this.url}/update/${moderationResult.id}`, moderationResult);
  }

}
