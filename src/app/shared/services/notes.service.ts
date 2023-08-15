import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Note} from "../models/note.model";
import {HttpClient} from "@angular/common/http";
import {Notes} from "../mocks/Notes";

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Array<Note>> {
    return of(Notes);
  }
}
