const bigFetch = (path,body) => {
    return fetch('http://localhost:3001/' + path,{
        method:'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(body),
      })
}


 export default bigFetch