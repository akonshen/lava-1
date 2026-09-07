import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WelcomePage } from './pages/WelcomePage';
import { CitySelectionPage } from './pages/CitySelectionPage';
import { MedicalTypePage } from './pages/MedicalTypePage';
import { TravelDatesPage } from './pages/TravelDatesPage';
import { BudgetPage } from './pages/BudgetPage';
import { PaymentPage } from './pages/PaymentPage';
import { GuideGenerationPage } from './pages/GuideGenerationPage';
import { GuideDisplayPage } from './pages/GuideDisplayPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/city" element={<CitySelectionPage />} />
          <Route path="/medical" element={<MedicalTypePage />} />
          <Route path="/dates" element={<TravelDatesPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/generating" element={<GuideGenerationPage />} />
          <Route path="/guide" element={<GuideDisplayPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
