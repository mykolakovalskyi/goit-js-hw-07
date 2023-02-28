import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");
let instance;

const galleryItem = galleryItems
  .map(
    (item) =>
      `<div class="gallery__item">
  <a class="gallery__link" href="${item.original}">
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
  </a>
</div>`
  )
  .join("");

gallery.insertAdjacentHTML("beforeend", galleryItem);

gallery.addEventListener("click", selectImage);

function selectImage(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const selectedImage = event.target.dataset.source;

  instance = basicLightbox.create(
    `
    <img src="${selectedImage}" width="800" height="600">
`,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", escapeCloseKey);
      },
      onClose: (instance) => {
        document.removeEventListener("keydown", escapeCloseKey);
      },
    }
  );

  instance.show();
}

function escapeCloseKey(event) {
  if (event.key === "Escape") {
    instance.close();
  }
}
