import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  User,
} from 'firebase/auth';

const reauthenticate = async (user: User, password: string) => {
  if (user && user.email) {
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
  }
};

export default reauthenticate;
