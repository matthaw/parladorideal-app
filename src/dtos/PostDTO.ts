export interface PostDTO {
  id: string;
  content: string;
  created_at: string;
  user: {
    name: string;
  };
}
