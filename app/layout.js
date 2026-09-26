import "./globals.css";

export const metadata = {
  
  title: "DAR DISCOVER - Discover Dar es Salaam",
  description:
    "Discover the best places, experiences, food, events and hidden gems in Dar es Salaam.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="sw">
      <body>{children}</body>
    </html>
  );
}