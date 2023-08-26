import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'toastr';
import { InvoiceDetailService } from '../../../Services/InvoiceDetailService';
import { InvoiceDetails } from '../../../Models/InvoiceDetails';

@Component({
  selector: 'app-invoice-detail-form',
  templateUrl: './invoice-detail-form.component.html',
  styleUrls: ['./invoice-detail-form.component.css']
})
export class InvoiceDetailFormComponent {
  constructor(public invoiceService: InvoiceDetailService, private toastr: ToastrService) { }


  onSubmit(form: NgForm) {
    this.invoiceService.formSubmitted = true;
    if (form.valid) {
      if (this.invoiceService.formData.InvoiceId == 0)
        this.insertRecord(form);
      else
        this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.invoiceService.postInvoice()
      .subscribe({
        next: res => {
          this.invoiceService.list = res as InvoiceDetails[]
          this.invoiceService.resetForm(form);
          this.toastr.success('Inserted successfully!', 'Payment Card');
        },
        error: err => {
          console.log(err);
        }
      })
  }

  updateRecord(form: NgForm) {
    this.invoiceService.putInvoice()
      .subscribe({
        next: res => {
          this.invoiceService.list = res as InvoiceDetails[]
          this.invoiceService.resetForm(form);
          this.toastr.info('Updated successfully!', 'Payment Card');
        },
        error: err => {
          console.log(err);
        }
      })
  }
}
