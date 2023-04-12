import { Component } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  filter,
  from,
  fromEvent,
  map,
  mergeMap,
  of,
  toArray,
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class Tuto {
  users = [
    { id: 1, name: 'Michel', age: 45, isActive: true },
    { id: 2, name: 'Marie', age: 50, isActive: true },
    { id: 3, name: 'Charlotte', age: 29, isActive: true },
    { id: 4, name: 'Kevin', age: 22, isActive: true },
  ];
  
  //1
  users$ = of(this.users);

  //2
  usersnames$ = this.users$.pipe(
    map((users) => users.map((user) => user.name))
  );

  //3
  filteredUsers$ = this.users$.pipe(
    filter((users) => users.every((user) => user.isActive))
  );

  //3.5
  youngUsers$: Observable<any>;
  constructor() {
    this.youngUsers$ = this.getYoungUsers();
  }

  getYoungUsers(): Observable<any> {
    return of(this.users).pipe(
      mergeMap((users) => from(users)),
      filter((user) => user.age < 30),
      toArray()
    );
  }
  //
 
  
// 4
user$ = new BehaviorSubject<{ id: number; name: string } | null>(null);


  ngOnInit(): void {
    //4
    setTimeout(() => {
      this.user$.next({id: 1, name :'john'})
    }, 2000)

    this.user$.subscribe( user => {
      console.log('user', user)
    })
    
  }
  
  documentClick$ = fromEvent(document, 'click');

  data$ = combineLatest([
    this.users$,
    this.usersnames$,
    this.filteredUsers$,
  ]).pipe(
    map(([users, usernames, filteredUsers]) => ({
      users,
      usernames,
      filteredUsers
    }))
  );
}