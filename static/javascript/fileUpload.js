export function fileUploadSetup() {
  let button = document.getElementById('fileUploadButton');
  let fileInput = document.getElementById('fileInput');
  let form = document.getElementById('uploadFileForm');

  button.addEventListener('click', () => {
    fileInput.click();
  });
  fileInput.addEventListener('change', () => {
    form.submit();
  });
}
