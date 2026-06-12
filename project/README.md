# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



                            Working

When a user enters the platform, they land on the Home page where all products are displayed along with category and subcategory filters. Users can browse and search products freely.

After signing in, users gain full access to product details and wishlist features. They can view complete product information, including images, variants, and pricing.

Users can filter products using categories and subcategories from the sidebar. Selecting a product opens the detailed page where users can explore more information and choose variants.

If a user likes a product, they can click the heart icon to add or remove it from their wishlist. The wishlist is maintained per user and updated in real time.

