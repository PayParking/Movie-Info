$(document).ready(function() {
  $('#searchForm').on('submit', function(e){
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios.get("http://omdbapi.com?s=" + searchText + "&apikey=eac2f37c")
    .then(function(response) {
      $('#movies').html('');
      console.log(response);
      let movies = response.data.Search;
      let output = "";
      $.each(movies,function(index, movie) {
        output += '\
        <div class="col-md-3">\
          <div class="well text-center">\
            <img src="' + movie.Poster + '">\
            <h5>' + movie.Title + '</h5>\
            <a onclick="movieDetails(\'' + movie.imdbID + '\')" class="btn btn-primary" href="#">Movie Detail</a>\
          </div>\
        </div>';
        
      })
      $('#movies').html(output);    
    })
}

function movieDetails(id) {
  sessionStorage.setItem('movieId', id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');
  axios.get("http://omdbapi.com?i=" + movieId + "&apikey=eac2f37c")
    .then(function(response) {
      let movie = response.data;
      let output = "";
      output = '\
      <div class="col-md-5">\
        <div id="details">\
          <img src="' + movie.Poster + '">\
          <ul>\
            <li> Movie Title: ' + movie.Title + '</li>\
            <li> Year Released: ' + movie.Year + '</li>\
            <li> Rated: ' + movie.Rated + '</li>\
            <li> Released Date: ' + movie.Released + '</li>\
            <li> Runtime: ' + movie.Runtime + '</li>\
            <li> Genre: ' + movie.Genre + '</li>\
            <li> Director: ' + movie.Director + '</li>\
            <li> Writer : ' + movie.Writer + '</li>\
            <li> Actors : ' +  movie.Actors + '</li>\
            <li> Metascore : ' + movie.Metascore + '/100</li>\
            <li> imdbRating : ' + movie.imdbRating + '</li>\
          </ul>\
        </div>\
        <div id="buttons">\
          <a class="btn btn-primary" href="index.html">Back</a>\
          <a class="btn btn-primary" href="http://www.imdb.com/title/' + movieId + '">IMDB Site</a>\
        </div>\
      </div>'; 

      $('#movie').html(output);
    })
}
