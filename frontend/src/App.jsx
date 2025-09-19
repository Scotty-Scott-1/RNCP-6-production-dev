import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./security/authContext.jsx";
import ProtectRoute from './security/protectRoutes.jsx';

import Home from '../src/pages/Home.jsx';
import About from '../src/pages/About.jsx';
import Login from '../src/pages/Login.jsx';
import Signupform from '../src/pages/Signup.jsx';
import Test from '../src/pages/Test.jsx';
import SignIn from '../src/pages/Signin.jsx';
import Dashboard from '../src/pages/Dashboard.jsx';
import Campaigns from '../src/pages/Campaigns.jsx';
import NewCampaignPage from '../src/pages/newCampaignPage.jsx';
import MailingLists from '../src/pages/MailingLists.jsx';
import NewMailingListPage from '../src/pages/newMailingListsPage.jsx';
import EditMailingListPage from '../src/pages/editMailingList.jsx';
import EditCampaignPage from "../src/pages/editCampaign.jsx";
import ResetPassword from "../src/pages/Templates/ResetPassword.jsx";

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signupform />} />
        <Route path="/test" element={<Test />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<ProtectRoute><Dashboard /></ProtectRoute>} />
        <Route path="/campaigns" element={<ProtectRoute><Campaigns /></ProtectRoute>} />
        <Route path="/campaign/new" element={<ProtectRoute><NewCampaignPage /></ProtectRoute>} />
        <Route path="/mailinglists" element={<ProtectRoute><MailingLists /></ProtectRoute>} />
        <Route path="/newmailinglist" element={<ProtectRoute><NewMailingListPage /></ProtectRoute>} />
        <Route path="/mailinglist/edit/:id" element={<ProtectRoute><EditMailingListPage /></ProtectRoute>} />
        <Route path="/campaign/edit/:id/:listid" element={<ProtectRoute><EditCampaignPage /></ProtectRoute>} />
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
