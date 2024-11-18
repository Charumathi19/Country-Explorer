import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  countries: any[] = [];
  currentPage = 1;
  pageSize = 12;
  totalCountries: number = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const apiKey = '514cb5fa37cb315a73418e89b99320c8';
    const url = `https://api.countrylayer.com/v2/all?access_key=${apiKey}`;

    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe(
      (response) => {
        // Map the country data
        this.countries = response.map(country => ({
          name: country.name.common,
          code: country.cca2,
          flag: `https://flagcdn.com/256x192/${country.cca2.toLowerCase()}.png`
        }));
        // Set total countries after the data is fetched
        this.totalCountries = this.countries.length;
        console.log('Mapped Countries:', this.countries);
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }

  // Get the current page's countries
  getPaginatedCountries(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.countries.slice(startIndex, startIndex + this.pageSize);
  }

  // Go to the previous page
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Go to the next page
  goToNextPage(): void {
    if (this.currentPage * this.pageSize < this.totalCountries) {
      this.currentPage++;
    }
  }

  // Calculate total pages based on countries count
  getTotalPages(): number {
    return Math.ceil(this.totalCountries / this.pageSize);  // Ensure it divides correctly
  }

  // Method to navigate to country details page
  goToCountryDetails(countryCode: string): void {
    this.router.navigate(['/country', countryCode]);
  }
}
