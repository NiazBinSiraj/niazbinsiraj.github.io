import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private viewportScroller: ViewportScroller){}
  
  menuItems = [
    {icon: "person", title: "About", id: "about"},
    {icon: "trending_up", title: "Experience", id: "experience"},
    {icon: "code", title: "Projects", id: "projects"},
    {icon: "bar_chart", title: "Skills", id:"skills"},
    {icon: "star", title: "Certifications", id: "certifications"},
    {icon: "emoji_events", title: "CP Profile", id: "cpprofile"},
    {icon: "school", title: "Education", id:"education"},
    {icon: "edit", title: "Blog", id: "blog"},
    {icon: "email", title: "Contact", id: "contact"},
    {icon: "description", title: "Resume", id: "resume"}
  ];
  
  title = 'frontend';

  ToggleSidebar(){
    let sidebar = document.getElementById("sidebar")
    let main = document.getElementById("main");
    if(sidebar?.style.width == "0px" && main != null)
    {
      sidebar.style.width = "200px";
      main.style.paddingLeft = "200px";
    }
    else if(sidebar != null && main != null)
    {
      sidebar.style.width = "0px";
      main.style.paddingLeft = "0px";
    }
    else
    {
      console.log("Not found this HTML Element");
    }
  }

  ToggleMenuOnMobile(){
    let menu = document.getElementById("menu");
    console.log(menu?.style.height);
    if(menu?.style.height == "0px")
    {
      menu.style.height = "400px";
      menu.style.padding = "10px";
    }
    else if(menu != null)
    {
      menu.style.height = "0px";
      menu.style.padding = "0px";
    }
    else
    {
      console.log("Not found this HTML Element");
    }
  }

  OnClickMenuButton(elementId: string): void
  {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
