import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { NgForm } from '@angular/forms';
import { InvoiceDetails } from '../Models/InvoiceDetails';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailService {
  //api url
  url: string = environment.apiBaseUrl + '/InvoiceDetails';
  // stored object
  list: InvoiceDetails[] = [];
  //model class
  formData: InvoiceDetails = new InvoiceDetails();
  formSubmitted: boolean = false;
  constructor(private http: HttpClient) { }

  refreshList() {
    this.http.get(this.url)
      .subscribe({
        next: res => {
          this.list = res as InvoiceDetails[];
        },
        error: err => {
          console.log(err);
        }
      })
  }

  postInvoice() {
    return this.http.post(this.url, this.formData)
  }

  putInvoice() {
    return this.http.put(this.url + '/' + this.formData.InvoiceId, this.formData);
  }

  deleteInvoice(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.formData = new InvoiceDetails();
    this.formSubmitted = false;
  }
}
