# Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`



# Key Implementation Details:

## Global State with Zustand:

 - The store maintains the chat history as an array of ChatItem objects.
 - Each chat item contains essential metadata such as the sender (UserType), content type (ContentType), and relevant exchange or stock data when applicable.
 - This centralized approach ensures smooth updates and avoids unnecessary re-renders.

## Flexible Content Handling:

 - Messages can be simple text or interactive components (e.g., StockMenu, StockDetails).
 - The content type dictates how messages are displayed, allowing the chatbot to provide rich, structured responses dynamically.


 ## Efficient UI Rendering:

 - The MessageBar component dynamically adjusts its styling based on the sender (UserType).
 - Conditional rendering ensures that different content types are properly displayed, whether as plain text or structured UI elements.
 - The App.tsx file is responsible for rendering the chat interface, iterating over the chat history from the store, and ensuring seamless updates.

## Performance Optimization & Maintainability:

 - Avoids unnecessary state mutations by leveraging Zustand’s shallow state updates.
 - Encapsulates chat-related logic within the store, keeping UI components clean and focused on presentation.
 - Ensures scalability for future enhancements, such as additional content types or interactive features.
