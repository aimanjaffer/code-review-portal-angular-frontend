import { Injectable } from '@angular/core';
import { User } from '../data/user';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Group } from '../data/group';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    username: '',
    groups: null
  };
  idToUserMap: Map<number, User> = new Map();

  addUserToMap(user: User) {
    if (!this.idToUserMap.has(user.id)) {
      this.idToUserMap.set(user.id, user);
    }
  }
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>('/acreview/users/find/' + email);
  }
  setUser(user: User): User {
    this.user.id = user.id;
    this.user.first_name = user.first_name;
    this.user.last_name = user.last_name;
    this.user.username = user.username;
    this.user.groups = user.groups;
    this.idToUserMap.set(this.user.id, this.user);
    return this.user;
  }
  getUser() {
    return this.user;
  }

  setUserEmail(email: string) {
    this.user.email = email;
  }
  getUserEmail() {
    return this.user.email;
  }

  getUserFromID(id: number): Observable<User> {
    if (this.idToUserMap.has(id)) {
      return of(this.idToUserMap.get(id));
    } else {
      return this.http.get<User>('/acreview/users/' + id);
    }
  }
  isAdmin(): boolean {
    const adminGroup = this.user.groups.filter((obj) => obj.name === 'reviewadmin');
    if (adminGroup.length > 0 ) {
      return true;
    }  else {
      return false;
    }
  }
  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>('/acreview/groups/');
  }
  getUsersByGroup(group: string): Observable<User[]> {
    return this.http.get<User[]>('/acreview/groups/' + group);
  }
  constructor(private http: HttpClient) { }
}
