import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./pages/LoginPage";
import ShopMain from "./pages/MainPage";
import NotFound from "./pages/NotFound";

import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/main" element={<ShopMain />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
