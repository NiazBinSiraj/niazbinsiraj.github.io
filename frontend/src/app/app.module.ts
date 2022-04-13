import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ExperiencePageComponent } from './pages/experience-page/experience-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { SkillsPageComponent } from './pages/skills-page/skills-page.component';
import { EducationPageComponent } from './pages/education-page/education-page.component';
import { CpprofilePageComponent } from './pages/cpprofile-page/cpprofile-page.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ResumePageComponent } from './pages/resume-page/resume-page.component';
import { CertificationsComponent } from './pages/certifications/certifications.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutPageComponent,
    ExperiencePageComponent,
    ProjectsPageComponent,
    SkillsPageComponent,
    EducationPageComponent,
    CpprofilePageComponent,
    BlogPageComponent,
    ContactPageComponent,
    ResumePageComponent,
    CertificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
