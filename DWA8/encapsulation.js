// the line below will import information from the './data' file
import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

let matches = books;
let range = [0, BOOKS_PER_PAGE];
let page = 1;

// The two conditions below give an arror when the content is not found
if (!books && !Array.isArray(matches)) {
  throw new Error("Source required");
}
if (!range && range.length < 2) {
  throw new Error("Range must be an array with two numbers");
}

// all the extracted data types from the html file
const activeList = document.querySelector("[data-list-active]");
const dataList = document.querySelector("[data-list-items]");
const btnClose = document.querySelector("[data-list-close]");
const cancelBtn = document.querySelector("[data-search-cancel]");
const bookDescription = document.querySelector("[data-list-description]");
const bookSubtitle = document.querySelector("[data-list-subtitle]");
const bookTittle = document.querySelector("[data-list-title]");
const blurryBookPic = document.querySelector("[data-list-blur]");
const bookPic = document.querySelector("[data-list-image]");
const themeOption = document.querySelector("[data-settings-theme]");
const formChange = document.querySelector("[data-settings-form]");
const formOverlay = document.querySelector("[data-settings-overlay]");
const searchOverlay = document.querySelector("[data-search-overlay]");
const btnSettings = document.querySelector("[data-header-settings]");
const listMessage = document.querySelector("[data-list-message]");

const btnList = document.querySelector("[data-list-button]");
const btnHeader = document.querySelector("[data-header-search]");
const formSearch = document.querySelector("[data-search-form]");
const titleSearch = document.querySelector("[data-search-title]");
const genreSearch = document.querySelector("[data-search-genres]");
const searchAuthor = document.querySelector("[data-search-authors]");
const cancelSettings = document.querySelector("[data-settings-cancel]");
const formDivSearch = document.querySelector('[id="search"]');

/**
 * Extracting information from the book array in the data js file and displaying the
 * @param {string} bookExtract
 */

const previewFragment = (bookExtract) => {
  return{// added encapsulation using single factory function
    preview (){
        const fragmentPage = document.createDocumentFragment();
  for (const book of bookExtract) {
    const previewItems = document.createElement("button");
    previewItems.className = "preview";
    previewItems.setAttribute("id", `${book.id}`);

    previewItems.innerHTML = /* html */ `
            <img
                class="preview__image"
                src="${book.image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${book.title}</h3>
                <div class="preview__author">${authors[book.author]}</div>
            </div>`;

    fragmentPage.appendChild(previewItems);
    dataList.appendChild(fragmentPage);
  }
    }
  }
};
previewFragment(books.slice(0, BOOKS_PER_PAGE));

dataList.addEventListener("click", function (event) {
  activeList.show();

  const idBook = event.target.closest(".preview").id;
  let showingBook = [];
  for (const actBook of books) {
    if (idBook === actBook.id) {
      showingBook = actBook;
      break;
    }
  }
  bookPic.src = showingBook.image;
  blurryBookPic.src = showingBook.image;
  bookTittle.innerHTML = showingBook.title;
  bookSubtitle.innerHTML = `${
    authors[showingBook.author]
  } (${showingBook.published.slice(0, 4)})`;
  bookDescription.innerHTML = showingBook.description;

  btnClose.addEventListener("click", function (event) {
    activeList.close();
  });
});

// Object for theme colour range for the day and night times

const theme = {
  day: {
    dark: "10, 10, 20",
    light: "255, 255, 255",
  },

  night: {
    dark: "255, 255, 255",
    light: "10, 10, 20",
  },
};

/**the following allows the theme settings to close and open when user presses of clicks on it
 */

const themeSettings = (event) => {
  return{// added encapsulation using single factory function
    theme(){
        const { target } = event;
  if (formOverlay.open === false) {
    formOverlay.showModal();
  } else if (target === cancelSettings) {
    formOverlay.close();
  }
    }
  }
};

/**This part of the code establishes a click event handler for the theme settings button.
 * When this button is clicked, it triggers the display of the dialog box associated with theme settings.
 *  Furthermore, if the close button inside the dialog box is clicked, it will close the dialog. */
btnSettings.addEventListener("click", themeSettings);
cancelSettings.addEventListener("click", themeSettings);

/**The 'changeTheme' function will allow the user to change the theme of the page
 * according to their preference
 */
const changeTheme = (event) => {
  event.preventDefault();
  const themeChange = themeOption.value;

  return{// added encapsulation using single factory function
    themeChanger(){
        if (themeChange === "day") {
            document.documentElement.style.setProperty(
              "--color-light",
              theme.day.light
            );
            document.documentElement.style.setProperty("--color-dark", theme.day.dark);
          } else if (themeChange === "night") {
            document.documentElement.style.setProperty(
              "--color-light",
              theme.night.light
            );
            document.documentElement.style.setProperty(
              "--color-dark",
              theme.night.dark
            );
          }
          formOverlay.close();
    }
  }
};

