import { UserInfosProps } from "./helper/type";

const UserInfos: React.FC<UserInfosProps> = ({
	users,
	handleEditClick,
	handleDelete,
}: any) => {
	return (
		<>
			{users &&
				users.map(
					(
						user: {
							name: string;
							term: boolean;
							selected: string;
							id: string;
						},
						i: number
					) => (
						<div key={i}>
							<div className="md:flex md:justify-center border my-5 px-3 py-3 rounded-lg">
								<div className="w-[300px] md:w-[500px] flex users">
									<div className="flex flex-col mr-5">
										<strong>Name:</strong>
										<strong>Term:</strong>
										<strong>Selected value:</strong>
									</div>
									<div>
										<div className="">
											<p>{user.name}</p>
											<p>
												{user.term
													? "Agreed"
													: "Not Agreed"}
											</p>
											<p>{user.selected}</p>
										</div>
									</div>
								</div>
								<div className="flex justify-center mt-3">
									<button
										className="ml-2"
										onClick={() => handleEditClick(user.id)}
									>
										Edit
									</button>
									<button
										className="ml-2"
										onClick={() => handleDelete(user.id)}
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					)
				)}
		</>
	);
};
export default UserInfos;
