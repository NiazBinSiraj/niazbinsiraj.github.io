import { Experience } from './../../models/experience.model';
import { Component, OnInit } from '@angular/core';
import Experiences from "../../../assets/db/experience.json";

@Component({
  selector: 'app-experience-page',
  templateUrl: './experience-page.component.html',
  styleUrls: ['./experience-page.component.scss']
})
export class ExperiencePageComponent implements OnInit {
  
  experiences:Experience[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.experiences = Experiences;
  }

}
