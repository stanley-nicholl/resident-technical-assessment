//function is used to intake file from submission, parse and send to function to write to page
function acceptData(event) {
    //file object, must select the first item as the API allows
    // for multiple files to be uploaded
    const file = event.target.files[0];

    //test to ensure file type is JSON
    if ('application/json' !== file.type) {
        alert('wrong file type')
        return null
    }

    const reader = new FileReader();

    reader.onload = function(data) {
        const result = JSON.parse(data.target.result)
        writeHtml(result)
     }
        
    reader.readAsText(file)
}

function writeHtml(result) {
    document.getElementById('content').innerHTML = result[0].tag
}



document.getElementById('file').addEventListener('change', acceptData);