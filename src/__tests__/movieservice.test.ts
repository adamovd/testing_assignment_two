import { IMovie } from "../ts/models/Movie";
import { getData } from "../ts/services/movieservice";
import { mockData } from "../ts/services/__mocks__/movieservice";
import mockAxios from "axios";
// const urlSearchParams = new URLSearchParams(window.location.search);
// const s = Object.fromEntries(urlSearchParams.entries());

jest.mock("axios", () => ({
  get: async (searchText: string) => {
    return new Promise((resolve, reject) => {
      if (searchText.length > 40) {
        resolve({ data: { Search: mockData } });
      } else {
        reject({ data: [] });
      }
    });
  },
}));

describe("getData", () => {
  test("should get mock data", async () => {
    //Arrange
    let searchText: string = "Matrix";
    //Act
    let result = await getData(searchText);
    //Assert
    expect(result.length).toBe(4);
    expect(result[0].Year).toBe("1999");
    expect(result[1].Title).toBe("Matrix");
    expect(result[2].Type).toBe("movie");
  });

  test("should not get mock data", async () => {
    //Arrange
    let searchText: string = "Matrix";
    let movies: IMovie[] = [];
    //Act
    try {
      movies = await getData(searchText);
    } catch (data: any) {
      //Assert
      console.log(data.data);
      expect(data.data.length).toBe(0);
    }
  });
});
