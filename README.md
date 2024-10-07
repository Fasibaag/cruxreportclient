# CruxReport Client

CruxReport Client is a web application built using React.js and TypeScript, designed for visualizing and reporting data. The application utilizes Material UI for styling and Recharts for creating interactive charts.


## UI Functionality (Technical Version)

- **Application Structure**
  - The app consists of a **SearchBar** component at the top and a **Material-UI DataGrid** to display Chrome UX Report (CrUX) data for multiple URLs.

### SearchBar:
- **Input Validation**:
  - The input field supports multiple comma-separated URLs.
  - The input values are validated against a **URL Regex pattern** to ensure correct format.
  - If invalid URLs are detected, the search field will display error states and feedback to the user.

- **API Calls**:
  - On submission of valid URLs, the app will trigger **parallel API requests** using a utility like `Promise.all` or a library like **TanStack Query** for caching and parallel fetching to fetch CrUX data for each URL.
  - The fetched data will be processed and stored in the component's state (or a global state like **React Context** or **Redux**).

### Material-UI DataGrid:
- **Data Rendering**:
  - The **DataGrid** will display the metrics returned by the CrUX API for each URL.
  - Each row represents a URL, and the columns display various performance metrics (e.g., First Contentful Paint (FCP), Largest Contentful Paint (LCP), First Input Delay (FID), Cumulative Layout Shift (CLS)).

- **Custom Cell Styling**:
  - Each metric cell will be dynamically styled based on **threshold values** (provided by CrUX or predefined). For example:
    - If the metric is within acceptable limits, the background color is green.
    - If it exceeds the threshold, it will change to yellow or red.

- **Chart Modal**:
  - A chart icon is placed in a dedicated column for each row.
  - On clicking the **chart icon**, a **Modal** will be opened displaying a **Donut Chart** (e.g., using **Chart.js** or **Recharts**).
  - The chart will show each metric visually, with threshold values highlighted for easy identification.
  - Additional insights or text analysis about the URL's performance can be shown in the modal based on the API data.

### Error Handling:
- **CrUX Data Availability**:
  - If the CrUX data is unavailable for any of the URLs (e.g., if the URL is not tracked by CrUX), an **alert toast notification** (using **Material-UI Snackbar** or a similar library) will be shown, detailing the error reason.

## Limitations and Improvements

### Limitations:
- **API Rate Limiting**:
  - The CrUX API has a limit of processing a maximum of **150 URLs per minute**. 
  - This may result in delays or throttling if a user submits a large number of URLs at once.

- **Data Insights**:
  - Current insights provided in the modal are basic and may lack detailed contextual information about the performance metrics.
  - Enhanced insights are needed to help users understand the impact of the metrics on user experience.

- **URL Processing for Large Sets**:
  - For batches exceeding **150 URLs**, it is recommended to use **CrUX BigQuery**. 
  - The current implementation does not support querying large datasets effectively, which may lead to performance issues.

### Improvements:
- **Enhanced Insights**:
  - Incorporate additional data points in the insights modal, such as:
    - Comparative analysis with industry benchmarks.
    - Recommendations for optimization based on the metrics.
  
- **Support for Larger Batches**:
  - Implement functionality to seamlessly switch to **CrUX BigQuery** when the number of URLs exceeds 500.
  - This could involve prompting the user to initiate a BigQuery job and providing feedback on progress.

- **Additional Filters**:
  - Introduce more filtering options within the DataGrid, such as:
    - Range filtering to allow users to specify minimum and maximum values for metrics.
    - Option to filter URLs based on success or failure of data retrieval from the API.

### Future Considerations:
- Consider implementing **batch processing** to handle API calls more efficiently, potentially using background jobs for larger URL sets.
- Explore caching mechanisms to store results from previous queries to enhance performance and reduce load on the CrUX API.


## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static types.
- **Material UI**: A popular React UI framework that provides a robust set of components.
- **Recharts**: A composable charting library built on React components.
- **Vite**: A fast build tool and development server for modern web applications.


## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
git clone https://github.com/Fasibaag/cruxreportclient.git

2. cd cruxreportclient

3. npm install or yarn
4.  yarn dev




### ScreenShots:
<img width="1728" alt="Screenshot 2024-09-29 at 3 15 24 PM" src="https://github.com/user-attachments/assets/1a77b13c-a572-40e2-b82b-8ed1805fdbf4">
<img width="1728" alt="Screenshot 2024-09-29 at 11 53 27 PM" src="https://github.com/user-attachments/assets/bd025e0c-a3c4-4638-bf3f-4e67689c4c3b">
<img width="1728" alt="Screenshot 2024-09-29 at 11 53 32 PM" src="https://github.com/user-attachments/assets/a4e0f749-1069-49e3-8026-8906d02a9925">
<img width="1728" alt="Screenshot 2024-09-29 at 3 15 40 PM" src="https://github.com/user-attachments/assets/d7812042-1270-4b36-b914-cc08958398ab">
<img width="1728" alt="Screenshot 2024-09-29 at 3 15 44 PM" src="https://github.com/user-attachments/assets/495df154-6538-44de-a44b-cd0d4bd0acb3">



