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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/campaign/new" element={<NewCampaignPage />} />
        <Route path="/mailinglists" element={<MailingLists />} />
        <Route path="/newmailinglist" element={<NewMailingListPage />} />
        <Route path="/mailinglist/edit/:id" element={<EditMailingListPage />} />
        <Route path="/campaign/edit/:id/:listid" element={<EditCampaignPage />} />
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
