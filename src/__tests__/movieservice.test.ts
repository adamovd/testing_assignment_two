import { IMovie } from "../ts/models/Movie";
import { getData } from "../ts/services/movieservice";
import { mockData } from "../ts/services/__mocks__/movieservice";

jest.mock("axios", () => ({
  get: async (searchText: string) => {
    return new Promise((resolve, reject) => {
      let queryString: string = searchText;
      let url: URLSearchParams = new URLSearchParams(queryString);
      let s = url.get("s");
      let newSearchText: string = `${s}`;
      console.log(searchText);
      if (newSearchText.length > 3) {
        resolve({ movie: { Search: mockData } });
      } else {
        reject({ movie: [] });
      }
    });
  },
}));

describe("getData", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  test("should get mock data", async () => {
    //Arrange
    let searchText: string = "Matrix";
    //Act
    let movies: IMovie[] = await getData(searchText);
    console.log(movies);

    //Assert
    expect(movies.length).toBe(4);
    expect(movies[0].Year).toBe("1999");
  });

  test("should not get mock data", async () => {
    //Arrange
    let searchText: string = "";
    //Act
    let movies: IMovie[] = await getData(searchText);
    //Assert
    expect(movies.length).toBe(0);
  });
});
