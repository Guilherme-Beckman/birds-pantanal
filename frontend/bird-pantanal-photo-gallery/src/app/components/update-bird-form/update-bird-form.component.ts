import { Component, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BirdDTO } from '../../dto/bird.dto';
import { ActivatedRoute } from '@angular/router';
import { BirdsService } from '../../services/bird/birds.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-update-bird-form',
  imports: [ReactiveFormsModule],
  templateUrl: './update-bird-form.component.html',
  styleUrl: './update-bird-form.component.scss'
})
export class UpdateBirdFormComponent {
  birdForm: FormGroup;
  selectedFile: File | null = null;
  birdDTO: BirdDTO = new BirdDTO ('','','','');
  birdId!: string;
  bird: any;
  @Output() onBirdUpdate = new EventEmitter<{birdDTO: BirdDTO, formData: FormData, birdId: string}>();
  constructor(private fb:FormBuilder, private route: ActivatedRoute, private birdService: BirdsService){
    this.birdForm = this.fb.group({
      name:[''],
      scientificName: [''],
      description: [''],
      predominantColor: [''],
      image: [null]
    })
  }
ngOnInit():void{
  this.route.queryParams.subscribe((params) => {
    this.birdId = params['id'];
  });
  this.bird = this.birdService.getBirdById(this.birdId).subscribe(data=>{
    this.bird =data;
  });
}
onSubmit(){
    const birdData = this.getBirdData();
    this.updateBirdDTO(birdData);

    const formData = new FormData();
    
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    this.onBirdUpdate.emit({birdDTO: this.birdDTO, formData, birdId: this.birdId}); 
}
onFileSelect(event: any){
  const file = event.target.files[0];
  if(file){
    this.selectedFile = file;
    this.birdForm.patchValue({image:file});
  }
}
private getBirdData() {
  return {
    name: this.birdForm.get('name')?.value,
    scientificName: this.birdForm.get('scientificName')?.value,
    description: this.birdForm.get('description')?.value,
    predominantColor: this.birdForm.get('predominantColor')?.value
  };
}
private updateBirdDTO(birdData: any) {
  this.birdDTO.name = birdData.name;
  this.birdDTO.scientificName = birdData.scientificName;
  this.birdDTO.description = birdData.description;
  this.birdDTO.predominantColor = birdData.predominantColor;
}  

}
