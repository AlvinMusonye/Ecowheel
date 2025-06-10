import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header'; // optional if you have one

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="p-6 overflow-y-auto">
          <Outlet /> {/* This is where nested pages render */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
