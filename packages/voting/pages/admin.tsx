import { Teams } from "~/views/admin";
import css from "./admin.module.scss";
type Props = {};

const AdminPage = ({}: Props) => {
  return (
    <div>
      <Teams />
    </div>
  );
};

export default AdminPage;
