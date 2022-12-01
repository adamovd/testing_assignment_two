/**
 *@jest-environment jsdom
 */

import * as serviceFunctions from "../ts/services/movieservice";
import * as movieAppFunction from "../ts/movieApp";
import { IMovie } from "../ts/models/Movie";
import { mockData } from "../ts/services/__mocks__/movieservice";

jest.mock("./../ts/services/movieservice.ts");

describe("init", () => {
  test("should run handleSubmit on click", () => {
    //Arrange
    expect.assertions(1);
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
    document.body.innerHTML = "";
  });
});

describe("createHtml", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  test("should create Html", async () => {
    //Arrange
    expect.assertions(1);
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
    document.body.innerHTML = "";
  });
});

describe("displayNoResult", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  test("should show text noMessage", () => {
    //Arrange
    expect.assertions(1);
    document.body.innerHTML = `<div id="movie-container"></div>`;
    let container: HTMLDivElement = document.getElementById(
      "movie-container"
    ) as HTMLDivElement;
    //Act
    movieAppFunction.displayNoResult(container);
    //Assert
    expect(container.innerHTML).toBe("<p>Inga sökresultat att visa</p>");
    document.body.innerHTML = "";
  });
});

describe("handleSubmit", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("should run createHtml", async () => {
    //Arrange
    document.body.innerHTML = `<form id="searchForm">
    <input type="text" id="searchText" value="Star" placeholder="Skriv titel här" />
    <button type="submit" id="search">Sök</button>
    </form>
    <div id="movie-container"></div>`;
    let spy = jest.spyOn(movieAppFunction, "createHtml").mockReturnValue();
    //Act
    await movieAppFunction.handleSubmit();
    //Assert
    expect(spy).toHaveBeenCalled();
    document.body.innerHTML = "";
  });

  test("should run displayNoResult", async () => {
    //Arrange
    document.body.innerHTML = `<form id="searchForm">
    <input type="text" id="searchText" value="" placeholder="Skriv titel här" />
    <button type="submit" id="search">Sök</button>
    </form>
    <div id="movie-container"></div>`;
    let spy = jest.spyOn(movieAppFunction, "displayNoResult").mockReturnValue();
    //Act
    await movieAppFunction.handleSubmit();
    //Assert
    expect(spy).toHaveBeenCalled();
    document.body.innerHTML = "";
  });
});
