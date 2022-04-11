import { Certification } from './../../models/certification.model';
import { Component, OnInit } from '@angular/core';
import Certifications from "../../../assets/db/certifications.json";

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss']
})
export class CertificationsComponent implements OnInit {

  certifications:Certification[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.certifications = Certifications.certifications;
  }

}
