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
    
    //; SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
    let countRows;
    db.any('select count(*) from links where navigation_id=1')
        .then(function (data) {
            countRows = parseInt(data[0]['count'])
            if(countRows<5){
                db.any(`INSERT INTO links(title, url, current_position, navigation_id) VALUES('${req.body.title}', '${req.body.url}', ${req.body.current_position}, ${req.body.navigation_id}) RETURNING *;`
                , req.body
                )
                    .then(function (data) {
                        res.status(200)
                            .json({
                                status: 'success',
                                data: data[0],
                                message: 'Inserted one link'
                            });
                        console.log(data[0])
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            }
            else{
               
                    res.json({
                        status: 'error',
                        data: data[0],
                        message: 'Links limit reached!'
                    })
                
            }
                
                        
                       
                  
               
           
            } 
            )
       

   
}
function updateLink(req, res, next) {
    let key = Object.keys(req.body)[0];
   
    let val = req.body[Object.keys(req.body)[0]]
    console.log(val)
    db.one(`update links set ${key}='${val}' where id=$1 RETURNING *`,
        [
        parseInt(req.params.id)])
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
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

