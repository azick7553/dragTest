var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/navigation_db';
var db = pgp(connectionString);

// add query functions
function getLinks(req, res, next) {
    db.any('select * from links')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL links'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}
function getNavigationLinks(req, res, next) {
    db.any('select * from links where navigation_id= 1')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL Navigation links'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}
function getNavigation(req, res, next) {
    db.one('select * from navigation')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved navigation'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}
function getLink(req, res, next) {
    var linkID = parseInt(req.params.id);
    db.one('select * from links where id = $1', linkID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE link'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}
function createLink(req, res, next) {
    // req.body.age = parseInt(req.body.age);
    db.none('insert into links(title, url, navigation_id)' +
        'values(${title}, ${url}, 1)',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one link'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}
function updateLink(req, res, next) {
    db.none('update links set title=$1, url=$2, navigation_id=1 where id=$3',
        [req.body.title, req.body.url,
        parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated link'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}
function removeLink(req, res, next) {
    var linkID = parseInt(req.params.id);
    db.result('delete from links where id = $1', linkID)
        .then(function (result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed ${result.rowCount} link`
                });
            /* jshint ignore:end */
        })
        .catch(function (err) {
            return next(err);
        });
}
module.exports = {
    getNavigation: getNavigation,
    getLinks: getLinks,
    getLink: getLink,
    getNavigationLinks: getNavigationLinks,
    createLink: createLink,
    updateLink: updateLink,
    removeLink: removeLink
};

