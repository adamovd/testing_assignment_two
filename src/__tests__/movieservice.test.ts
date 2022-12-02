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
      console.log(newSearchText);
      if (newSearchText.length > 0) {
        resolve({ data: { Search: mockData } });
      } else {
        reject({ data: [] });
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
    expect.assertions(3);
    let searchText: string = "Matrix";
    //Act
    let movies: IMovie[] = await getData(searchText);
    console.log(movies);
    //Assert
    expect(movies.length).toBe(4);
    expect(movies[0].Year).toBe("1999");
    expect(movies[1].Title).toBe("Avengers");
  });

  test("should not get mock data", async () => {
    //Arrange
    let searchText: string = "";
    //Act
    try {
      await getData(searchText);
    } catch (data: any) {
      //Assert
      expect(data.data.length).toBe(0);
    }
  });
});
