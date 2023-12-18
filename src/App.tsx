import { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	onSnapshot,
	updateDoc,
} from "firebase/firestore";
import { db } from "./firebase-config";
import { sectorsData } from "./helper/data";
import { MenuItem } from "./helper/type";
import toast, { Toaster } from "react-hot-toast";
import UserInfos from "./UserInfos";
import Button from "./Button";

function renderSubMenu(item: MenuItem): React.ReactNode {
	if (item.children && item.children.length > 0) {
		return (
			<Menu.SubMenu key={item.key} title={item.label}>
				{item.children.map((child) => renderSubMenu(child))}
			</Menu.SubMenu>
		);
	}
	return <Menu.Item key={item.key}>{item.label}</Menu.Item>;
}

function App() {
	const [editMode, setEditMode] = useState(false);
	const [editingUserId, setEditingUserId] = useState<string | null>(null);
	//
	const [users, setUsers] = useState<any>();
	const [newUser, setNewUser] = useState({
		name: "",
		term: null,
		selected: "",
	});

	const [isFocused, setFocused] = useState(false);

	const userCollection = collection(db, "userInfo");

	const handleEditClick = (userId: string) => {
		const userToEdit = users.find(
			(user: { id: string }) => user.id === userId
		);

		if (userToEdit) {
			setEditMode(true);
			setEditingUserId(userId);
			setNewUser({
				name: userToEdit.name,
				term: userToEdit.term,
				selected: userToEdit.selected,
			});
		}
	};
	const handleCancelEdit = () => {
		setEditMode(false);
		setEditingUserId(null);
		setNewUser({
			name: "",
			term: null,
			selected: "",
		});
	};
	const handleSaveEdit = async () => {
		if (!newUser.name || !newUser.term || !newUser.selected) {
			toast("Fill in all the blanks to make the form happy!", {
				icon: "😬",
			});
			return;
		}

		if (editingUserId) {
			const userDocRef = doc(userCollection, editingUserId);

			await updateDoc(userDocRef, {
				name: newUser.name,
				term: newUser.term,
				selected: newUser.selected,
			});
		}
		toast.success("Successfully toasted!");

		setEditMode(false);
		setEditingUserId(null);
		setNewUser({
			name: "",
			term: null,
			selected: "",
		});
	};

	useEffect(() => {
		const getUsers = async () => {
			const data = await getDocs(userCollection);
			setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getUsers();
	}, []);

	const handleMenuClick: (info: MenuInfo & { key: React.Key }) => void = (
		info
	) => {
		const { domEvent } = info;
		const value = (domEvent.currentTarget as HTMLElement).innerText;
		setNewUser((prevUser) => ({ ...prevUser, selected: value }));
	};
	const handleChange = (e: any) => {
		const { name, value, type, checked } = e.currentTarget;
		setNewUser({
			...newUser,
			[name]: type === "checkbox" ? checked : value,
		});
	};
	const createUserInfo = async () => {
		if (!newUser.name || !newUser.term || !newUser.selected) {
			toast("Fill in all the blanks to make the form happy!", {
				icon: "😬",
			});
			return;
		}

		await addDoc(userCollection, {
			name: newUser.name,
			term: newUser.term,
			selected: newUser.selected,
		});
		toast.success("Successfully toasted!");
		setNewUser({
			name: "",
			term: null,
			selected: "",
		});
	};

	const handleDelete = async (userId: string) => {
		try {
			const userDocRef = doc(userCollection, userId);
			await deleteDoc(userDocRef);
		} catch (error: any) {
			console.error("Error deleting user:", error.message);
		}
	};

	useEffect(() => {
		const getUsers = () => {
			const unsubscribe = onSnapshot(userCollection, (querySnapshot) => {
				setUsers(
					querySnapshot.docs.map((doc) => ({
						...doc.data(),
						id: doc.id,
					}))
				);
			});

			return () => {
				unsubscribe();
			};
		};

		getUsers();
	}, [userCollection]);
	return (
		<div className="min-h-screen flex flex-col  items-center  p-8">
			<Toaster />
			<div className="relative mt-6">
				<input
					type="text"
					className={`outline-none border-2 border-blue-400 rounded-full focus:ring-2 focus:custom-gradient-link transition-all duration-300 px-4 py-2`}
					onChange={handleChange}
					value={newUser.name}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					id="name"
					name="name"
				/>
				<label
					className={`absolute left-4 transition-all duration-300 ${
						isFocused || newUser.name
							? "text-blue-500 -translate-y-6"
							: ""
					}`}
				>
					Name
				</label>
			</div>

			{sectorsData && (
				<Dropdown
					overlay={
						<Menu onClick={handleMenuClick}>
							{sectorsData.map((item) => renderSubMenu(item))}
						</Menu>
					}
				>
					<a
						href="#"
						onClick={(e) => e.preventDefault()}
						className="mt-4 mb-12 inline-block custom-gradient-link text-white px-7 py-3 rounded-[25px] sm:mr-0"
					>
						<Space>
							{newUser.selected ? (
								<span>{newUser.selected}</span>
							) : (
								<span>Select item</span>
							)}
							<DownOutlined />
						</Space>
					</a>
				</Dropdown>
			)}

			<label htmlFor="agree_term" className="mb-5 flex items-center">
				Agree to terms
				<input
					onChange={handleChange}
					checked={newUser.term || false}
					className="w-5 h-5 ml-2"
					type="checkbox"
					name="term"
					id="term"
				/>
			</label>

			{editMode ? (
				<div className="mt-4 flex">
					<Button onClick={handleSaveEdit} save />
					<Button onClick={handleCancelEdit} />
				</div>
			) : (
				<Button onClick={createUserInfo} save />
			)}
			{users && (
				<UserInfos
					users={users}
					handleDelete={handleDelete}
					handleEditClick={handleEditClick}
				/>
			)}
		</div>
	);
}
export default App;
