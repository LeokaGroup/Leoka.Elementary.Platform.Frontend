import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../../core/core-urls/api-urls";
import {BehaviorSubject, filter, map, Observable, tap} from "rxjs";
import {UrlMethods} from "../../../core/enums/url-methods";
import {PersonalData} from "../../../core/interfaces/personal-data";

@Injectable({
  providedIn: 'root'
})
export class PersonalAreaOptionsService implements OnInit {
  public readonly personalData$ = new BehaviorSubject<any>([]);

  constructor(
    private httpClient: HttpClient
  ) { }

   ngOnInit(): void {

  }

  public getPersonalInformation(): Observable<PersonalData> {
      return this.httpClient.get<PersonalData>(API_URL.apiUrl + UrlMethods.WORKSHEET);
  }

  public data() {
    this.getPersonalInformation()
      .pipe().subscribe((res: any) => {
        const data = Object.keys(res);
        data.forEach((item) => {
          if (!res[item] ||  typeof (res[item]) === 'object' && !Object.keys(res[item])?.length) {
               res[item] = 'Вы еще не добавляли предметы';
          }
        });
        console.warn(res)
      });
  }

}
