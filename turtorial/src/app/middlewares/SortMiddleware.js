export default function SortMiddleware (request, response, next) {
    response.locals._sort = {
        enabled: false,
        type: 'default'
    };

    if (request.query.hasOwnProperty('_sort')) {
        Object.assign(response.locals._sort, {
            enabled: true,
            type: request.query.type,
            column: request.query.column,
        });
    }

    next();
}