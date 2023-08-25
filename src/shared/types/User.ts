import { Errand } from "../../store/modules/UserSlice";


type User = {
  email: string;
  password: string;
  errands: Errand[];
};

export default User;
