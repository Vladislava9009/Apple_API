
  $('.carousel').carousel({interval: 10000, pause: "hover"});

var server = 'https://itunes.apple.com/';

(function appleApi(options = {}){
    var defaults = {
        name: 'Harry+Potter',
        limit:'9'
        
    };
    options = $.extend(defaults, options);
  //  options = $.extend(defaults, options);

    let $searchFormElement=$('#search-form');
   
    $searchFormElement.on('submit',function(event){
        event.preventDefault();
        let options={}
       options.name =$('[name="searchValue"]',this).val();
        options.name = (options.name).trim()
        console.log(options) 
        appleApi(options)
        });

    var request = $.ajax(`${server}/search?entity=movie&term=${options.name}&limit=${options.limit}`);//&limit=3


    request.done(response=>{
        $('#list').empty();
        $('.carousel-inner').empty();
        $('.carousel-inner').empty();
        $('.carousel-indicators').empty();
        let library = JSON.parse(response),
            songsList = library.results;
              
            
            songsList.forEach(songs => {
    
             let   $a=$('<a>').attr('href',songs.collectionViewUrl).text('Readmore...').attr('target','blank'),
                    $h5=$('<h5>').text((songs.trackCensoredName))
                
                $('<div>')
                    .addClass('item')    
                    .addClass('text-center')
                    .appendTo('.carousel-inner')
                    .append(`<video src = "${songs.previewUrl}" id="video1" controls >`)  
                    .append('<div class="carousel-caption" >')
                    .find('.carousel-caption')
                        .append('<h3>').text(songs.trackCensoredName)
                        .append('<p>')

                $('<li data-target="#myCarousel" data-slide-to="">')
                    .appendTo('.carousel-indicators')
                
                $('<div>')
                    .addClass('col-xs-4')
                    .css('border','0.5px solid #555')
                    .appendTo('#list')
                    .append('<div class="col-xs-7 id="description">')
                    .find('.col-xs-7')
                        .append($h5)
                        .append('<p>')
                        .append($a)
                        .end()
                    .append('<div class="col-xs-5" id="picture">')
                    .find('#picture')
                        .append(`<img src = "${songs.artworkUrl100}" alt="">`)
                    
                        
            });
            $('.item:first-child').addClass('active')
            $('.carousel-indicatirs:first-child').addClass('active')
       
        });

})();
 
    

    



