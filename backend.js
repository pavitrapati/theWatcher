const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmZhM2UxNGQ0ZjMxOTg1NDk5NGE0ZjRjM2I0ODYwOCIsInN1YiI6IjY1NmNhNzlmZTM4YmQ4MDEzODU3MTRjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dj5HiwpguntzVOpJVHY1sQ7emIQuESxWfM09tKqS9Ss'
    }
};
function srch() {
document.getElementById('tiles').innerHTML='';
title=document.getElementById('title').value;
while (true){
if (title.indexOf(' ')!=-1){
    title=title.replace(" ",'%20');
}
else{
    break;
}}
if (document.getElementById('viewtype').value==0){
    querylink='https://api.themoviedb.org/3/search/movie?query=';
    extidlink='https://api.themoviedb.org/3/movie/';
    varvidlink='https://vidsrc.to/embed/movie/';
    flag=0;
}
else{
    querylink='https://api.themoviedb.org/3/search/tv?query=';
    extidlink='https://api.themoviedb.org/3/tv/';
    varvidlink='https://vidsrc.in/embed/tv/';
    flag=1;
}


link=querylink+title;
resrec=fetch(link, options)
.then(response => response.json())
.then(response => {
    resloop=response.results
    for (const items of resloop){
        ext_ids=fetch(extidlink+items.id+'/external_ids?api_key=4ffa3e14d4f319854994a4f4c3b48608')
        .then(response => response.json()).then(response =>{
            try {
                imglink='https://img.omdbapi.com/?apikey=29eb6664&i='+response.imdb_id;
                URL(imglink);
            } catch (error) {
                imglink='https://image.tmdb.org/t/p/original'+items.poster_path;
            }
            vidlink=varvidlink+items.id;
            if (flag==0){
                document.getElementById('tiles').innerHTML+=`<div style="width: 20%;display: flex;flex-direction: column;align-items: center;margin: 2%;"><a href="${vidlink}">${items.title}</a><a href="${vidlink}"><img src="${imglink}" alt="Image" style="width: 100%;"></a><p>${items.release_date}</p></div>`;
            }
            else{
                document.getElementById('tiles').innerHTML+=`<div style="width: 20%;display: flex;flex-direction: column;align-items: center;margin: 2%;"><a href="${vidlink}">${items.name}</a><a href="${vidlink}"><img src="${imglink}" alt="Image" style="width: 100%;"></a><p>${items.first_air_date}</p></div>`;
            }
        })
        .catch(err => console.error(err));;
    }}).catch(err => console.error(err));;
}
