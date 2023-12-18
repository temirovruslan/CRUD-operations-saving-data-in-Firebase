import { useEffect, useState } from "react";
import { fetchData } from "./helper";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";

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

const items = [
	{
		key: "1",
		type: "group",
		label: "Group title",
		children: [
			{
				key: "1-1",
				label: "1st menu item",
			},
			{
				key: "1-2",
				label: "2nd menu item",
			},
		],
	},
];

const menu = (
	<Menu>
		{/* Your menu items go here */}
		<Menu.Item key="1">Item 1</Menu.Item>
		<Menu.Item key="2">Item 2</Menu.Item>
		<Menu.Item key="3">Item 3</Menu.Item>
	</Menu>
);
function App() {
	const [users, setUsers] = useState<any>();
	console.log("App ~ users >", users);
	const userCollection = collection(db, "selector");
	const [inputValue, setInputValue] = useState("");
	const [isFocused, setFocused] = useState(false);
	const [data, setData] = useState<MenuItem[] | undefined>();
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

	useEffect(() => {
		const dataResponse = async () => {
			try {
				const data = await fetchData();
				setData(data);
			} catch (error) {
				console.log(error);
			}
		};
		dataResponse();
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
			<div className="relative mt-6">
				<input
					type="text"
					className={`outline-none border-2 border-blue-500 rounded-full focus:ring-2 focus:ring-blue-500 transition-all duration-300 px-4 py-2`}
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
				/>
				<label
					className={`absolute left-4 transition-all duration-300 ${
						isFocused || inputValue
							? "text-blue-500 -translate-y-6"
							: ""
					}`}
				>
					Name
				</label>
			</div>

			{users && (
				<Dropdown
					overlay={
						<Menu onClick={handleMenuClick}>
							{users.map((item: any) => renderSubMenu(item))}
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

			<label htmlFor="agree_term" className="mt-12 flex items-center">
				Agree to terms
				<input
					className="w-5 h-5 ml-2"
					type="checkbox"
					name="agree_term"
					id="agree_term"
				/>
			</label>
		</div>
	);
}

export default App;

// {data && (
// 	<Dropdown
// 		overlay={
// 			<Menu onClick={handleMenuClick}>
// 				{data.map((item) => renderSubMenu(item))}
// 			</Menu>
// 		}
// 	>
// 		<a
// 			href="#"
// 			onClick={(e) => e.preventDefault()}
// 			className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded mr-[150px] sm:mr-0"
// 		>
// 			<Space>
// 				{selectedItem ? (
// 					<span>{selectedItem.value}</span>
// 				) : (
// 					<span>Cascading menu</span>
// 				)}
// 				<DownOutlined />
// 			</Space>
// 		</a>
// 	</Dropdown>
// )}
