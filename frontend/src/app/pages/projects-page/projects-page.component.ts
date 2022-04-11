import { Project } from './../../models/project.model';
import { Component, OnInit } from '@angular/core';
import Projects from "../../../assets/db/project.json";

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {
  
  projects:Project[] = [];
  project_col1:Project[] = [];
  project_col2:Project[] = [];
  project_col3:Project[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.projects = Projects.projects;
    for(let i=0; i<this.projects.length; i+=3)
    {
      this.project_col1.push(this.projects[i]);
    }
    for(let i=1; i<this.projects.length; i+=3)
    {
      this.project_col2.push(this.projects[i]);
    }
    for(let i=2; i<this.projects.length; i+=3)
    {
      this.project_col3.push(this.projects[i]);
    }
  }

}
