import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import {
  CloudFunction,
  FIREBASE_DB_DATA as FIREBASE_DB_CONFIG,
  FIREBASE_DB_DATA,
} from '../../constants/Constants';

export async function authenticate(id?: string): Promise<any> {
  firebase.initializeApp({
    apiKey: FIREBASE_DB_CONFIG.API_KEY,
    authDomain: FIREBASE_DB_CONFIG.AUTH_DOMAIN,
    projectId: FIREBASE_DB_CONFIG.PROJECT_ID,
  });
  const auth: firebase.auth.Auth = firebase.auth();
  const functions: firebase.functions.Functions = await firebase.functions();
  const authenticateFunction: firebase.functions.HttpsCallable = functions.httpsCallable(
    CloudFunction.authenticate,
  );
  let result: firebase.functions.HttpsCallableResult = await authenticateFunction(
    { id, token: FIREBASE_DB_DATA.TOKEN },
  );
  const token: string = result.data;
  await auth.signInWithCustomToken(token);
}

export async function getFSDataAsync(
  docId: string,
): Promise<firebase.firestore.DocumentSnapshot> {
  try {
    const dataObj: firebase.firestore.DocumentSnapshot = await firebase
      .firestore()
      .doc(docId)
      .get();
    return dataObj;
  } catch (err) {
    console.error(err);
  }
}

export async function removeFsDataAsync(docId: string): Promise<void> {
  return firebase
    .firestore()
    .doc(docId)
    .delete();
}

export async function setFSDataAsync(docId: string, data: any): Promise<void> {
  try {
    await firebase
      .firestore()
      .doc(docId)
      .set(serialise(data));
  } catch (err) {
    console.error(err);
  }
}

export async function callCloudFunction(
  functionName: CloudFunction,
  data: any,
  options?: any,
): Promise<any> {
  const functions: firebase.functions.Functions = await firebase.functions();
  const callFunction: firebase.functions.HttpsCallable = await functions.httpsCallable(
    functionName,
    options,
  );
  const result: firebase.functions.HttpsCallableResult = await callFunction(
    data,
  );
  return result.data;
}

export function serialise(object: any): any {
  return JSON.parse(JSON.stringify(object));
}
