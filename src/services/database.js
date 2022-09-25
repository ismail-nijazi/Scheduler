import {
	doc,
	collection,
	deleteDoc,
	setDoc,
	addDoc,
	getDoc,
	getDocs,
	query,
	where 
} from "firebase/firestore";
import { database,auth } from "../firebase";

class DatabaseService {
  collection

  constructor(collectionName) {
		this.collection = collection(database, collectionName);
  }

  getAll = async () => {
		const snapshot = await getDocs(this.collection);
		return snapshot.docs.map((doc) => {
			return { ...doc.data(), id: doc.id }
		});
	}
	
	getUsersData = async () => {
		const q = query(this.collection, where("user", "==", auth.currentUser.uid));
		const querySnapshot = await getDocs(q);
		return querySnapshot.docs.map((doc) => {
			return { ...doc.data(), id: doc.id }
		});
	}

	getTasksPerProject = async (projectId) => {
		let q = query(this.collection,
			where("user", "==", auth.currentUser.uid),
			where("project", "==", projectId)
		);
		const querySnapshot = await getDocs(q);
		return querySnapshot.docs.map((doc) => {
			return { ...doc.data(), id: doc.id }
		});
	}

	getOne = async (id) => {
		return await getDoc(doc(this.collection, id));
	}
	
	create = async (data, id) => {
		if (id) {
			return await setDoc(doc(this.collection, id),data);
		}
		return await addDoc(this.collection, data);
  }

  remove = async (id) => {
		return await deleteDoc(doc(this.collection, id));
  }
}

export const users = new DatabaseService('users');
export const tasks = new DatabaseService('task');
export const status = new DatabaseService('status');
export const projects = new DatabaseService('projects');
