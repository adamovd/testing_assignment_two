/**
 *@jest-environment jsdom
 */

import { IMovie } from "../ts/models/Movie";
import { getData } from "../ts/services/movieservice";

let mockData: IMovie[] = [
  {
    Title: "Star Wars: Episode IV - A New Hope",
    imdbID: "tt0076759",
    Type: "movie",
    Poster: "img_source",
    Year: "1977",
  },
  {
    Title: "Star Wars: Episode V - The Empire Strikes Back",
    imdbID: "tt0076759",
    Type: "movie",
    Poster: "img_source",
    Year: "1980",
  },
  {
    Title: "Star Wars: Episode VI - Return of the Jedi",
    imdbID: "tt0076759",
    Type: "movie",
    Poster: "img_source",
    Year: "1983",
  },
];

jest.mock("axios", () => ({
  get: async () => {
    return new Promise((resolve) => {
      resolve({ data: { Search: mockData } });
    });
  },
}));

test("should get mock data", async () => {
  //Arrange
  expect.assertions(4);
  let searchText: string = "Star Wars: Episode X - The Return of the Fart";
  //Act
  let result = await getData(searchText);
  //Assert
  expect(result.length).toBe(3);
  expect(result[0].Year).toBe("1977");
  expect(result[1].Title).toBe(
    "Star Wars: Episode V - The Empire Strikes Back"
  );
  expect(result[2].Type).toBe("movie");
});
