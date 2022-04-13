import { Quote } from './../../models/quote.model';
import { Component, OnInit } from '@angular/core';
import Quotes from "../../../assets/db/quotes.json";

@Component({
  selector: 'app-resume-page',
  templateUrl: './resume-page.component.html',
  styleUrls: ['./resume-page.component.scss']
})
export class ResumePageComponent implements OnInit {

  quotes:Quote[] = [];
  quote:Quote = new Quote();
  
  constructor() { }

  ngOnInit(): void {
    this.quotes = Quotes.quotes;
    let ind = Math.floor(Math.random() * (this.quotes.length - 0) + 0);
    this.quote = this.quotes[ind];
  }

}
