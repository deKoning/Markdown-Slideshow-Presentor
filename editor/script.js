// script.js

const markdownTextarea = document.getElementById('markdownTextarea');
const filenameInput = document.getElementById('filename');
const loadFileInput = document.getElementById('loadFile');
const loadButton = document.getElementById('loadButton');
const saveButton = document.getElementById('saveButton');
const onlineFileSelect = document.getElementById('onlineFile');
const loadOnlineButton = document.getElementById('loadOnlineButton');

loadButton.addEventListener('click', () => {
  const selectedFile = loadFileInput.files[0];

  if (selectedFile) {
    const reader = new FileReader();
    reader.onload = function(event) {
      markdownTextarea.value = event.target.result;
    };
    reader.readAsText(selectedFile);
  }
});

loadOnlineButton.addEventListener('click', () => {
  const selectedOnlineFile = onlineFileSelect.value;

  if (selectedOnlineFile) {
    fetch(selectedOnlineFile)
      .then(response => response.text())
      .then(data => {
        markdownTextarea.value = data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
});

saveButton.addEventListener('click', () => {
  const markdownContent = markdownTextarea.value;
  const filename = filenameInput.value + '.md'; // Add .md extension

  fetch('save-markdown.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'markdownContent=' + encodeURIComponent(markdownContent) + '&filename=' + encodeURIComponent(filename)
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      alert('Markdown content saved successfully.');
    } else {
      alert('Error saving Markdown content.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});



// ... Other JavaScript code ...

const refreshListButton = document.getElementById('refreshListButton');

refreshListButton.addEventListener('click', () => {
  // Clear the existing options from the dropdown
  onlineFileSelect.innerHTML = '<option value="">Select a file</option>';
  
  // Fetch the updated list of available online .md files and populate the dropdown
  fetch('list-md-files.php')
    .then(response => response.json())
    .then(data => {
      data.forEach(file => {
        const option = document.createElement('option');
        option.value = 'load-md-file.php?filename=' + encodeURIComponent(file);
        option.textContent = file;
        onlineFileSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error fetching list of .md files:', error);
    });
});

// ... Rest of the JavaScript code ...

