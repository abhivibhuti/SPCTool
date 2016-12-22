import { Injectable } from '@angular/core';
import { Spc } from '../models/spc.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FormPoster {

    constructor(private http:Http){

    }

    private extractData(res: Response) {
        let body = res.json();
        return body.fields || { };
    }

    private extractSubscriptions(res: Response) {
        let body = res.json();
        return body.data || { };
    }


    private extractRegions(res: Response) {
        let body = res.json();
        return body.data || { };
    }
/*
    private extractPlants(res: Response) {
        let body = res.json();
        return body.data || { };
    }
*/
    private handleError(error: any) {
        console.error('post error: ', error);
        return Observable.throw(error.statusText);
    }

    getsubscriptions() : Observable<any> {
        return this.http.get('http://localhost:3100/getsubscriptions')
                        .delay(5000)
                        .map(this.extractSubscriptions)
                        .catch(this.handleError);
    }

    getRegions() : Observable<any> {
        return this.http.get('http://localhost:3100/getRegions')
                        //.delay(5000)
                        .map(this.extractRegions)
                        .catch(this.handleError);
    }
/*
    getPlants() : Observable<any> {
        return this.http.get('http://localhost:3100/getPlants')
                        //.delay(5000)
                        .map(this.extractPlants)
                        .catch(this.handleError);
    }
*/
    postSpcForm(spc: Spc):Observable<any> {
        let body = JSON.stringify(spc);
        let headers = new Headers({'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:3100/postspc', body, options)
                        .map(this.extractData)
                        .catch(this.handleError);
        //console.log('posting SPC: ', spc);
}

}