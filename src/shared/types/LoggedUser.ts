import User from './User';

type Home = {
  logged: User;
  allUsers: User[];
  onLogout: () => void;
};

export default Home;
