export interface GetAllTestsResponse {
  id: string;
  testName: string;
  description?: string;
  isEntryTest: boolean;
  isPublished: boolean;
}
