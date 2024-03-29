export interface BlogType {
    body: string;
    comments: [
      {
        author: string;
        body: string;
        _id: string;
      }
    ];
    createdAt: string | Date;
    published: boolean;
    title: string;
    updatedAt: string | Date;
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
  onClick: () => void;
}