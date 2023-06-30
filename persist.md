To save the logged-in user details in your Vite React application so that the user remains logged in even after a refresh, you can make use of browser storage mechanisms like `localStorage` or `sessionStorage`. Here's a step-by-step guide on how you can achieve this:

1. **Store User Details:** When the user logs in and their credentials are verified, store their details in the browser's `localStorage` or `sessionStorage`. For example, you can save the user details as a JSON string:

```javascript
// After successful login
const user = {
  id: 123,
  name: "John Doe",
  // Add other user details here
};

localStorage.setItem("user", JSON.stringify(user));
```

2. **Retrieve User Details:** When your application loads, check if there are user details stored in the browser storage. If the user details exist, retrieve and parse them back into a JavaScript object:

```javascript
// During application initialization
const storedUser = localStorage.getItem("user");

if (storedUser) {
  const user = JSON.parse(storedUser);
  // Set the user details in your application state or context
  // so that you can access them throughout your app
}
```

3. **Clear User Details:** When the user logs out or performs a logout action, remove the user details from the storage:

```javascript
// During logout
localStorage.removeItem("user");
```

By following these steps, the user details will be persisted in the browser's storage, allowing the user to remain logged in even after refreshing the page. Remember to handle scenarios where the user may manually clear their browser storage or when the session expires.