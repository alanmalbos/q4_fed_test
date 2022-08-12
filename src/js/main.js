var reportsWidget = {
    options: {
        containerSelector: '.reports',
        template: (
            '{{#.}}' +
                '<article class="reports_item">' +
                    '<a href="{{cover}}" target="_blank">' +
                        '<img class="reports_cover" src="{{cover}}" alt="{{title}} Cover"/>' +
                    '</a>' +
                    '<footer class="reports_docs">' +
                        '{{#documents}}' +
                            '<h3 class="reports_title">' +
                                '<a href="{{url}}" target="_blank">{{title}}</a>' +
                                '<span class="reports_file_information">' +
                                    ' ({{file_size}} {{file_type}})' +
                                '</span>' +
                            '</h3>' +
                            
                        '{{/documents}}' +
                    '</footer>' +
                '</article>' +
            '{{/.}}'
        )
    },

    init: function(report) {
            this.renderReports(report || []);
            $("html, body").animate({ scrollTop: 0 }, 600);
    },

    renderReports: function(reports) {
        var inst = this,
            options = inst.options;

        $(options.containerSelector).html(Mustache.render(options.template, reports));
    }
};

const list_element = document.getElementById('reports');
const pagination_element = document.getElementById('pagination');

let current_page = 1;
let items_per_page = 9;

/**
 * Build the list just with the items_per_page
 */
function DisplayList (reportData, list_element, items_per_page, current_page) {
    current_page--;

    let start = items_per_page * current_page;
    let end = start + items_per_page;
    let paginatedItems = reportData.slice(start, end);

    reportsWidget.init(paginatedItems);
    
}

/**
 * Check the numbers of pages
 */
function SetupPagination (reportData, pagination_element, items_per_page) {
    pagination_element.innerHTML = "";

    let page_count = Math.ceil(reportData.length / items_per_page);
    for (let i = 1; i < page_count + 1; i++) {
        let btn = PaginationButton(i, reportData);
        pagination_element.appendChild(btn);
    }
}

/**
 * Build the pagination and listening the change of pages
 */
function PaginationButton (page, items) {
    let button = document.createElement('button');
    button.innerText = page;

    if (current_page == page) button.classList.add('active');

    button.addEventListener('click', function () {
        current_page = page;
        DisplayList(items, list_element, items_per_page, current_page);
        let current_btn = document.querySelector('.pagenumbers button.active');
        current_btn.classList.remove('active');

        button.classList.add('active');
    });

    return button;
}


DisplayList(reportData, list_element, items_per_page, current_page);
SetupPagination(reportData, pagination_element, items_per_page);