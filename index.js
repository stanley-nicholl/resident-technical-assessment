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

//processor combs through an individual object 
function processData(object) {
    //html is stored and accumulated as a string before being returned to the write function below
    let html = ''

    //to enusre no recursion call goes deeper than the JSON object depth
    if(!object.content || !object.tag) return null

    //destructuring the object to reduce code
    let { content, tag } = object

    //testing if the object's content is an array
    //nested to handle required JSON object depth
    if(Array.isArray(content)){
        html +=`<${tag}>`

        content.forEach(item => {
            if('string' == typeof item.content || 'number' == typeof item.content) {
                html += `<${item.tag}>${item.content}</${item.tag}>`
            }else if(Array.isArray(item.content)){
                html +=`<${tag}>`
                item.content.forEach(subItem => {
                    html += `<${subItem.tag}>${subItem.content}</${subItem.tag}>`
                })
                html +=`</${tag}>`
            }else{
                html += `<${item.tag}>${processData(item.content)}</${item.tag}>`
            }        
        })
        html +=`</${tag}>`
        
    //testing if the object's content is a string or number
    }else if('string' == typeof content || 'number' == typeof content) {
        html += `<${tag}>${content}</${tag}>`

    //if not a string, number or array, the item is an object which results in a recursive call
    }else{
        html += `<${tag}>${processData(content)}</${tag}>`
    }

    //upon completion, the accumulated html is returned as a string
    return html
}

//write markup to webpage by sending through each element of the JSON object through the processor
function writeHtml(result) {
    //clear the DOM, at least the variable portion should someone sumbit two different files
    document.getElementById('content').innerHTML = ''

    //combines all the HTML that comes out of the processor function above
    document.getElementById('content').innerHTML = result.reduce((acc, item) => {
        return acc + processData(item)
    }, '')
}

//hi, wes!
console.log(` _______  __          ________                __ 
|   |   ||__|        |  |  |  |.-----..-----.|  |
|       ||  | __     |  |  |  ||  -__||__ --||__|
|___|___||__||  |    |________||_____||_____||__|
              |_|                                `)

document.getElementById('file').addEventListener('change', acceptData);