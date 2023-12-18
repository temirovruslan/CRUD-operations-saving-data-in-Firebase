export interface MenuItem {
	key: string;
	label: string;
	children?: MenuItem[];
	disabled?: boolean;
}

export interface SelectedItem {
	key: string;
	value: string;
}

export interface ButtonProps {
	onClick: () => void;
	save?: boolean;
}
export interface UserInfosProps {
	users: any[];
	handleEditClick: (userId: string) => void;
	handleDelete: (userId: string) => void;
}