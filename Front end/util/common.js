export const getHTML=(fileLoc)=>{

    return new Promise((resolve, reject) =>{
        fetch(fileLoc)
        .then(response=>response.text())
        .then(html=>{
            const broken=html.split('\n')
            let linesToRemove=[]
            broken.forEach((line,index) =>{
                if(line.includes("<script>") && !broken[index-1].includes("live-server")){
                    for(let i=index;i<broken.length;i++){
                        if(broken[i].includes("</script>")){
                            linesToRemove.push({"start":index,"stop":i});
                            break;
                        }
                    }
                }
            })
            linesToRemove.forEach(({ start, stop }) => {
                broken.splice(start, stop - start + 1);
            });
            const resultHTML = broken.join('\n');
            resolve(resultHTML);
        }).catch(error => {reject(error)})
    })

}

