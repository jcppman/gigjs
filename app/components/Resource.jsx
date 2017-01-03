const loading = [];

class Resource {
  static allResourcesLoaded() {
    return Promise.all(loading);
  }
  constructor(url, type) {
    this.url = url;
    this.type = type;
    this.blobUrl = fetch(url)
      .then(res => res.blob())
      .then(b => URL.createObjectURL(b));
    loading.push(this.loaded);
  }
}

export default Resource;
