type PostType = {
	userId: UserType,
	public: boolean,
	content: string,
	_id: string,
	media: MediaType[],
	block: boolean,
}