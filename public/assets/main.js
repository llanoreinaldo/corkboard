let urlField;
const put = function(url, data, callback){

    if ( $.isFunction(data) ){
      type = type || callback,
      callback = data,
      data = {}
    }
   
    return $.ajax({
      url: url,
      type: 'PUT',
      success: callback,
      data: JSON.stringify(data),
      contentType:'application/json'
    });
   }

$('document').ready(() => {
    console.log('ready')

    //filter buttons
    $('#filter').click(() => {
        $('.filterCard').toggle('blind');
    })

    //show/hide announcements
    $('#announce').click(() => {
        $('.sidebar').toggle('blind');
    }) 
        

    //Small menu button
    $('.smallMenu').click(() => {
        $('.filterCard').hide();
        $('.sidebar').hide();
    })

    //Small add button
    $('.smallAdd').click(() => {
        $('.filterCard').hide();
        $('.sidebar').hide();
    })

    //topic submit function
    $('.link').click((e) => {
        e.preventDefault();
        const id = $('#boardName').attr("data-boardId")
        var field = $('#title').val().trim();
        console.log(field);
        let data = {
            name: field
        }
        $.post('/api/boards/' + id + '/tags/new', data, function (data) {
            console.log(data);
            location.reload();
        });
    })

    //post submit function
    $('.postButton').click((e) => {
        const id = $('#boardName').attr("data-boardId")
        e.preventDefault();
        var newTitle = $('#postTitle').val().trim();
        var newUrl = $('#postUrl').val().trim();
        var newDescription = $('#postDescription').val().trim();
        var newImageUrl = $('#postImgUrl').val().trim();
        console.log(newTitle);
        let data = {
            title: newTitle,
            description: newDescription,
            url: newUrl,
            image_url: newImageUrl
        }
        $.post('/api/boards/' + id + '/links/new', data, function (data) {
            console.log(data);
            location.reload();
        });
    });

    //add a announcement
    $('.announcementButton').click((e) => {
        const id = $('#boardName').attr("data-boardId")
        e.preventDefault();
        var newMsg = $('#postMsg').val().trim();
        var newAuthor = $('#postAuthor').val().trim();
        console.log(newMsg);
        let data = {
            msg: newMsg,
            author: newAuthor
        }
        $.post('/api/boards/' + id + '/msgs/new', data, function (data) {
            console.log(data);
            location.reload();
        });
    });

    //edit message
    $('.editSubmit').click((e) => {
        const id = $('#boardName').attr("data-boardId")
        const linkId = $('.cardDescription').attr('data-descId')
        e.preventDefault();
        var updateMsg = $('#putMsg').val().trim();
            
        let data = {
            title: newTitle,
            description: newDescription,
            url: newUrl,
            image_url: newImageUrl
        }
        put('/api/boards/' + id + '/links/' + linkId, data, function (data) {
            console.log(data);
            location.reload();
        });
    });

    $('#postUrl').change(function(event){
        let urlInput = event.target.value;
        if(!urlInput.startsWith('http')) {
            urlInput = 'http://' + urlInput;
            //$('#postUrl').val(urlInput);
        } 
        if(urlInput !== urlField) {
            urlField = urlInput;
            console.log(urlField);
            $.post('/api/scrape', {url: urlField}, function(data){
                console.log(data);
                $('#postTitle').val(data.title);
                $('#postDescription').val(data.description);
                $('#postUrl').val(data.url);
                $('#postImgUrl').val(data.image);    
            });
        }
    });
})//end document.ready
