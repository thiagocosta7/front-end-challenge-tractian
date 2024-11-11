# Front End Software Engineer | Challenge

This application lists the content of `locations` and `assets` fetched from the API based on the selected company's ID. It includes a tree structure visualization of the company's assets and locations. The application offers the following functionalities:

- **Search and Filter**:
  - A text search to filter and find specific assets or locations within the tree;
  - Additional filters:
    - Energy Sensors: Filters assets with energy sensors;
    - Critical Status: Highlights critical assets;
- **Image Upload**:
  - Since the API doesn't provide images for assets, a feature to upload an image is implemented;
  - Uploaded images are saved to the browser's `sessionStorage` for demonstration purposes;
- **Details Panel**:
  - Displays details about the selected asset, including information like `Sensor Type`, `Status`, and `Receiver`;
  - Some fields like `Equipment Type` and `Responsibles` remain placeholders due to missing data in the API;

## Why These Technologies?

### [**Next.js**](https://nextjs.org/)
I chose Next.js because it offers flexibility for projects of any size. Its hybrid approach to Server-Side Rendering (SSR) and Client-Side Rendering (CSR) ensures scalability and great performance as the project grows. In this case, I opted to start with CSR due to the client-side filtering requirements and the dynamic interaction with the asset tree, ensuring a more responsive user experience while maintaining the potential to adapt to SSR if necessary.

### [**TailwindCSS**](https://tailwindcss.com/) and [**Heroicons**](https://heroicons.com/)
- **TailwindCSS**: It enables rapid styling with a utility-first approach, allowing me to focus on functionality and consistent design.
- **Heroicons**: These icons integrate seamlessly with TailwindCSS, offering flexibility and speed for prototyping and production-level UI. I chose Heroicons because their style closely resembles the icons proposed in the Figma design, ensuring consistency with the intended UI.

### [**React Context API**](https://react.dev/learn/passing-data-deeply-with-context)
For simplicity, I centralized the state in a single context (`AppContext`). This approach is faster and more straightforward for the scope of this challenge. In a larger project, I'd consider more scalable solutions like [Redux](https://redux.js.org/) or [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction).

---

## Future Improvements

If I had more time, I'd focus on the following:

1. **Refactor Context**:
   - Separate concerns into multiple contexts or use libraries like Redux or Zustand for better state management.

2. **Design System Integration**:
   - Work more closely with the company's design system.
   - Import the company's custom color palette and use proprietary icons for a more consistent look and feel.

3. **Persist Uploaded Images**:
   - Save uploaded images to a backend service instead of `sessionStorage` for greater persistence.

4. **Error Handling**:
   - Improve error handling in API calls with user-friendly messages and fallback UI.

5. **Testing**:
   - Add unit tests with [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/) to ensure component reliability.
   - Use [Cypress](https://www.cypress.io/) for E2E testing of key features like filters and image uploads to validate the user experience.

---

## How to Run the Application

1. **Install Dependencies**:
   Run `npm install` or `yarn install`.

2. **Start Development Server**:
   Run `npm run dev` or `yarn dev` to start the development server.

3. **Access the Application**:
Open your browser and navigate to `http://localhost:3000`.

---

## Demonstration Video

_The following space is reserved for a demonstration video of the application in action._

https://github.com/user-attachments/assets/226ae715-99f5-4b7e-80fa-ab000896556a

---

<div align="center">
<a href="https://thiagocosta.dev" target="_blank">
 🌐 thiagocosta.dev
</a>
&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="mailto:thiago@thiagocosta.dev">
 📧 thiago@thiagocosta.dev
</a>
</div>
