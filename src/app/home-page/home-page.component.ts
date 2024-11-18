import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { Component } from '@angular/core'; 
import { RouterModule } from '@angular/router';  

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HttpClientModule,  RouterModule ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  countries: any[] = []; 

  constructor(private http: HttpClient) {}

  // ngOnInit(): void {
  //   const apiKey = '514cb5fa37cb315a73418e89b99320c8'; 
  //   const url = `https://api.countrylayer.com/v2/all?access_key=${apiKey}`;

  //   this.http.get<any[]>(url).subscribe(
  //     (response) => {
  //       console.log(this.countries)
  //       this.countries = response.map((country) => ({
  //         name: country.name,
  //         flag: country.flag
  //       }));
  //     },
  //     (error) => {
  //       console.error('Error fetching countries:', error);
  //     }
  //   );
  // }

  ngOnInit(): void {
    const apiKey = '514cb5fa37cb315a73418e89b99320c8'; 
    const url = `https://api.countrylayer.com/v2/all?access_key=${apiKey}`;

    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe(
      (response) => {
        // Assuming the response is an array of countries
        this.countries = response.map(country => ({
          name: country.name.common,
          code: country.cca2, 
          flag: `https://flagcdn.com/256x192/${country.cca2.toLowerCase()}.png` 
        }));
        console.log('Mapped Countries:', this.countries);
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }



}
