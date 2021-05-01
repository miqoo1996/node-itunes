const searchForm = $('#search-box');

searchForm.find('button').on('click', e => {
    e.preventDefault();

    const self = $(e.currentTarget);

    searchForm.find('.search-type').val(self.val());

    searchForm.submit();

    return false;
});

searchForm.on('submit', e => {
    e.preventDefault();

    const self = $(e.currentTarget);
    const data = self.serializeArray();

    $('.search-bt-actions').hide();
    $('.btn-loading').show();

    $.ajax({
        url: self.attr('action'),
        type: "post",
        data: data,
        dataType: "json",
        success: response => {
            let html = '';
            response.forEach(({raw}) => {
                html += `
                <li class="col-md-12">
                    <a href="#">${raw.trackName}</a>
                    <div>
                        <img src="${raw.artworkUrl100}">
                    </div>
                </li>
                `;
            });

            $('.itunes-songs').html(html);

            $('.search-bt-actions').show();

            $('.btn-loading').hide();
        }
    });

    return false;
});