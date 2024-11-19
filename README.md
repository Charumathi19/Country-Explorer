# Country-Explorer
The Country Explorer Web Application allows users to explore countries, search for specific countries, apply filters, view detailed country information, and navigate seamlessly between pages. This app was developed using Angular and offers a user-friendly interface for exploring a vast set of data about countries.

Key Features
  Display Countries: Show all countries in a card layout with essential information like country name and flag.
  Search Functionality: Allows users to search for countries by name, with real-time filtering as the user types.
  Filters: Users can filter countries by:
  Language: Choose a language to filter countries that speak it.
  Region: Filter countries by their geographical region.
  Population: Filter countries by population size (e.g., small, medium, large).
  Pagination: Display countries in paginated form, allowing users to navigate between pages of results.
  Country Details: Clicking on a country card takes the user to a detailed page with more information about the selected country.

  Development Process
    Step 1: Create Home Page Layout
      Designed the layout for the home page where users can view all countries in a grid of cards.
      Each card includes basic information like the country name and flag.
    Step 2: Implement Search Functionality
      Added a search bar where users can type the name of a country.
      The country list is filtered based on the search query, and matching countries are displayed in real-time below the search bar.
    Step 3: Add Filters
      Implemented dropdowns for various filters such as Language, Region, and Population.
      When a user selects a filter, the displayed countries are updated to match the selected criteria.
    Step 4: Implement Pagination
      Split the list of countries into multiple pages.
      Added Previous and Next buttons to navigate through the pages of country cards.
    Step 5: Create Country Details Page
      Developed a country details page to display more in-depth information about each country when a user clicks on a country card.
      The page includes details like population, languages, area, and other relevant data.
    Step 6: Routing and Navigation
      Set up routing using Angular’s Router to navigate between the home page and the country details page.
      The route for the details page includes the country code, which allows fetching detailed data for the specific country.
    Step 7: Final UI and UX Enhancements
      Applied styling to ensure the app is visually appealing and responsive.
      Enhanced user experience by adding features like loading states, error messages, and smooth transitions.
      


