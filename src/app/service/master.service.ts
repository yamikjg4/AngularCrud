import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Master } from './master.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
user=[{name:"Yamik",id:2},{name:"Raj",id:3}];
url="https://localhost:44378/api/customer";
paymenturl="https://localhost:44307/api/TblPayments";
formdata:Master=new Master();
list:Master[];
  constructor(private http:HttpClient) { }
  getdata(){
    return this.user;
  }
  // getcustomer(){
  //   return this.http.get(this.url);
  // }
  getpayment(){
    return this.http.get(this.paymenturl);
  }
  setdata(){
    return this.http.post(this.paymenturl,this.formdata);
  }
  deletedata(id:number){
    return this.http.delete("https://localhost:44307/api/TblPayments/"+id);
  }
  getpaymentid(){
    return this.http.put(`${this.paymenturl}/${this.formdata.paymentid}`,this.formdata);
  }
  getdetail(id:number){
    return this.http.get("https://localhost:44307/api/TblPayments/"+id);
  }

}
