import { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";
import { sectorsData } from "./helper/data";

interface MenuItem {
	key: string;
	label: string;
	children?: MenuItem[];
	disabled?: boolean;
}

interface SelectedItem {
	key: string;
	value: string;
}

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
	const [users, setUsers] = useState<any>();

	const userCollection = collection(db, "users");
	const [selectedItem, setSelectedItem] = useState<
		SelectedItem | undefined
	>();

	useEffect(() => {
		const getUsers = async () => {
			const data = await getDocs(userCollection);
			setUsers(data.docs.map((doc) => ({ ...doc.data() })));
		};
		getUsers();
	}, []);

	const handleMenuClick: (info: MenuInfo & { key: React.Key }) => void = (
		info
	) => {
		const { key, domEvent } = info;
		const value = (domEvent.currentTarget as HTMLElement).innerText;
		setSelectedItem({ key: String(key), value });
	};

	return (
		<div className="min-h-screen flex flex-col justify-center items-center  p-8">
			{users &&
				users.map((user: { name: string }, i: number) => {
					return <li key={i}>{user.name}</li>;
				})}
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
						className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded mr-[150px] sm:mr-0"
					>
						<Space>
							{selectedItem ? (
								<span>{selectedItem.value}</span>
							) : (
								<span>Cascading menu</span>
							)}
							<DownOutlined />
						</Space>
					</a>
				</Dropdown>
			)}
		</div>
	);
}

export default App;
