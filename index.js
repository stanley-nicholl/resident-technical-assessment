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

    // instantiate an instance of a FileReader
    const reader = new FileReader();

    // once loaded, parse the data to prepare for it being written to html
    reader.onload = function(data) {
        const result = JSON.parse(data.target.result)
        writeHtml(result)
     }
    
    // declaring the data type from file submission (other possibilities are URL, binary, and arraybuffer)
    reader.readAsText(file)
}

function writeHtml(result) {
    let markup = ``
    console.log(Array.isArray(result))
    result.forEach(item => {
        if(Array.isArray(item)) return item.map(node).join('')
        let tag = item.tag
        let content = item.content
        console.log(content)
        if('string' == typeof content || 'number' == typeof content) {
            console.log('test')
            markup += `<${tag}>${content}</${tag}>`
        }else{
            return null
        }
    })
    console.log(markup)
    document.getElementById('content').innerHTML = markup

}


document.getElementById('file').addEventListener('change', acceptData);