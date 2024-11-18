import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule,],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.css'
})
export class CountryDetailsComponent {
  countryCode: string = '';
  country: any = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.countryCode = this.route.snapshot.paramMap.get('code') || '';

    this.http.get<any>(`https://restcountries.com/v3.1/alpha/${this.countryCode}`).subscribe(
      (response) => {
        this.country = response[0];  // Extract country data
      },
      (error) => {
        console.error('Error fetching country details:', error);
      }
    );
  }
}
