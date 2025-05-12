# Fortune Cookie Admin App

**Fortune Cookie Admin App** is an administrative application built for the **VTEX IO** platform, designed to help store admins manage “fortune cookie”-style messages that can be displayed to customers.

## 🚀 Features

- User-friendly interface integrated into VTEX Admin.
- Manage personalized messages for your store visitors.
- Backend services for saving and retrieving messages.
- Multilanguage support via internationalization files.

## 🛠️ Project Structure

- `admin/`: VTEX Admin configuration.
- `react/`: React components.
- `node/`: Backend logic and services.
- `store/`: VTEX schema and app configurations.
- `messages/`: i18n files.
- `docs/`: Additional documentation.

## 📦 Setup Instructions

> 🛠️ **Prerequisite:** Make sure you have the [VTEX IO CLI installed](https://developers.vtex.com/docs/guides/vtex-io-documentation-vtex-io-cli-install) on your machine.

1. Clone the repository:

   ```bash
   git clone https://github.com/bjaider/fortune-cookie-admin-app.git
   cd fortune-cookie-admin-app
   ```

2. Log in to your VTEX account:

   ```bash
   vtex login {your-account}
   ```

3. Use the workspace:

   ```bash
   vtex use {your-workspace}
   ```

4. Link the app:

   ```bash
   vtex link
   ```

5. Open the app in the VTEX Admin:

   ```
   https://{your-workspace}--{your-account}.myvtex.com/admin/app/fortune-cookie
   ```


## 🔐 Setup

To make the app work correctly, you need to set your **AppKey** and **AppToken** in the app’s configuration panel.

Go to:

```
https://{your-workspace}--{your-account}.myvtex.com/admin/apps/valtech.fortune-cookie-app@1.0.2/setup
```

You should see a screen like the following one (see image below):

![image](https://github.com/user-attachments/assets/fe206bbe-125e-4241-a0a8-d6bcf643f597)

## 📬 Contact

- Developer: Jaider Bermudez  
- GitHub: [@bjaider](https://github.com/bjaider)
