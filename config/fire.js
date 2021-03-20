import firestore from '@react-native-firebase/firestore';

export const generateUserDocument = async (user, additionalData) => {
  console.log(user, additionalData);
  if (!user) return;

  const userRef = firestore().doc(`Users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const {email, displayName, photoURL} = user;
    //console.log("at document creation: ", displayName, photoURL);
    try {
      await userRef.set({
        email,
        displayName,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore().doc(`Users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error('Error fetching user', error);
  }
};