formChange.addEventListener("submit", changeTheme);

// setting the user theme based on the users preffered device theme
const darkModePreff = window.matchMedia("(prefers-color-scheme: dark)").matches;
const themeInit = darkModePreff ? "night" : "day";
document.documentElement.style.setProperty(
  "--color-dark",
  theme[themeInit].dark
);
document.documentElement.style.setProperty(
  "--color-light",
  theme[themeInit].light
);

/** the function/code below assists in activating the load more button and
 * ensures that when the user clicks that button more books will load
 */

const showMoreBooks = () => {
  return{// added encapsulation using single factory function
    moreBooks(){
        const remainingBooks = books.length - page * BOOKS_PER_PAGE;
  dataList.appendChild(previewFragment(books));
  addButtonEvents();

  if (remainingBooks <= 0) {
    btnList.disabled = true;
    btnList.textContent = `Show more (0)`;
  } else {
    btnList.textContent = `Show more (${remainingBooks})`;
    btnList.disabled = false;
  }
    }
  }
};

// the following code add text to the 'show more' button.
btnList.innerHTML = `<span>Show more</span>
    <span class="list__remaining">${Math.max(
      0,
      books.length - 0 * BOOKS_PER_PAGE
    )}</span>`;

btnList.addEventListener("click", showMoreBooks); // activates more books being loaded when the event 'click' is recived.

/**
 * Activate the search button
 * Filter the search according to the user input
 * This will determine wether the user input either matches the genre or the author
 */

const functionBookSearch = (event) => {
  const { target } = event;
  if (searchOverlay.open === false) {
    searchOverlay.showModal();
    titleSearch.focus();
  } else if (target === cancelBtn) {
    searchOverlay.close();
  }
};

btnHeader.addEventListener("click", functionBookSearch);
cancelBtn.addEventListener("click", functionBookSearch);

// Searching for authors and genres
const searchBooks = (event) => {
  event.preventDefault();
  searchOverlay.close();
  const form_data = new FormData(formDivSearch);
  const filters = Object.fromEntries(form_data);
  const results = [];

 return{ // added encapsulation using single factory function
    search (){
        for (const book of books) {
            const bookTitleMatch =
              filters.title.trim() === "" ||
              book.title.toLowerCase().includes(filters.title.toLowerCase());
            const bookAuthorMatch =
              filters.author === "All Authors" || book.author.includes(filters.author);
            const bookGenreMatch =
              filters.genre === "All Genres" || book.genres.includes(filters.genre);
        
            if (bookTitleMatch && bookAuthorMatch && bookGenreMatch) {
              results.push(book);
            }
          }
          if (results.length < 1) {
            listMessage.classList.add("list__message_show");
          } else {
            listMessage.classList.remove("list__message_show");
          }
          if (results.length <= 36) {
            btnList.disabled = true;
            btnList.textContent = `Show more (0)`;
          } else {
            btnList.disabled = false;
            btnList.textContent = `Show more (${results.length - 36})`;
          }
          dataList.replaceChildren(previewFragment(results, 0, 36));
          addButtonEvents();
          window.scrollTo({ top: 0, behavior: "smooth" });
    }
 }
};

// This code creates the search options for genres
const listOfGenres = document.createDocumentFragment();
const setGenre = "All Genres";
genreSearch.innerHTML = `<option>${setGenre}</option>`;
genreSearch.appendChild(listOfGenres);
for (const [idofGenre, nameOfGenre] of Object.entries(genres)) {
  const genreOptions = document.createElement("option");
  genreOptions.innerText = `${nameOfGenre}`;
  genreOptions.value = idofGenre;
  listOfGenres.appendChild(genreOptions);
}
genreSearch.appendChild(listOfGenres);

// This code creates the search options for authors
const listofAuthors = document.createDocumentFragment();
const resetAuthor = "All Authors";
searchAuthor.innerHTML = `<option>${resetAuthor}</option>`;
for (const [id, name] of Object.entries(authors)) {
  const authorOpt = document.createElement("option");
  authorOpt.innerText = `${name}`;
  authorOpt.value = id;
  listofAuthors.appendChild(authorOpt);
}
searchAuthor.appendChild(listofAuthors);

/**
 * this event listener will prevent default upon submission, then creates an array of filtered books and displays them on the webpage
 */
formSearch.addEventListener("submit", searchBooks);
