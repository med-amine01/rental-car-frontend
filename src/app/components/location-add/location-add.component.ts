import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "../../service/client.service";
import {ActivatedRoute} from "@angular/router";
import {Client} from "../../common/client";
import {LocationService} from "../../service/location.service";
import {CarService} from "../../service/car.service";
import {Car} from "../../common/car";

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent {
  locationFormGroup!: FormGroup;
  client !: Client;
  locationAddBool: boolean = false;

  idcar!: number;
  car!: Car;

  constructor(private formBuilder: FormBuilder,
              private locationService: LocationService,
              private carService: CarService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.formGroupInit();
    this.getCarInformations();
    // this.calulatePrice();

  }


  formGroupInit() {
    this.locationFormGroup = this.formBuilder.group({
      locationInfo: this.formBuilder.group({
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('', [Validators.required]),
        totalPrice: new FormControl('')
      })
    });
  }

  getDiffrenceDays(): number {
    let d1 = new Date(this.startDate?.value);
    let d2 = new Date(this.endDate?.value);
    console.log(d1 + " " + d2)

    let days = Math.floor((d2.getTime() - d1.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }

  calulatePrice() {
    let result = (this.car.dayPrice * this.getDiffrenceDays()).toFixed(2);
    this.totalPrice?.setValue(result.valueOf() + " DT");
  }

  getCarInformations() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.idcar = +this.route.snapshot.paramMap.get('id')!;
      this.carService.getOneCar(this.idcar).subscribe(
        data => {
          this.car = data;
        }
      );
    }
  }

  get startDate() {
    return this.locationFormGroup.get('locationInfo.startDate')
  }

  get endDate() {
    return this.locationFormGroup.get('locationInfo.endDate')
  }

  get totalPrice() {
    return this.locationFormGroup.get('locationInfo.totalPrice')
  }


  onSubmit() {


    // if(this.locationFormGroup.invalid){
    //   this.locationFormGroup.markAllAsTouched();
    //   return;
    // }
    //
    // let client = new Client();
    // client.cin = this.cin?.value;
    // client.firstName = this.firstName?.value;
    // client.lastName = this.lastName?.value;
    // client.email = this.email?.value;
    // client.phoneNumber = this.phoneNumber?.value;
    //
    // //TODO : redirect to location : number of days to locate
    //
    //
    //
    // //{[azer,aezr,azer]}
    // this.clientService.addNewClient(client).subscribe({
    //   next: response =>{
    //     //our response from the api has car id => return as JSON (car.id)
    //     // alert("the car has been added the id is  : "+response.id);
    //     this.clienAddBool = true;
    //
    //   }, error: err => {
    //     alert("There was an error: "+err.message());
    //   }
    // });
  }

}
