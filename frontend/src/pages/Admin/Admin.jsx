import React, { useState, useEffect } from 'react';
import './Admin.css';
import AdminHeader from '../../components/AdminHeader';
import AdminNavigation from '../../components/AdminNavigation';
import UserManagement from '../../components/AdminSections/UserManagement';
import CarManagement from '../../components/AdminSections/CarManagement';
import SalesReports from '../../components/AdminSections/SalesReports';
import ReviewsModeration from '../../components/AdminSections/ReviewsModeration';
import { verifyAdminAccess } from '../../services/firebaseService';

function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('users');

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        setLoading(true);
        const hasAccess = await verifyAdminAccess();
        if (!hasAccess) {
          window.location.href = '/';
          return;
        }
        setIsAdmin(true);
      } catch (error) {
        console.error('Erro ao verificar acesso admin:', error);
        window.location.href = '/';
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, []);

  if (loading) {
    return <div className="loading-admin">Verificando acesso...</div>;
  }

  if (!isAdmin) {
    return <div className="access-denied">Acesso negado</div>;
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'users':
        return <UserManagement />;
      case 'carros':
        return <CarManagement />;
      case 'vendas':
        return <SalesReports />;
      case 'avaliacoes':
        return <ReviewsModeration />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="admin">
      <AdminHeader />
      <div className="admin-container">
        <AdminNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="admin-main">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}

export default Admin;
