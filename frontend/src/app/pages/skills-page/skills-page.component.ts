import { Skill } from './../../models/skill.model';
import { SkillLevel } from './../../models/skill-level.model';
import { Component, OnInit } from '@angular/core';
import SkillLevels from "../../../assets/db/skillLevels.json";
import Skills from "../../../assets/db/skills.json";

@Component({
  selector: 'app-skills-page',
  templateUrl: './skills-page.component.html',
  styleUrls: ['./skills-page.component.scss']
})
export class SkillsPageComponent implements OnInit {

  skillLevels:SkillLevel[] = [];
  skills:Skill[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.skillLevels = SkillLevels.skilllevels;
    this.skills = Skills.skills;
  }

}
