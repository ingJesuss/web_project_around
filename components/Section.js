export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._rendererItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._rendererItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.appendChild(element);
  }
}
