import {
	doc,
	collection,
	deleteDoc,
	setDoc,
	addDoc,
	getDoc,
	getDocs,
	query,
	where,
	writeBatch
} from "firebase/firestore";
import { database, auth } from "../firebase";

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

	removeProjectsTasks = async (projectId) => {
		let q = query(this.collection,
			where("user", "==", auth.currentUser.uid),
			where("project", "==", projectId)
		);
		await getDocs(q).then(
			async (querySnapshot) => {
				const batch = writeBatch(database);
				querySnapshot.forEach(
					d => batch.delete(d.ref)
				);
        await batch.commit();
		});
	}

	getOne = async (id) => {
		const response = await getDoc(doc(this.collection, id));
		return response.data();
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
	
	importToDatabase = async (data)=>{
		const batch = writeBatch(database);
		data.forEach(newDoc => {
				const docRef = doc(collection(database, this.collection.id));
				batch.set(docRef, newDoc);
			}
		);
		await batch.commit();
	}
}

export const users = new DatabaseService('users');
export const tasks = new DatabaseService('task');
// export const status = new DatabaseService('status');
export const projects = new DatabaseService('projects');

// const batch = writeBatch(database);

// data.forEach((newDoc) => {
// 	const docRef = doc(collection(database, "task")); //automatically generate unique id
// 	const row = {...newDoc, 
// 		starting_time: new Date(newDoc.starting_time), 
// 		deadline: new Date(newDoc.deadline),
// 		user: "i8zvyRmHCpTOvU35XorrOcmYeh62"
// 	}
//   batch.set(docRef, row);
// });
// batch.commit();