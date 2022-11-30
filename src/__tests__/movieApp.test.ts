/**
 *@jest-environment jsdom
 */

import * as serviceFunctions from "../ts/services/movieservice";
import * as movieAppFunction from "../ts/movieApp";
import { IMovie } from "../ts/models/Movie";

jest.mock("./../ts/services/movieservice.ts");

describe("init", () => {
  test("should run handleSubmit on click", () => {
    //Arrange
    let spy = jest.spyOn(movieAppFunction, "handleSubmit").mockImplementation(
      () =>
        new Promise((resolve) => {
          resolve();
        })
    );
    document.body.innerHTML = `<form id="searchForm">
        <input type="text" id="searchText" placeholder="Skriv titel här" />
        <button type="submit" id="search">Sök</button>
        </form>`;
    movieAppFunction.init();
    //Act
    document.getElementById("search")?.click();
    //Assert
    expect(spy).toHaveBeenCalled();
  });
});

describe("handleSubmit", () => {
  test("should run function createHtml", async () => {
    //Arrange
    document.body.innerHTML = `<div id="movie-container"></div>`;
    let container: HTMLDivElement = document.getElementById(
      "movie-container"
    ) as HTMLDivElement;
    let searchText: string = "Matrix";
    //Act
    try {
      await serviceFunctions.getData(searchText);
    } catch (
      e
      //Assert
    ) {
      expect(e).toMatch("error");
    }
  });
});

describe("createHtml", () => {
  test("should create Html", async () => {
    //Arrange
    document.body.innerHTML = `<div id="movie-container"></div>`;
    let container: HTMLDivElement = document.getElementById(
      "movie-container"
    ) as HTMLDivElement;
    let searchText: string = "Matrix";
    let movies = await serviceFunctions.getData(searchText);
    //Act
    await movieAppFunction.createHtml(movies, container);
    //Assert
    expect(document.querySelectorAll("div.movie").length).toBe(4);
  });
});

describe("displayNoResult", () => {
  test("should show text noMessage", () => {
    //Arrange
    document.body.innerHTML = `<div id="movie-container"></div>`;
    let container: HTMLDivElement = document.getElementById(
      "movie-container"
    ) as HTMLDivElement;
    //Act
    movieAppFunction.displayNoResult(container);
    //Assert
    expect(container.innerHTML).toBe("<p>Inga sökresultat att visa</p>");
  });
});
