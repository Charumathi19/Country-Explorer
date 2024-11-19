import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  countries: any[] = [];
  filteredCountries: any[] = [];
  currentPage = 1;
  pageSize = 12;
  totalCountries: number = 0;

  regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  languages = ['English', 'French', 'Spanish', 'Arabic', 'Mandarin'];
  populationFilters = [
    { label: 'Small (< 1M)', min: 0, max: 1_000_000 },
    { label: 'Medium (1M - 10M)', min: 1_000_000, max: 10_000_000 },
    { label: 'Large (> 10M)', min: 10_000_000 }
  ];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe(
      (response) => {
        this.countries = response.map((country) => ({
          name: country.name.common,
          code: country.cca2,
          flag: `https://flagcdn.com/256x192/${country.cca2.toLowerCase()}.png`,
          region: country.region,
          population: country.population,
          languages: country.languages ? Object.values(country.languages) : [],
        }));
  
        // Extract unique languages
        const languageSet = new Set<string>();
        this.countries.forEach((country) => {
          country.languages.forEach((lang: string) => languageSet.add(lang));
        });
        this.languages = Array.from(languageSet);
  
        this.filteredCountries = [...this.countries]; // Initialize filtered list
        this.totalCountries = this.filteredCountries.length;
      },
      (error) => console.error('Error fetching countries:', error)
    );
  }

  // Filter by language
  filterByLanguage(language: string): void {
    this.filteredCountries = this.countries.filter((country) =>
      country.languages.includes(language)
    );
    this.updatePagination();
  }

  // Filter by region
  filterByRegion(region: string): void {
    this.filteredCountries = this.countries.filter(
      (country) => country.region === region
    );
    this.updatePagination();
  }
  
  resetRegionFilter(): void {
    this.filteredCountries = [...this.countries];
    this.updatePagination();
  }

  // Filter by population
  filterByPopulationRange(min: number, max?: number): void {
    this.filteredCountries = this.countries.filter((country) => {
      const population = country.population;
      if (min !== undefined && population < min) return false;
      if (max !== undefined && population > max) return false;
      return true;
    });
  }

  resetPopulationFilter(): void {
    this.filteredCountries = [...this.countries];
    this.updatePagination();
  }

  onSearch(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value.toLowerCase();

    if (!searchText) {
      this.filteredCountries = [...this.countries]; 
    } else {
      this.filteredCountries = [
        ...this.countries.filter((country) =>
          country.name.toLowerCase().includes(searchText)
        ),
      ];
    }

    this.currentPage = 1; // Reset to the first page
    this.totalCountries = this.filteredCountries.length; // Update total countries
  }
  

  // Refresh pagination data
  updatePagination(): void {
    this.totalCountries = this.filteredCountries.length;
    this.currentPage = 1; // Reset to the first page
  }

  // Pagination helper methods
  getPaginatedCountries(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredCountries.slice(startIndex, startIndex + this.pageSize);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage(): void {
    if (this.currentPage * this.pageSize < this.totalCountries) {
      this.currentPage++;
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.totalCountries / this.pageSize);
  }

  goToCountryDetails(countryCode: string): void {
    this.router.navigate(['/country', countryCode]);
  }
}
