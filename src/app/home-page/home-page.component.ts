import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  countries: { name: string; flag: string }[] = []; // Store country name and flag

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const apiKey = '514cb5fa37cb315a73418e89b99320c8'; 
    const url = `https://api.countrylayer.com/v2/all?access_key=${apiKey}`;

    this.http.get<any[]>(url).subscribe(
      (response) => {
        console.log(this.countries)
        this.countries = response.map((country) => ({
          name: country.name,
          flag: country.flag
        }));
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }



}
