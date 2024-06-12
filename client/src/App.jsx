import "./App.css";
import TouristAttractionsCard from "./components/TouristAttractionsCard";
function App() {
  return (
    <div className="App">
      <h1
        className="text-7xl font-bold text-center text-[#2e9bdb] m-[50px] "
        style={{ fontFamily: "Noto Sans Thai" }}
      >
        เที่ยวไหนดี
      </h1>
      <TouristAttractionsCard />
    </div>
  );
}

export default App;
