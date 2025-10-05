# React Component Development Assignment

This project is a submission for a front-end development internship assignment. It includes two main components, an `InputField` and a `DataTable`, built with React, TypeScript, and Tailwind CSS. The components are documented and viewable using Storybook.

---

## 🚀 Live Storybook Preview

**You can view the live component library here:** (https://my-project-q0rtlcgy5-adityas-projects-bf89df4e.vercel.app/?path=/docs/configure-your-project--docs)

---

## 🛠️ How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/adityabubna23/react-component-assignment]
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd your-repo-name
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run Storybook:**
    ```bash
    npm run storybook
    ```
5.  **Run Tests:**
    ```bash
    npm test
    ```

---

## 📖 My Approach

For this assignment, I focused on creating flexible and reusable components following modern React best practices.

* **InputField Component:** I used the `clsx` utility to dynamically manage CSS classes for the component's variants, sizes, and states (invalid, disabled). This keeps the JSX clean and the styling logic maintainable.
* **DataTable Component:** I used React hooks like `useState` to manage the state for sorting and row selection. To optimize performance, I used `useMemo` to ensure the data is only re-sorted when the data itself or the sorting configuration changes.
* **Testing:** I wrote basic unit tests using Vitest and React Testing Library to ensure the components render correctly with the given props, fulfilling the assignment's testing requirement.
