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
