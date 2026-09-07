import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WelcomePage } from './pages/WelcomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
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
