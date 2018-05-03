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

function processData(result, code = '') {
    for(let i = 0; i < result.length; i++) {
        let { content, tag } = result[i]
        if(Array.isArray(content)){
            code +=`<${tag}>`
            content.forEach(item => {
                code += `<${item.tag}>${item.content}</${item.tag}>`
                // console.log(code, i)
            })
            code +=`</${tag}>`
        }else if('string' == typeof content || 'number' == typeof content) {
            code += `<${tag}>${content}</${tag}>`
            // console.log(code, i)
        }else{
            let array = []
            array.push(content)
            console.log(content)
            code += `<${tag}>${processData(array, code)}</${tag}>`
            // console.log(code, i)
        }
    }
    return code
}

function writeHtml(result) {
    document.getElementById('content').innerHTML = processData(result)
}


document.getElementById('file').addEventListener('change', acceptData);