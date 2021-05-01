const searchForm = $('#search-box');

/**
 * On the search buttons click
 */
searchForm.find('button').on('click', e => {
    e.preventDefault();

    const self = $(e.currentTarget);

    // set type Alphabetic or Simple search
    searchForm.find('.search-type').val(self.val());

    // Submit the form
    searchForm.submit();

    // Close all other actions
    return false;
});

/**
 * On form submit
 */
searchForm.on('submit', e => {
    e.preventDefault();

    const self = $(e.currentTarget);

    // Prepare data to send to backend
    const data = self.serializeArray();

    // hide the buttons and show loading until the request processing
    $('.search-bt-actions').hide();
    $('.btn-loading').show();

    $.ajax({
        url: self.attr('action'),
        type: "post",
        data: data,
        dataType: "json",
        success: response => { // Will call this function once the search is completed
            let html = '';

            // Generate new HTML with new search result
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

            // Output data
            $('.itunes-songs').html(html);

            // Show buttons
            $('.search-bt-actions').show();

            // Hide the loading btn
            $('.btn-loading').hide();
        }
    });

    // Close all other actions
    return false;
});