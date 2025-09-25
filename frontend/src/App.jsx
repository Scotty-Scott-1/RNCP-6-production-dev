import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./security/authContext.jsx";
import ProtectRoute from './security/protectRoutes.jsx';

import Home from '../src/pages/Home.jsx';
import About from '../src/pages/About.jsx';
import Login from '../src/pages/Login.jsx';
import Signupform from '../src/pages/Signup.jsx';
import SignIn from '../src/pages/Signin.jsx';
import Dashboard from '../src/pages/Dashboard.jsx';
import Campaigns from '../src/pages/Campaigns.jsx';
import NewCampaignPage from '../src/pages/newCampaignPage.jsx';
import MailingLists from '../src/pages/MailingLists.jsx';
import NewMailingListPage from '../src/pages/newMailingListsPage.jsx';
import EditMailingListPage from '../src/pages/editMailingList.jsx';
import EditCampaignPage from "../src/pages/editCampaign.jsx";
import ResetPassword from "./pages/Template/ResetPassword.jsx";
import ClaimVoucher from "./pages/Template/ClaimVoucher.jsx";
import AppraisalAlert from "./pages/Template/AppraisalAlert.jsx";
import Payroll from './pages/Template/PayrollAlert.jsx';
import TemplatesPage from "./pages/Template/TemplatesList.jsx";
import Rain from "./components/Background/Rain.jsx";
import ReportListPage from "./pages/Reporting/ReportList.jsx";
import ReportPage from "./pages/Reporting/Report.jsx";

const App = () => (
  <AuthProvider>
    <Router>
      <Rain />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signupform />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/dashboard"
          element={<ProtectRoute><Dashboard /></ProtectRoute>}
        />
        <Route
          path="/campaigns"
          element={<ProtectRoute><Campaigns /></ProtectRoute>}
        />
        <Route
          path="/campaign/new"
          element={<ProtectRoute><NewCampaignPage /></ProtectRoute>}
        />
        <Route
          path="/mailinglists"
          element={<ProtectRoute><MailingLists /></ProtectRoute>}
        />
        <Route
          path="/newmailinglist"
          element={<ProtectRoute><NewMailingListPage /></ProtectRoute>}
        />
        <Route
          path="/mailinglist/edit/:id"
          element={<ProtectRoute><EditMailingListPage /></ProtectRoute>}
        />
        <Route
          path="/campaign/edit/:id/:listid"
          element={<ProtectRoute><EditCampaignPage /></ProtectRoute>}
        />
        <Route
          path="/report"
          element={<ProtectRoute><ReportListPage /></ProtectRoute>}
        />
        <Route
          path="/report/:id/:listid"
          element={<ProtectRoute><ReportPage /></ProtectRoute>}
        />
        <Route path="/template" element={<TemplatesPage />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/claim" element={<ClaimVoucher />} />
        <Route path="/appraisal" element={<AppraisalAlert />} />
        <Route path="/payroll" element={<Payroll />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
