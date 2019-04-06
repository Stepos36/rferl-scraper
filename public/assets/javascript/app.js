$(document).ready( function () {
    $('#articlesTable').DataTable( {
        responsive: true
    } );

    var table = $('#articlesTable').DataTable();

    $('#articlesTable tbody').on('click', '.details-control', function () {
        var tr = $(this).parents('tr');
        var row = table.row( tr );
        $.ajax({
            url: "/article-full",
            method: "POST",
            data: {
            link: tr.attr('data-id')
            }
        }).then(function(response){
            if ( row.child.isShown() ) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                // Open this row (the format() function would return the data to be shown)
                if(row.child() && row.child().length)
                {
                    row.child.show();
                }
                else {
                    var text = []
                    var videos = []
                    for(var i=1;i<response.length;i++) {
                        console.log(response[i])
                        if ((response[i] == 'No media source currently available') || (response[i] == '') || (response[i] == ' ')) {}
                        else if((response[i].length>10) && (response[i])){
                        text.push(response[i])
                        }
                        else {}
                    }
                    for(var j=0;j<response[0][0].videos.length;j++){
                        videos.push(response[0][0].videos[j])
                    }
                    for(var k=0;k<videos.length;k++) {
                        text.push('<div class="text-center"><iframe src="https://www.rferl.org/embed/player/0/'+videos[k]+'.html?type=video" frameborder="0" scrolling="no" width="427" height="240" allowfullscreen></iframe></div>')
                    }
                    row.child(text).show();
                }
                tr.addClass('shown');
            }
        })
    });
    $(document).on('click', '.save', function() {
            $.ajax({
            url: "/save-article/"+$(this).attr('id'),
            method: "PUT",
            data: {
            id: $(this).attr('id')
            }
            }).then(function(response){
            console.log('saved')
            })
        })
    $(document).on('click', '.delete', function() {
        $.ajax({
        url: "/delete-article/"+$(this).attr('id'),
        method: "PUT",
        data: {
        id: $(this).attr('id')
        }
        }).then(function(response){
        $(this).disabled = true
        console.log('deleted')
        })
    })
    $(document).on('click', '.comment', function() {
        $('#saveNote').attr('data-id', $(this).attr('id'))
        $('#popupModalLongTitle').html('<h5><span class="font-italic">Notes for:</span> '+$(this).parent().parent().attr('data-name')+'</h5>')
        $.ajax({
            method: "GET",
            url: '/article/' + $(this).attr('id'),
        }).then(function(response) {
            if(response.notes) {
                renderModalContent(response)
            }
            else {
                $('.comments').html("<p class='font-italic'>This article doesn't have any notes yet.</p>")
            }
            console.log(response)      
        })
    })
    $(document).on('click', '#saveNote', function() {
        $.ajax({
            url: "/add-note/"+$(this).attr('data-id'),
            method: "PUT",
            data: {
            title: $('#newNoteTitle').val(),
            body: $('#newNoteBody').val()
            }
            }).then(function(response){
                $.ajax({
            method: "GET",
            url: '/article/' + $(this)[0].url.substring(10)
        }).then(function(response) {
            console.log(response)
            if(response.notes) {
                renderModalContent(response)
            }
            else {}
        })
            })
    })
    $(document).on('click', '.saveButton', function() {
        if($(this).text()== 'Delete') {
            $(this).parent().html('<button class="button-green saveButton save" id={{this._id}}>Save</button>')
        }
        else {$(this).parent().html('<button class="button-red saveButton delete" id={{this._id}}>Delete</button>')}
    })
} );
function renderModalContent(response) {
    $('#newNoteTitle').val('')
    $('#newNoteBody').val('')
    if(response.notes.length == 0) {
        $('.comments').html('')
        $('.comments').html("<p class='font-italic'>This article doesn't have any notes yet.</p>")
    }
    else {
        for(var i=0;i<response.notes.length;i++) {
            $('.comments').append('<h6>'+response.notes[i].title+'</h6>')
            $('.comments').append('<p>'+response.notes[i].body+'</p>' )
            var timestamp = response.notes[i]._id.toString().substring(0,8)
            var dateTime = (new Date( parseInt( timestamp, 16 ) * 1000 )).toString()
            $('.comments').append('<p class="font-italic ml-auto mb-0">'+dateTime.substring(0,24)+'<p>').append('<hr class="mt-0">')
        }
    }
}