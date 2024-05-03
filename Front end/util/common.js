export const getHTML=(fileLoc)=>{

    return new Promise((resolve, reject) =>{
        fetch(fileLoc)
        .then(response=>response.text())
        .then(html=>{
            resolve(html);
        }).catch(error => {reject(error)})
    })

}

