export interface BlogType {
    body: string;
    comments: [
      {
        author: string;
        body: string;
        _id: string;
      }
    ];
    createdAt: string;
    published: boolean;
    title: string;
    updatedAt: string;
    user: {
      _id: string;
      username: string;
    };
    _id: string;
}

export interface LoginResponse {
  token: string,
  username: string,
}

export interface CommentType {
  comment: {
    author: string;
    body: string;
  };
}