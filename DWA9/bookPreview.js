export class BookPreview extends HTMLElement {
    constructor(author,id,image,title) {
      super();
      this.attachShadow({ mode: 'closed' });
  
      // Get attributes
      this.author = author;
      this.id = id;
      this.image = image;
      this.title = title;
  
      // Create a button element
      const button = document.createElement('button');
      button.classList = 'preview';
      button.setAttribute('data-preview', id);
  
      // Create the inner HTML structure using a template
      button.innerHTML = `
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${author[author]}</div>
        </div>
      `;
  
      // Append the button to the shadow DOM
      this.shadowRoot.appendChild(button);
    }
  }
  
  customElements.define('book-preview', BookPreview);

  const starting = document.createDocumentFragment()
  
  const bookPreview = () => {
    const dataListItems = document.querySelector('[data-list-items]').appendChild(starting);
    
    for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
      const bookPreviewElement = document.createElement('book-preview');
      bookPreviewElement.setAttribute('author', author);
      bookPreviewElement.setAttribute('id', id);
      bookPreviewElement.setAttribute('image', image);
      bookPreviewElement.setAttribute('title', title);
  
      dataListItems.appendChild(bookPreviewElement);
    }
  };
  
  bookPreview();
  