var gridOptions = {
    columnDefs: [ //определения столбцов
        { headerName: "Id", field: "id", cellRenderer: 'agGroupCellRenderer' },
        { headerName: "Node_id", field: "node_id" },
        { headerName: "Name", field: "name" },
        { headerName: "full_name", field: "full_name" },
        { headerName: "private", field: "private" },
        //{ headerName: "owner", field: "owner",  },

    ],
    defaultColDef: {
        flex: 1,
        minWidth: 120,
    },

    masterDetail: true,
    pagination: true,
    detailCellRendererParams: {
        detailGridOptions: { // какие столбцы отображать и какие функции сетки вы хотите включить внутри сетки подробностей.
            columnDefs: [
                { headerName: "login", field: 'login' },
                { headerName: "id", field: 'id' },
                { headerName: "node_id", field: 'node_id' },
                { headerName: "avatar_url", field: 'avatar_url' },
                { headerName: "gravatar_id", field: 'gravatar_id' },
                { headerName: "url", field: 'url' },
                { headerName: "html_ur", field: 'html_ur' },
                { headerName: "followers_url", field: 'followers_url' },
                { headerName: "following_url", field: 'following_url' },
                { headerName: "gists_url", field: 'gists_url' },
                { headerName: "starred_url", field: 'starred_url' },
                { headerName: "subscriptions_url", field: 'subscriptions_url' },
                { headerName: "organizations_url", field: 'organizations_url' },
                { headerName: "repos_url", field: 'repos_url' },
                { headerName: "events_url", field: 'events_url' },
                { headerName: "received_events_url", field: 'received_events_url' },
                { headerName: "type", field: 'type' },
                { headerName: "site_admin", field: 'site_admin' },
            ],


            defaultColDef: {
                flex: 1,
            },
        },

        //Функция, указывающая, какие строки отображать в сетке подробностей.

        getDetailRowData: function(params) { //Обратный вызов вызывается для каждой сетки подробностей и устанавливает строки, отображаемые в каждой сетке подробностей.
            params.successCallback(params.data.obj);
            console.log(params.data);
        }
    },
};


var obj = {
    login: "data.owner.login",
    id: "data.owner.id",
    node_id: "data.owner.node_id",
    avatar_url: "data.owner.avatar_url",
    gravatar_id: "data.owner.gravatar_id",
    url: "data.owner.url",
    html_ur: "data.owner.html_ur",
    followers_url: "data.owner.followers_url",
    following_url: "data.owner.following_url",
    gists_url: "data.owner.gists_url",
    starred_url: "data.owner.starred_url",
    subscriptions_url: "data.owner.subscriptions_url",
    organizations_url: "data.owner.organizations_url",
    repos_url: "data.owner.repos_url",
    events_url: "data.owner.events_url",
    received_events_url: "data.owner.received_events_url",
    type: "data.owner.type",
    site_admin: "data.site_admin"
};


document.addEventListener('DOMContentLoaded', function() {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions, gridOptions.detailCellRendererParams); //создать сетку, передаваемую в div, для использования вместе со столбцами и данными, которые мы хотим использовать

    agGrid
        .simpleHttpRequest({
            url: 'https://api.github.com/repositories',
        })
        .then(function(data) {

            gridOptions.api.setRowData(data);

        });
});

//пользователь сам вводит сколько строк он хочет видить на странице

function PageSizeChanged(newPageSize) {
    gridOptions.api.paginationSetPageSize(Number(newPageSize));
}

document.addEventListener('DOMContentLoaded', () => {
    var pageSize = prompt("Сколько  репо на одной странице вывести?");
    PageSizeChanged(pageSize);
});