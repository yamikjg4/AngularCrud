import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MasterService } from './service/master.service';
import Swal from 'sweetalert2';
import { Master } from './service/master.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bootsrap-app';
  userlist:any;
  data:any;
  datas:any;
  forms:any;
  list:any;
  image: any = '';
  listdata:any;
  paymentid:any;
  cardownername:any;
  cardnumber:any;
  expiredate:any;
  securitycode:any;
  cardname:any;
  cardtype:any;
  constructor(public service:MasterService, public sanitization: DomSanitizer){
    this.userlist=this.service.getdata();
    console.warn(this.userlist);
//     this.service.getcustomer().subscribe(res=>{
//       this.data=res;
//       console.log(this.data)
// this.image = this.sanitization.bypassSecurityTrustUrl('C:Users/yamik/source/repos/Customerwebapi/Customerwebapi/Uploadfile/'+this.data[2].imagefile);
//     });
    this.service.getpayment().subscribe(result=>{this.datas=result;});

  }
  submitform(form:NgForm){
    console.warn(form);
    if(this.service.formdata.paymentid==0)
    this.Adddata(form);
    else
    this.Editdata(form);
  }
  Adddata(form:NgForm){
    console.warn();
    this.service.setdata().subscribe(res=>{
      this.forms=res;
      console.warn();
      Swal.fire({
        // position: 'top-end',
        icon: 'success',
        title: 'Recorded Inerted Succesfully',
        showConfirmButton: false,
        timer: 2000
      });
      this.service.getpayment().subscribe(result=>{this.datas=result;});
    this.resetform(form);
    });
  }
  Editdata(form:NgForm){
    console.warn();
    this.service.getpaymentid().subscribe(res=>{
      this.forms=res;
      console.warn();

      Swal.fire({
        // position: 'top-end',
        icon: 'success',
        title: 'Recorded Updated Succesfully',
        showConfirmButton: false,
        timer: 3000
      });

      this.service.getpayment().subscribe(result=>{this.datas=result;});
// window.location.reload();

    });
  }
  resetform(form:NgForm){
    form.form.reset();
    this.service.formdata=new Master();

  }
  populated(item:Master){
    this.service.formdata=Object.assign({},item);
  }
  getdetail(id:number){
    this.service.getdetail(id).subscribe(res=>{
      console.warn(this.listdata);
    });
  }
delete(id:number){
  console.warn(id);
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.service.deletedata(id).subscribe(res=>{
        this.service.getpayment().subscribe(result=>{this.datas=result;});
      });
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })

}}
