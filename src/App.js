import CheckInForm from "./components/CheckInForm";

function App() {
  return (
    <div>
      <header className="px-4 sm:px-6 lg:px-8 mb-5">
        <h1>Checkin list</h1>
      </header>
      <main>
        <CheckInForm />
      </main>
    </div>
  );
}

export default App;
