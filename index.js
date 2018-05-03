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


function processData(result) {
    let html = ''
    let { content, tag } = result
    if(Array.isArray(content)){
        html +=`<${tag}>`
        content.forEach(item => {
            html += `<${item.tag}>${item.content}</${item.tag}>`
        })
        html +=`</${tag}>`
    }else if('string' == typeof content || 'number' == typeof content) {
        html += `<${tag}>${content}</${tag}>`
    }else{
        let array = []
        array.push(content)
        html += `<${tag}>${processData(content)}</${tag}>`
    }
    return html
}

function writeHtml(result) {
    document.getElementById('content').innerHTML = result.reduce((acc, item) => {
        return acc + processData(item)
    }, '')
}


document.getElementById('file').addEventListener('change', acceptData);