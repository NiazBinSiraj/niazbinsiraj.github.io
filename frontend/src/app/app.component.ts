import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  menuItems = [
    {icon: "person", title: "About"},
    {icon: "person", title: "Experience"},
    {icon: "person", title: "Projects"},
    {icon: "person", title: "Skills"},
    {icon: "person", title: "Education"},
    {icon: "person", title: "CP Profile"},
    {icon: "person", title: "Blog"},
    {icon: "person", title: "Contact"},
    {icon: "person", title: "Resume"}
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
}
