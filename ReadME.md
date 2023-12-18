// Script to run server:
json-server --watch db.json



// Script to run the project:
npm run dev


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