import { movieSort } from "../ts/functions";
import { IMovie } from "../ts/models/Movie";
import { mockData } from "../ts/services/__mocks__/movieservice";

describe("movieSort", () => {
  test("should sort list a-z", () => {
    //Arrange
    expect.assertions(1);
    let movies: IMovie[] = mockData;
    //Act
    movieSort(movies);
    //Assert
    expect(movies[0].Title).toBe("Avengers");
  });

  test("should sort list z-a", () => {
    //Arrange
    expect.assertions(1);
    let movies: IMovie[] = mockData;
    //Act
    movieSort(movies, false);
    //Assert
    expect(movies[0].Title).toEqual("Matrix");
  });

  test("should sort list with two equal values", () => {
    //Arrange
    expect.assertions(1);
    let movies: IMovie[] = mockData;
    //Act
    movieSort(movies, false);
    //Assert
    expect(movies[0].Title).toEqual(movies[1].Title);
  });
});
