import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.scss']
})
export class DialogueComponent implements OnInit {
  categories=['Adventure','sports','dirt']

  seasons=['One month','Two months','Three months']
  actionBtn:string ='save'
  productForm !: FormGroup
  constructor(private formBuilder:FormBuilder, private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef : MatDialogRef<DialogueComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName :['',Validators.required],
      category :['',Validators.required],
      seasons :['',Validators.required],
      price :['',Validators.required],
      comment :['',Validators.required],
      date :['',Validators.required],
    })

    // console.log(this.editData)
    if(this.editData){
      this.actionBtn='Update'
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['seasons'].setValue(this.editData.seasons);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
      
    }
  }
addProduct(){
if(!this.editData){
    // console.log(this.productForm.value)
if(this.productForm.valid){
  this.api.postProduct(this.productForm.value).subscribe({
    next:(res)=>{
      alert("product added successfully")
      this.productForm.reset();
      this.dialogRef.close("save");
    },
    error:()=>{
      alert('erroradding product')
    }
  })
}else{
  alert('Ensure all fields are filled ')
}
}
else{
  this.updateData()
}
}
updateData(){
  this.api.putProduct(this.productForm.value,this.editData.id)
  .subscribe({
    next:(res)=>{
      alert("product updated successfully")
      this.productForm.reset();
      this.dialogRef.close("update");
  
    },
    error:()=>{
      alert('erroradding product')
    }
  })


}

}
