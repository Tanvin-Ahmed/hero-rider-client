import UserTable from "../components/admin/UserTable";

const Admin = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="d-flex justify-center items-center pt-5 pb-10">
        <h1 className="text-[35px] text-center mb-4">
          Welcome to Admin Dashboard
        </h1>
        <UserTable />
      </div>
    </div>
  );
};

export default Admin;
