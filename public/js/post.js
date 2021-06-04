class Post{
    constructor()
    {
        $('._post_edit').click((event) => 
        {
            console.log(tinymce.editors);
            const requestBody = 
            {
                id: $('._id').val(),
                title: $('._title').val(),
                content: tinymce.get("content").getContent(),
                author: $('._author').val()
            };

            const base_url = location.protocol + "//" + document.domain + ":" + location.port;

            $.ajax(
                {
                    url: base_url + '/admin/post/edit',
                    type: 'PUT',
                    data: requestBody,
                    dataType: 'json',
                    success: (res) => {
                        if(res && res.statusCode == 200)
                            location.reload();
                    }
                }
            );
        });
    }
}

$(document).ready(() => {
    new Post();
})

function onClickDelete(id)
{
    console.log(id + 'Clicked Clicked')

    const base_url = location.protocol + "//" + document.domain + ":" + location.port;
    
    $.ajax({
        url: base_url + '/admin/post/delete',
        type: 'DELETE',
        data: {id: id},
        dataType: 'json',
        success: (res) => {
            if (res && res.statusCode == 200)
                location.reload();
            else 
                console.log("500 error ***");
        }
    }) 
};