export class ApiResponse {
  constructor (
    public Data?: string,
    public Count?: number,
    public ValidationErrors?: string[]
  ) {}
}
