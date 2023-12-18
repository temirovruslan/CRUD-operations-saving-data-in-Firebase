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

// <div className="relative mt-6">
// 				<input
// 					type="text"
// 					className={`outline-none border-2 border-blue-500 rounded-full focus:ring-2 focus:ring-blue-500 transition-all duration-300 px-4 py-2`}
// 					value={inputValue}
// 					onChange={(e) => setInputValue(e.target.value)}
// 					onFocus={() => setFocused(true)}
// 					onBlur={() => setFocused(false)}
// 				/>
// 				<label
// 					className={`absolute left-4 transition-all duration-300 ${
// 						isFocused || inputValue
// 							? "text-blue-500 -translate-y-6"
// 							: ""
// 					}`}
// 				>
// 					Name
// 				</label>
// 			</div>


// <label htmlFor="agree_term" className="mt-12 flex items-center">
// 				Agree to terms
// 				<input
// 					className="w-5 h-5 ml-2"
// 					type="checkbox"
// 					name="agree_term"
// 					id="agree_term"
// 				/>
// 			</label>