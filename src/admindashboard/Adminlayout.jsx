import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar';
import Header from '../Header'; // optional if you have one

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
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
