function searchMoving (){
    // membuat agar tidak numpuk
    $('#movie-list').html('');

    // untuk mengkoneksi ke api
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType : 'json',
        data: {
            'apikey': '5be93bee',
            's': $('#search-input').val()
        },

        // untuk menampilkan data dari api 
        success: function(result){
            if (result.Response == "True"){
                let Movie = result.Search;

                $.each(Movie, function(i, data){
                    $('#movie-list').append(`
                    <div class= col-md-4>
                    <div class="card md-3">
                    <img src="`+ data.Poster +`" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">`+ data.Title +`</h5>
                    <h6 class="card-subtitle mb-2 text-muted">` + data.Year + `</h6>
                    <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID +`">See Detail</a>
                        </div>
                     </div>
                    </div>
                    `);
                })

                // Agar search yang telah ditulis hilang 
                $('#search-input').val('');

            }else{
                $('#movie-list').html('<h1 class="text-center">'+ result.Error +'</h1>');
            }
        }
    });
}

// function di atas akan dijalankan oleh syntax bawah 
$('#search-button').on('click', function(){
    searchMoving();
});

$('#search-input').on('keyup', function(event){
    if (event.keyCode == 13){
        searchMoving();
    }
})

$('#movie-list').on('click','.see-detail', function(){
    // console.log($(this).data('id'));

    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey': '5be93bee',
            'i': $(this).data('id')
        },
        success: function(movie){
            if(movie.Response === "True"){

                $('.modal-body').html(`
                <div class="container-fluid">
                <div class="row">
                <div class="col-md-4">
                <img src="` + movie.Poster + `" class="img-fluid">
                </div>
                <div class="col-md-8">
                <ul class="list-group">
                <li class="list-group-item"><h3>`+ movie.Title +`</h3></li>
                <li class="list-group-item">`+ movie.Released +`</li>
                <li class="list-group-item">`+ movie.Genre +`</li>
                <li class="list-group-item">`+ movie.Director +`</li>
                <li class="list-group-item">`+ movie.Awards +`</li>
    </div>
  </div>
</div>
                `)
            }
        }
    });
});
