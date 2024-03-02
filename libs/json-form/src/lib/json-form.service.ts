import { Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject, Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class JsonFormService  {
    private _environment:BehaviorSubject<any>=new BehaviorSubject(undefined)

    set environment(environment:any){
        this._environment.next(environment)
    }

    get environment(){
        return this._environment.value
    }
}