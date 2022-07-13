export class Post {
  constructor(
    public _id: string,
    public date: number,
    public title: string,
    public content: string,
    public imgUrl: string,
  ) {}
}
