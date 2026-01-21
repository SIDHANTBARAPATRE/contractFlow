
import './App.css'
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import BlueprintList from './pages/BlueprintList';
import BlueprintCreator from './pages/BlueprintCreator';
import ContractCreator from './pages/ContractCreator';
import ContractManagement from './pages/ContractManagement';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/blueprints" element={<BlueprintList />} />
          <Route path="/blueprints/new" element={<BlueprintCreator />} />
          <Route path="/contracts/new" element={<ContractCreator />} />
          <Route path="/contracts/:id" element={<ContractManagement />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
