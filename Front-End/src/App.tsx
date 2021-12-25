import GlobalState from "./Components/Redux/GlobelState";
import HrRoutes from "./Routes/HrRoutes";
 

function App() {
  return (
    <GlobalState>
    <>
      <HrRoutes />
    </>
    </GlobalState>
  );
}

export default App;
