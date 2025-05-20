import {
  GoogleAuthProvider,
  reauthenticateWithPopup,
  User,
} from 'firebase/auth';

const reauthenticateGoogle = async (user: User) => {
  const provider = new GoogleAuthProvider();
  await reauthenticateWithPopup(user, provider);
};

export default reauthenticateGoogle;
